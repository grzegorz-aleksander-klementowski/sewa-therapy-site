SEVA Website
============

Overview
--------
SEVA is a single-page website for a London-based therapist and transformational
coach working with individuals, couples, and professionals. The experience
leads visitors from a matrix-style hero into a clear explanation of Seva's
approach, services, experience, and free introductory chemistry meeting.

Project Structure
-----------------
- `index.html` - page markup and copy that guides visitors from the mind-noise
  hero into the SEVA pillars and contact call-to-action.
- `style.css` - custom visual system including the matrix hero, calm gallery,
  responsive grids, and card layout for SEVA sections.
- `script.js` - lightweight script that renders the animated "thought matrix"
  phrases in the hero area.
- `images/` - Seva's curated visual library, profile portrait, and original
  reference materials. The profile portrait uses an optimised WebP asset with
  the source PNG retained as a browser fallback.
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
