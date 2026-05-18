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

## Design tokens
All in `:root` in `src/styles/main.css`. Section overrides work by setting `data-section` on `<body>` (handled automatically via front matter `section` property).

```css
--ink: #2a2520;
--paper: #f4ede0;
--paper-deep: #ebe1cf;
--whisper: rgba(42, 37, 32, 0.45);
```
