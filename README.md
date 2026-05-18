# Way of the Tech Lead

Personal site at [wayofthetechlead.com](https://wayofthetechlead.com). Built with Eleventy, hosted on GitHub Pages.

## Running locally

```
npm install
npm start
```

Then visit http://localhost:8080.

## Publishing an article

Drop a Markdown file in `src/way/posts/` with this front matter:

```yaml
---
title: "About: Your Title Here"
date: 2026-05-01
---
```

Titles follow the pattern **About: Title Case Phrase** — check existing posts for consistency.

Push to `main` and GitHub Actions builds and deploys automatically.

## Drafts

- **`src/way/posts/drafts/`** — never published, visible locally only
- **`draft: true`** in front matter — builds and has a public URL, but hidden from the listing

## Mailing list

Subscribers are managed via **[Beehiiv](https://app.beehiiv.com)**. The subscribe form is embedded on the `/way/` index and at the bottom of every post. To manage subscribers, campaigns, or settings, log in at beehiiv.com.

## The Work section

Content currently lives at [well-rounded-tech-lead.dev](https://well-rounded-tech-lead.dev) (WordPress.com). When it migrates here, posts go in `src/work/posts/`. See CLAUDE.md for the blue colour scheme that's ready to uncomment.
