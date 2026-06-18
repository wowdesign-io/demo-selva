<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Git — ALWAYS use wowdesign-andy

The entire wowdesign OS project (this repo included) ALWAYS commits and pushes as:
- `user.name` = `wowdesign-andy`
- `user.email` = `andy@wowdesign.io`

Before any `git push`, verify: `git config user.email` → must return `andy@wowdesign.io`.
If not: `git config user.name "wowdesign-andy" && git config user.email "andy@wowdesign.io"`

Never use `uixandy` / `info@uixandy.com` unless explicitly told to.
