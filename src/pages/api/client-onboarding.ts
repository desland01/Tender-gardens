import type { APIRoute } from "astro";
import { Octokit } from "@octokit/rest";
import path from "node:path";
import sharp from "sharp";
import { Resend } from "resend";

export const prerender = false;

const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const GITHUB_OWNER = import.meta.env.GITHUB_OWNER;
const GITHUB_REPO = import.meta.env.GITHUB_REPO;
const SUBMISSIONS_BRANCH = "submissions";

const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const RESEND_TO = import.meta.env.RESEND_TO || "desmond@grovestreetpainting.com";
const RESEND_FROM =
  import.meta.env.RESEND_FROM || "Tender Gardens Intake <intake@tender-gardens.com>";

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : undefined;
const RESEND_RECIPIENTS = RESEND_TO
  ? RESEND_TO.split(",").map((entry: string) => entry.trim()).filter(Boolean)
  : [];

// For local development fallback
const USE_LOCAL_FS = !GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "client";

const stripBullet = (value: string) => value.replace(/^[\s*-•]+/, "").trim();

const getText = (formData: FormData, name: string) => {
  const field = formData.get(name);
  if (typeof field !== "string") return undefined;
  const trimmed = field.trim();
  return trimmed.length ? trimmed : undefined;
};

const getList = (formData: FormData, name: string, separator = /\r?\n|,|;/) => {
  const value = getText(formData, name);
  if (!value) return [] as string[];
  return value
    .split(separator)
    .map(stripBullet)
    .filter(Boolean);
};

