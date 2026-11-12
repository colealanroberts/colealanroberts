# coleroberts.xyz

[coleroberts.xyz](https://coleroberts.xyz) is built with Astro, deployed via GitHub Actions, and hosted on GitHub Pages.

## Writing a blog post

Add a `.md` file to `src/content/blog/`. The filename becomes its URL:
`my-post.md` → `/blog/my-post/`. Nested folders are supported.

```md
---
title: "My post"
description: "A short summary for the index and search engines."
date: 2026-11-12
draft: true
---

Write your post in Markdown here.

## A section heading
```

Run `npm run dev` to preview the index at `/blog/` and your post at
`/blog/my-post/`. Drafts can be previewed directly in development, but are hidden
from the blog index and excluded from production routes. Set `draft: false` to publish; posts are listed
newest first. Dates use `YYYY-MM-DD`; optionally add `updated` in the same format.
The title is rendered as the page's heading, so body headings should start at `##`.

The included `first-post.md` is a draft example. Rename or delete it when writing
your first post. An empty published blog shows a short placeholder message.

Posts use `src/layouts/BlogLayout.astro` automatically; no `layout` field or
extra packages are required. Blog pages are generated as static HTML.
