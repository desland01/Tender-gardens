# Human Instructions: Enabling Google Business Profile MCP in Cursor (October 2025)

> **Human-only note:** This document is meant for people configuring the workflow. Do **not** load or summarize this file for automated agents.

## 1. Prerequisites (check before you start)

1. Cursor Insider build ≥ v0.22 installed on this machine.
2. MCP support enabled inside Cursor:
   - Open Cursor Settings (`⌘,` / `Ctrl,`).
   - Go to **Integrations** (or **Features** on some builds).
   - Toggle **Model Context Protocol (MCP)** on.
   - Restart Cursor.
3. Node.js ≥ 20.11 and npm ≥ 10 available: run `node -v` and `npm -v`.
4. Google account that already owns or manages every Google Business Profile you plan to edit.

## 2. Google Cloud setup (one time)

1. Browse to <https://console.cloud.google.com/>, create or select a project (e.g. `cursor-gbp-mcp`).
2. In the left-hand menu open **APIs & Services → Enabled APIs & services → + ENABLE APIS AND SERVICES**.
3. Enable at least these APIs (search each name):
   - **Business Profile Business Information API** (`mybusinessbusinessinformation.googleapis.com`).
   - Optional analytics: **Business Profile Performance API** if needed later.
4. Go to **APIs & Services → OAuth consent screen**.
   - App name: `Cursor GBP MCP` (or similar).
   - If External, add your Google account as a test user.
   - Add the scope `https://www.googleapis.com/auth/business.manage`.
5. Go to **APIs & Services → Credentials → + CREATE CREDENTIALS → OAuth client ID**.
   - Application type: **Desktop app**.
   - Download the credentials JSON.
   - Save to `/Users/<your_user>/.config/cursor-gbp/client_secret.json` (`<your_user>` = local macOS short name).
   - Run `chmod 600` on the file so only you can read it.

## 3. Install the MCP OpenAPI bridge

1. In Terminal run:
   ```bash
   npm install -g @modelcontextprotocol/openapi-bridge
   ```
2. Create a config directory if it doesn’t exist:
   ```bash
   mkdir -p /Users/<your_user>/.config/cursor-gbp
   ```

## 4. Build the bridge configuration

1. Create `/Users/<your_user>/.config/cursor-gbp/bridge.yaml` with this content (replace `<your_user>`):
   ```yaml
   servers:
     - name: google-gbp
       openapi: https://mybusinessbusinessinformation.googleapis.com/$discovery/rest?version=v1
       auth:
         type: oauth2
         clientSecretPath: /Users/<your_user>/.config/cursor-gbp/client_secret.json
         tokenPath: /Users/<your_user>/.config/cursor-gbp/token.json
         scopes:
           - https://www.googleapis.com/auth/business.manage
       includeOperations:
         - mybusinessbusinessinformation.accounts.locations.list
         - mybusinessbusinessinformation.locations.patch
         - mybusinessbusinessinformation.locations.localPosts.create
       defaults:
         headers:
           X-Goog-Api-Client: cursor-mcp/2025
   ```
2. This limits available tools to the three most common needs (list locations, patch location data, create local posts). Add more operations to `includeOperations` if required.

## 5. Authorize Google access

1. Run the bridge once from Terminal:
   ```bash
   openapi-bridge --config /Users/<your_user>/.config/cursor-gbp/bridge.yaml
   ```
2. A browser window appears. Sign in with the Google account that owns the GBP listings.
3. Approve the requested scope. The bridge saves a refresh token to `/Users/<your_user>/.config/cursor-gbp/token.json`.
4. Once you see the “listening on port …” message, press `Ctrl+C`. Authorization is stored; reruns won’t need browser approval unless you delete the token file.

## 6. Register the server in Cursor

1. In Cursor press `Cmd/Ctrl ⇧ P` and choose **Open MCP Configuration**.
2. Append to the JSON:
   ```json
   {
     "mcpServers": [
       {
         "name": "google-gbp",
         "command": "openapi-bridge",
         "args": ["--config", "/Users/<your_user>/.config/cursor-gbp/bridge.yaml"],
         "keepAlive": true
       }
     ]
   }
   ```
   Merge with existing entries if needed.
3. Save and restart Cursor.

## 7. Using the tools (inside Cursor)

1. Open the MCP panel (bottom status bar MCP icon or `Cmd/Ctrl ⇧ P → Show MCP Servers`).
2. Expand `google-gbp` → run `mybusinessbusinessinformation.accounts.locations.list` to confirm access. Use the returned `accounts/...` and `locations/...` identifiers in later calls.
3. Update fields with the `locations.patch` tool. Example parameters:
   ```json
   {
     "name": "locations/1234567890123456789",
     "updateMask": "primaryPhone,regularHours",
     "body": {
       "primaryPhone": "+1 941-555-1212",
       "regularHours": {
         "periods": [
           {"openDay": "MONDAY", "openTime": "09:00", "closeDay": "MONDAY", "closeTime": "17:00"}
         ]
       }
     }
   }
   ```
4. Post updates with `locations.localPosts.create`. Example:
   ```json
   {
     "parent": "locations/1234567890123456789",
     "localPost": {
       "summary": "October native garden maintenance openings available!",
       "callToAction": {"actionType": "LEARN_MORE", "url": "https://tendergardens.com/services"}
     }
   }
   ```

## 8. Security reminders

- Treat `client_secret.json` and `token.json` like passwords. Store backups securely and set `chmod 600`.
- If the Google account or scope is revoked, delete `token.json` and rerun step 5 to reauthorize.
- Google enforces quotas. Check **Google Cloud → Apis & Services → Quotas** if calls fail.

## 9. Extending later

- Add more operations to `includeOperations` (e.g., reviews) by copying method IDs from the discovery document.
- If you need analytics, enable the Business Profile Performance API and add its operations in the same config file.
- For automation outside Cursor, schedule `openapi-bridge` invocations or use Cursor CLI commands to trigger the MCP tools.

---
Keep this file for human operators only. Do **not** expose it to automated agents.