const getParagraphs = (formData: FormData, name: string) => {
  const value = getText(formData, name);
  if (!value) return [] as string[];
  return value
    .split(/\r?\n\r?\n/)
    .map((entry) => entry.replace(/\s+/g, " ").trim())
    .filter(Boolean);
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

async function sendSubmissionNotification({
  slug,
  submissionPath,
  structured,
  storageMode,
}: {
  slug: string;
  submissionPath: string;
  structured: {
    projectSnapshot?: {
      businessName?: string;
      primaryContact?: string;
      email?: string;
      phone?: string;
    };
  } & Record<string, unknown>;
  storageMode: "local" | "github";
}) {
  if (!resend) {
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured; skipping intake email notification");
    }
    return;
  }

  if (!RESEND_RECIPIENTS.length) {
    console.warn("RESEND_TO not configured; skipping intake email notification");
    return;
  }

  const summaryEntries = [
    ["Business", structured.projectSnapshot?.businessName],
    ["Primary contact", structured.projectSnapshot?.primaryContact],
    ["Email", structured.projectSnapshot?.email],
    ["Phone", structured.projectSnapshot?.phone],
    [
      "Storage",
      storageMode === "github"
        ? "GitHub submissions branch"
        : "Local filesystem (development fallback)",
    ],
    ["Folder", submissionPath],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  const subjectName = structured.projectSnapshot?.businessName || slug;
  const subject = `New Tender Gardens intake: ${subjectName}`;
  const summaryText = summaryEntries.map(([label, value]) => `${label}: ${value}`).join("\n");
  const jsonPayload = JSON.stringify(structured, null, 2);
  const textBody = `A new client intake was captured.\n\n${summaryText}\n\nFull submission:\n${jsonPayload}\n`;

  const htmlSummary = summaryEntries
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("");
  const htmlBody = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; color: #0f172a; line-height: 1.5;">
      <h2 style="margin: 0 0 12px; font-size: 18px;">New client intake received</h2>
      <table style="border-collapse: collapse; margin: 0 0 16px; width: 100%; max-width: 520px;">
        <tbody>
          ${htmlSummary}
        </tbody>
      </table>
      <p style="margin: 0 0 12px;">Full submission payload:</p>
      <pre style="margin: 0; padding: 12px; background: #f8fafc; border-radius: 8px; font-size: 13px; white-space: pre-wrap; word-break: break-word; border: 1px solid rgba(15, 23, 42, 0.12);">${escapeHtml(jsonPayload)}</pre>
    </div>
  `;

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_RECIPIENTS,
      subject,
      text: textBody,
      html: htmlBody,
    });
  } catch (notifyError) {
    console.error("Failed to send intake notification", notifyError);
  }
}

// GitHub API helpers
async function createOrUpdateFilesOnGitHub(
  slug: string,
  files: Array<{ path: string; content: string | Buffer }>,
) {
  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // Get the latest commit SHA from main branch
    const { data: mainRef } = await octokit.git.getRef({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      ref: "heads/main",
    });
    const mainSha = mainRef.object.sha;

    // Try to get submissions branch, create if it doesn't exist
    let submissionsBranchSha: string;
    try {
      const { data: submissionsRef } = await octokit.git.getRef({
        owner: GITHUB_OWNER!,
        repo: GITHUB_REPO!,
        ref: `heads/${SUBMISSIONS_BRANCH}`,
      });
      submissionsBranchSha = submissionsRef.object.sha;
    } catch (error) {
      // Branch doesn't exist, create it from main
      await octokit.git.createRef({
        owner: GITHUB_OWNER!,
        repo: GITHUB_REPO!,
        ref: `refs/heads/${SUBMISSIONS_BRANCH}`,
        sha: mainSha,
      });
      submissionsBranchSha = mainSha;
    }

    // Get the tree of the current submissions branch
    const { data: currentCommit } = await octokit.git.getCommit({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      commit_sha: submissionsBranchSha,
    });

    // Create blobs for all files
    const blobs = await Promise.all(
      files.map(async (file) => {
        const content = Buffer.isBuffer(file.content)
          ? file.content.toString("base64")
          : Buffer.from(file.content, "utf-8").toString("base64");

        const { data: blob } = await octokit.git.createBlob({
          owner: GITHUB_OWNER!,
          repo: GITHUB_REPO!,
          content,
          encoding: "base64",
        });

        return {
          path: file.path,
          mode: "100644" as const,
          type: "blob" as const,
          sha: blob.sha,
        };
      }),
    );

    // Create a new tree
    const { data: newTree } = await octokit.git.createTree({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      base_tree: currentCommit.tree.sha,
      tree: blobs,
    });

    // Create a commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      message: `New client intake submission: ${slug}`,
      tree: newTree.sha,
      parents: [submissionsBranchSha],
    });

    // Update the submissions branch reference
    await octokit.git.updateRef({
      owner: GITHUB_OWNER!,
      repo: GITHUB_REPO!,
      ref: `heads/${SUBMISSIONS_BRANCH}`,
      sha: newCommit.sha,
    });

    return newCommit.sha;
  } catch (error) {
    console.error("GitHub API error:", error);
    throw error;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const businessName = getText(formData, "businessName") ?? "";
    const primaryContact = getText(formData, "primaryContact") ?? "";
    const email = getText(formData, "email") ?? "";
    const phone = getText(formData, "phone");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const slug = `${timestamp}-${slugify(businessName || primaryContact || email)}`;
    const submissionPath = `docs/client-intake/${slug}`;

    const structured = {
      intakeVersion: "2025-03",
      submittedAt: new Date().toISOString(),
      projectSnapshot: {
        businessName,
        primaryContact,
        email,
        phone,
        keyLinks: getList(formData, "keyLinks", /\r?\n|,|;/),
        timeline: getText(formData, "timeline"),
      },
      brandStory: {
        tagline: getText(formData, "tagline"),
        elevatorPitch: getText(formData, "elevatorPitch"),
        brandAdjectives: getList(formData, "brandAdjectives", /,|;|\/|\|/),
        originStory: getText(formData, "brandStory"),
        differentiators: getList(formData, "differentiators"),
      },
      audience: {
        segments: getList(formData, "audiences"),
        problemStatements: getList(formData, "problemStatements"),
        transformations: getList(formData, "transformations"),
        primaryCtas: getList(formData, "primaryCtas"),
      },
      hero: {
        headline: getText(formData, "heroHeadline"),
        subheadline: getText(formData, "heroSubheadline"),
        highlights: getList(formData, "homepageHighlights"),
      },
      services: {
        signature: getText(formData, "serviceSignature"),
        supporting: [
          getText(formData, "serviceOne"),
          getText(formData, "serviceTwo"),
        ].filter((entry): entry is string => Boolean(entry)),
        addOns: getList(formData, "serviceAddons"),
      },
      proof: {
        testimonials: getParagraphs(formData, "testimonials"),
        proofPoints: getList(formData, "proofPoints"),
        portfolioNotes: getList(formData, "portfolioNotes"),
      },
      experience: {
        process: getText(formData, "process"),
        faqs: getParagraphs(formData, "faqs"),
        clientExperience: getList(formData, "clientExperience"),
      },
      visuals: {
        palette: getText(formData, "visualPalette"),
        references: getList(formData, "visualReferences"),
        avoid: getList(formData, "visualAvoid"),
      },
      logistics: {
        serviceAreas: getList(formData, "serviceAreas"),
        operatingHours: getText(formData, "operatingHours"),
        contactRequirements: getList(formData, "contactRequirements"),
        legalNotes: getText(formData, "legalNotes"),
      },
      notes: getText(formData, "notes"),
    };

    // Process uploaded files
    const uploadedFiles = formData.getAll("assets").filter((entry): entry is File => entry instanceof File);
    const processedFiles: Array<{ path: string; content: Buffer }> = [];

    await Promise.all(
      uploadedFiles.slice(0, 15).map(async (file, index) => {
        if (!file.size) return;
        if (file.size > 5 * 1024 * 1024) return;

        const original = file.name ? slugify(path.parse(file.name).name) : `asset-${index + 1}`;
        const ext = path.extname(file.name || "");
        const arrayBuffer = await file.arrayBuffer();
        const sourceBuffer = Buffer.from(arrayBuffer);

        try {
          const webpBuffer = await sharp(sourceBuffer).webp({ quality: 80 }).toBuffer();
          processedFiles.push({
            path: `${submissionPath}/${original}.webp`,
            content: webpBuffer,
          });
        } catch (conversionError) {
          console.warn("Failed to convert upload to WebP; writing original", {
            name: file.name,
            reason: conversionError instanceof Error ? conversionError.message : conversionError,
          });
          processedFiles.push({
            path: `${submissionPath}/${original}${ext || ".img"}`,
            content: sourceBuffer,
          });
        }
      }),
    );

    // Prepare all files for commit
    const filesToCommit = [
      {
        path: `${submissionPath}/info.json`,
        content: JSON.stringify(structured, null, 2),
      },
      ...processedFiles,
    ];

    // Use GitHub API if configured, otherwise use local filesystem
    if (USE_LOCAL_FS) {
      // Local development - write to filesystem
      const { promises: fs } = await import("node:fs");
      const targetDir = path.join(process.cwd(), submissionPath);
      await fs.mkdir(targetDir, { recursive: true });

      await Promise.all(
        filesToCommit.map(async (file) => {
          const filePath = path.join(process.cwd(), file.path);
          const content = typeof file.content === "string" ? file.content : file.content;
          await fs.writeFile(filePath, content, "utf8");
        }),
      );

      await sendSubmissionNotification({
        slug,
        submissionPath,
        structured,
        storageMode: "local",
      });

      return new Response(
        JSON.stringify({
          ok: true,
          folder: submissionPath,
          message: "Thanks! Your intake was captured locally (development mode).",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    } else {
      // Production - commit to GitHub
      await createOrUpdateFilesOnGitHub(slug, filesToCommit);

      await sendSubmissionNotification({
        slug,
        submissionPath,
        structured,
        storageMode: "github",
      });

      return new Response(
        JSON.stringify({
          ok: true,
          folder: submissionPath,
          branch: SUBMISSIONS_BRANCH,
          message: `Thanks! Your intake was committed to the '${SUBMISSIONS_BRANCH}' branch.`,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    console.error("Onboarding submission failed", error);
    return new Response(
      JSON.stringify({ ok: false, message: "Something went wrong saving the intake." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
