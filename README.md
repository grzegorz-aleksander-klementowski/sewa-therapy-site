SEVA Website
============

Overview
--------
SEVA is a single-page website for a London-based therapist specialising in
transformational work with individuals, couples, and families. The experience
leans on a matrix-style hero, a calm visual gallery, and layered content pillars
that convey the SEVA ethos, sessions, and story.

Project Structure
-----------------
- `index.html` - page markup and copy that guides visitors from the mind-noise
  hero into the SEVA pillars and contact call-to-action.
- `style.css` - custom visual system including the matrix hero, calm gallery,
  responsive grids, and card layout for SEVA sections.
- `script.js` - lightweight script that renders the animated "thought matrix"
  phrases in the hero area.
- `images/` - placeholder photography from the original HTML5 UP template;
  replace with Seva's assets before launch.
- `.github/workflows/ci.yml` - GitHub Actions workflow running Prettier and
  HTMLHint checks on pushes and pull requests.
- `.htmlhintrc` - HTMLHint configuration applied in CI and locally.

Local Development
-----------------
1. Open `index.html` in a browser or use a simple HTTP server for live reload
   (for example, `npx serve .`).
2. Update content, styles, or scripts as needed.
3. Run formatting and lint checks before committing:
   - `npx prettier --check index.html style.css script.js`
   - `npx htmlhint index.html`

Continuous Integration
----------------------
Every push and pull request triggers the `CI` workflow, which:
1. Installs Node.js 20.
2. Runs Prettier in check mode on the core front-end files.
3. Runs HTMLHint against `index.html` using the bundled `.htmlhintrc` rules.

Credits and License
-------------------
- Built on the "Strata" HTML5 UP theme (html5up.net) by @ajlkn.
- Original demo imagery sourced from Unsplash (unsplash.com).
- Template assets remain governed by the Creative Commons Attribution 3.0
  License (html5up.net/license).
