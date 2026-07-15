<h1 align="center">
  Pretty Startpage
</h1>

<h3 align="center">
A simple, customizable new tab page/start page for your browser.
Based on the <a href="https://github.com/catppuccin/catppuccin/tree/main/">Catppuccin</a> Mocha color palette!
</h3>

---

## Demo

Check out the demo! :)
> https://fossisawesome.github.io/pretty-startpage/

---

## Pictures
<img src="https://raw.githubusercontent.com/fossisawesome/pretty-startpage/refs/heads/main/assets/showcase.png" height="300" width="585"/>
<img src="https://raw.githubusercontent.com/fossisawesome/pretty-startpage/refs/heads/main/assets/settings.png" height="300" width="390"/>

---

## Widgets

Clock, Search, Weather, Bookmarks, Notes, and Quote — add and arrange them
in edit mode, configure each from its own settings sidebar.

## Usage

**Fork this repo.**

**Enable GitHub Pages:**
1. Go to your fork's settings tab.
2. Click Pages in the left sidebar.
3. Select **GitHub Actions** as the source (not "Deploy from a branch") and save.
4. Push to `main` — the included workflow builds and deploys automatically.
5. Save your GitHub Pages URL somewhere.

---

**Setting as startup/homepage (Chromium):**
1. Click the 3 dots in the top right corner.
2. Click "Settings"
3. Click "On Startup".
4. Click "Open a specific page, or set of pages."
5. Put in the URL you got. (ex: `https://yourgithubusername.github.io/yourforksname`)
6. Save!

**Set as new tab page (Chromium):**
1. Add the [Custom New Tab URL](https://chromewebstore.google.com/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia) extension.
2. Click the 3 dots in the top right corner.
3. Click "Extensions"
4. Click Custom New Tab URL
5. Click "Extension Options"
6. Check "Enabled"
7. Under "URL or local file path" put in your URL. (ex: `https://yourgithubusername.github.io/yourforksname`)
8. Save!

---

**Setting as startup/homepage (Firefox):**
1. Click the hamburger menu in the top right corner (or go to `about:preferences#home`).
2. Click "Home".
3. Click "Homepage and new windows", and set to custom URLs.
4. Put in the URL you got. (ex: `https://yourgithubusername.github.io/yourforksname`)
5. Save!

**Set as new tab page (Firefox):**
1. Add the [Custom New Tab Page](https://addons.mozilla.org/en-US/firefox/addon/custom-new-tab-page/) extension.
2. Open `Add-ons` from the `Menu` (or navigate to `about:addons`).
3. Select "Extensions"
4. Select the "Custom New Tab Page" extension → "Options"
5. Enter your URL in the "New Tab URL" box.
6. Save!

---

## Customizing

You can adjust basic settings directly within the UI.

> **Tip:** You can customize it more by editing the files directly, but I will try to make the settings more advanced later.

---

## Developing locally

Requires [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev     # local dev server
pnpm build   # production build to dist/
```

---

## Credits

**HotCoffeeYT** - Did a PR, and added placeholder stuff.

**@foodisyum** - Recommended I add a pictures section.

---

Add me on Discord! ***goybsd*** :)
