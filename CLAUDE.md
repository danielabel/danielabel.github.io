# Way of the Tech Lead — project notes

## Stack
Eleventy 3.x static site, deployed to GitHub Pages via GitHub Actions on push to `main`.
Source in `src/`, output to `_site/` (gitignored).

## Always preview locally first
Before deploying anything, run the dev server and check it in the browser.
`.claude/launch.json` is already configured — just start the server and visit http://localhost:8080.

```
npm start
```

Note: `.claude/launch.json` uses `npx eleventy --serve` directly (not `npm start`) because the preview server's shell doesn't resolve `node_modules/.bin` the same way npm does.

## No PR workflow
Commit directly to `main`. GitHub Actions handles the build and deploy automatically.

## Site structure

```
src/
  index.njk                  ← frontispiece (Lao Tzu quote + nav)
  way/
    index.njk                ← section listing
    posts/
      posts.json             ← sets layout, tags, section for all posts
      drafts/                ← excluded from production builds
        drafts.json
  work/
    index.njk                ← links out to well-rounded-tech-lead.dev (for now)
    posts/
      posts.json
  _includes/layouts/
    base.njk                 ← HTML shell, fonts, CSS link
    home.njk                 ← extends base; full-screen centred layout
    section-index.njk        ← extends base; section listing layout
    post.njk                 ← extends base; reading layout
  styles/
    main.css                 ← all styles; design tokens at the top
  _data/
    site.js                  ← title, url, description
```

## Writing a post (The Way)
Drop a `.md` file in `src/way/posts/`. Front matter needs only:

```yaml
---
title: Your title here
date: 2026-05-01
---
```

`posts.json` supplies the layout, tag, and section automatically.

### Post title convention
Titles follow the pattern **`About: Title Case Phrase`** — check existing posts before publishing to ensure consistency.

## Draft workflow — two tiers

**`src/way/posts/drafts/`** — completely excluded from production builds.
Visible at their URL during `npm start`. Use for work in progress you never want accidentally published.

**`draft: true` in `src/way/posts/`** — the post builds and has a public URL (useful for sharing a preview link) but does not appear in the section listing.

## Two sections

| Section | Path | Status | Colour |
|---|---|---|---|
| The Way | `/way/` | Active | Cream — `#f4ede0` |
| The Work | `/work/` | Links to well-rounded-tech-lead.dev | Blue tint when migrated |

## The Work — migration plan
Content currently lives at `well-rounded-tech-lead.dev` (WordPress.com, Personal plan).
When it migrates here, posts go in `src/work/posts/`.

The blue tint colour scheme is already written — just uncomment the block near the top of `src/styles/main.css`:

```css
[data-section="work"] {
  --paper: #e8eef4;
  --paper-deep: #dce6ef;
  --ink: #1e2a35;
  --whisper: rgba(30, 42, 53, 0.45);
}
```

## Always refresh the worktree first
Before starting any work, pull from origin in case other agents have committed changes:

```
git fetch origin && git merge origin/main
```

## GitHub Pages — custom domain (CNAME)
The CNAME file must be present in `_site/` for GitHub Pages to keep the custom domain across deployments. It is copied via `.eleventy.js`:

```js
eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
```

Do not remove this line. Without it, `wayofthetechlead.com` 404s after every deploy because GitHub Pages drops the custom domain when CNAME is absent from the artifact.

## Newsletter — Beehiiv
Subscribe form uses a custom-styled HTML form (not the Beehiiv iframe widget) to match the site aesthetic. It submits via `fetch` to:

```
POST https://subscribe-forms.beehiiv.com/api/v3/publications/{publicationId}/subscriptions
```

- Publication ID: `67728396-806b-48bd-a082-3e11ff06a4a5`
- Form ID: `c57448c1-a19e-4653-ad82-bdcb613abf42`

The form appears on `/way/` (section index) and at the bottom of every post. The JS handler lives in `src/_includes/layouts/base.njk`.

## Link style — sitewide pattern
All clickable links use ink colour + fine underline with offset:

```css
color: var(--ink);
text-decoration: underline;
text-underline-offset: 0.25em;
text-decoration-color: rgba(42, 37, 32, 0.25);
```

Hover darkens the underline to full ink. This applies to `.home-nav a`, `.section-back`, `.post-back`, and `.post-list a`.

## Homepage quote animation
The Lao Tzu quote on the homepage animates in word-by-word, grouped by stanza (one line at a time with pauses between). Each `<span class="word">` has an `animation-delay` set in `main.css`. `<br>` tags between stanzas count as child elements and shift the nth-child positions — update delays carefully when changing the quote.

## Design tokens
All in `:root` in `src/styles/main.css`. Section overrides work by setting `data-section` on `<body>` (handled automatically via front matter `section` property).

```css
--ink: #2a2520;
--paper: #f4ede0;
--paper-deep: #ebe1cf;
--whisper: rgba(42, 37, 32, 0.45);
```
