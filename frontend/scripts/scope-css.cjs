// One-off build helper: wraps every selector in each CSS file of a page
// directory with a `.<prefix>-<name>` ancestor class so that identically
// named classes defined by different pages (e.g. `.hero-btn`,
// `.section-title`, `.container`, `.page-header`, `.table-card`) can never
// leak across routes once all page CSS files are bundled together by Vite.
// `:root` and `@keyframes` steps are left alone.
//
// Usage: node scripts/scope-css.cjs <dir> <prefix>
//   node scripts/scope-css.cjs src/pages page
//   node scripts/scope-css.cjs src/admin/pages admin-page
const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const { join, basename } = require('node:path');
const postcss = require('postcss');

const KEYFRAME_ATRULES = new Set([
  'keyframes',
  '-webkit-keyframes',
  '-moz-keyframes',
  '-o-keyframes',
  '-ms-keyframes',
]);

function scopePlugin(scopeClass) {
  return {
    postcssPlugin: 'scope-page-css',
    Rule(rule) {
      if (rule.parent && rule.parent.type === 'atrule' && KEYFRAME_ATRULES.has(rule.parent.name)) {
        return;
      }

      rule.selectors = rule.selectors.map((selector) => {
        if (selector === ':root') return selector;
        // Already scoped (re-running the script on an already-scoped file
        // must be a no-op, not a double-prefix).
        if (selector.startsWith(`${scopeClass} `) || selector === scopeClass) return selector;
        return `${scopeClass} ${selector}`;
      });
    },
  };
}
scopePlugin.postcss = true;

const [, , dirArg, prefixArg] = process.argv;

if (!dirArg || !prefixArg) {
  console.error('Usage: node scripts/scope-css.cjs <dir> <prefix>');
  process.exit(1);
}

const targetDir = join(__dirname, '..', dirArg);
const files = readdirSync(targetDir).filter((f) => f.endsWith('.css'));

for (const file of files) {
  const name = basename(file, '.css');
  const scopeClass = `.${prefixArg}-${name.toLowerCase()}`;
  const path = join(targetDir, file);
  const css = readFileSync(path, 'utf8');

  const result = postcss([scopePlugin(scopeClass)]).process(css, { from: undefined });

  writeFileSync(path, result.css);
  console.log(`scoped ${dirArg}/${file} -> ${scopeClass}`);
}
