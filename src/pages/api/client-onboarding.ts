import type { APIRoute } from "astro";
import { promises as fs } from "node:fs";
import path from "node:path";

export const prerender = false;

const intakeRoot = path.join(process.cwd(), "docs", "client-intake");

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

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const businessName = getText(formData, "businessName") ?? "";
    const primaryContact = getText(formData, "primaryContact") ?? "";
    const email = getText(formData, "email") ?? "";
    const phone = getText(formData, "phone");

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const slug = `${timestamp}-${slugify(businessName || primaryContact || email)}`;
    const targetDir = path.join(intakeRoot, slug);

    await fs.mkdir(targetDir, { recursive: true });

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

    await fs.writeFile(
      path.join(targetDir, "info.json"),
      JSON.stringify(structured, null, 2),
      "utf8",
    );

    const files = formData.getAll("assets").filter((entry): entry is File => entry instanceof File);

    await Promise.all(
      files.slice(0, 5).map(async (file, index) => {
        if (!file.size) return;
        if (file.size > 5 * 1024 * 1024) return;

        const original = file.name ? slugify(path.parse(file.name).name) : `asset-${index + 1}`;
        const ext = path.extname(file.name || "") || ".jpg";
        const arrayBuffer = await file.arrayBuffer();
        await fs.writeFile(path.join(targetDir, `${original}${ext}`), Buffer.from(arrayBuffer));
      }),
    );

    return new Response(
      JSON.stringify({
        ok: true,
        folder: path.relative(process.cwd(), targetDir),
        message: "Thanks! Your intake was captured inside the repo.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Onboarding submission failed", error);
    return new Response(
      JSON.stringify({ ok: false, message: "Something went wrong saving the intake." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
