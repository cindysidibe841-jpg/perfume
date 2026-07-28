# MyPerfume — Scent of Luxury (Multi-Page Site)

A 6-page luxury perfume brand website, HTML/CSS only, sharing one stylesheet.

## Pages
| Page | File | Contents |
|---|---|---|
| Home | `index.html` | Hero, brand intro, featured images |
| Gallery | `gallery.html` | 4 product images in a styled grid |
| Collections | `collections.html` | Ordered list (bestsellers) + unordered list (ingredients) |
| Pricing | `pricing.html` | Full pricing table with KES prices and tier badges |
| Videos | `videos.html` | 2 embedded YouTube iframes + an audio player |
| Contact | `contact.html` | Contact details, a form, and an embedded Google Map iframe |

Every page shares:
- `style.css` — one stylesheet, linked from all 6 pages
- The same header/nav bar (current page highlighted in gold) and footer

## Deploying to GitHub Pages (drag-and-drop method)

1. Go to your repo on GitHub (e.g. `github.com/kitone-coder/myperfume`) or create a new one.
2. Click **Add file → Upload files**.
3. Drag in **all 7 files at once**: `index.html`, `gallery.html`, `collections.html`, `pricing.html`, `videos.html`, `contact.html`, and `style.css`. Keep them all at the root — don't put `style.css` in a subfolder, or the pages won't find it.
4. Commit directly to the `main` branch.
5. Go to **Settings → Pages**.
6. Under **Source**, select branch `main`, folder `/ (root)`, then **Save**.
7. Your site will be live within a minute or two at:
   `https://kitone-coder.github.io/<repo-name>/`

Images load from Unsplash and fonts from Google Fonts — both external, so nothing local can break like the asset-path issue on your other repos. Just make sure `style.css` sits next to the HTML files, not inside a folder.
