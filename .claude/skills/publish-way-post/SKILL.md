---
name: publish-way-post
description: Add a new article to wayofthetechlead.com (The Way) from text the author has pasted. Use when the user says they have the next article to add. Preserves the author's words exactly and never edits, commits or pushes without explicit approval.
---

# Publish a post to The Way

The author's words are theirs. Your job is to convert, not to edit.

## Rules

1. **Exact words.** Keep the pasted text character for character. Do not change wording, punctuation, spelling or structure. Never introduce em dashes. The source has `\-` escapes from Google Docs. That is the author's spaced hyphen, so `problem \- half` becomes `problem - half`, never an em dash. (Em dashes were wrongly introduced this way once and had to be reverted.)
2. **Raise, don't decide.** You may point out issues you can see (a likely wrong chapter number, a broken link, a typo, something that could be presented better) and say how it could be presented. You make no decision about the content. Wait for an explicit conversation and a clear answer before changing anything the author wrote.
3. **No action without approval.** Do not create or edit any file, commit or push until the user says to. Presenting a draft or a question is not permission. "Any you'd like to tweak?" is not permission.
4. **Say what you did, truthfully.** If you changed anything, say exactly what. If asked, own it straight away.

## Steps

1. Read the pasted text. Do not change it.
2. Report back briefly: proposed filename, title, date, and any issues you can see. Then stop and wait.
3. On approval, write `src/way/posts/<slug>.md` with this front matter only:

   ```yaml
   ---
   title: "About: Title Case Phrase"
   date: YYYY-MM-DD
   ---
   ```

   Check existing posts so the title follows the `About: Title Case Phrase` pattern.
4. The first subheading in the paste is the epigraph. Write it as a blockquote with the attribution on the next line:

   ```markdown
   > "Quote text here."  
   > – Source, Chapter N
   ```

   Two trailing spaces after the quote line.
5. Before previewing, run `git fetch origin && git merge origin/main` so other agents' changes are included.
6. Start the dev server (`.claude/launch.json` is configured) and show the user the page at http://localhost:8080. Wait for their verdict.
7. Compare the post body with the pasted text and tell the user it matches, or list every difference. Search the file for `—` and confirm there are none.
8. Check the link-preview description. Descriptions are automatic: `src/way/posts/posts.11tydata.js` takes the post's first paragraph (whole sentences, up to 200 characters) for the meta, Open Graph and Twitter descriptions. Read what the new post gets (build and grep `og:description`) and tell the user whether it works as a preview. It fails when the opening points back to another article or says nothing about the post. If it fails, say so and offer candidate sentences taken word for word from the article. A post overrides the automatic description with `description:` in its front matter, but only add one once the user has chosen the wording.
9. Commit and push to `main` only when the user explicitly says to. GitHub Actions deploys.

## Not part of this skill

Added links and any other changes beyond the article text are separate decisions. Raise them and wait.
