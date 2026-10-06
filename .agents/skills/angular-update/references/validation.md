# Select validation that matches the workspace

Read this for projects with libraries, SSR/hydration, PWA, localization, custom
builders or deployment-sensitive changes. Derive checks from repository/CI
commands and actual features. Keep scope proportional to the affected projects.

## Baseline and reproducibility

Run source checks under the source-supported Node and package-manager versions.
Record exact commands, configuration, environment and meaningful failure evidence.
Do not label the same error message "unchanged baseline" if upgraded code or
dependencies now cause it differently. Build failures that prevent a reliable
migration starting point need an explained repair or blocker.

Validate installation against the resulting manifest/lockfile and effective
package tree. Use supported reproducible lockfile mode to establish that CI can
install the recorded result, not only that a mutable local install succeeded.
Run affected production builds, configured tests and lint in non-watch modes;
include required libraries and configurations rather than only the default app.
Do not install an unrelated linter/test framework when none is configured.

After a fix, rerun checks whose results it invalidated. A test-only fix need not
repeat unrelated builds; a shared dependency/configuration fix can invalidate
builds and multiple test targets. Do not advance on unresolved upgrade-caused
failures. Use existing tests and focused checks rather than creating a broad new
test suite merely for the upgrade.

## Feature-driven acceptance

- **Browser behavior:** Exercise representative startup, routing, forms and async
  UI updates when changed APIs/defaults affect them. Check console/runtime errors.
  Preserve the established zone/zoneless mode and component change-detection
  behavior unless a change is required or requested; verify migration output.
  A new-project default does not by itself justify changing an existing app.
- **SSR/hydration/prerender:** Run the actual server or applicable rendering checks,
  verify expected rendered HTML and hydration without new errors, and check
  relevant routes/host configuration. A successful server build or HTTP response
  can still hide fallback to client rendering. Test prerendered output when used.
- **PWA:** Verify service-worker generation, asset/output paths, registration and
  important offline/update behavior when migrations affect them. Use the existing
  local PWA harness where available; distinguish generation from runtime validation.
- **i18n:** Include affected localized production configurations and
  @angular/localize compatibility. Check translation errors, generated locale
  paths and base URLs consumed by deployment.
- **Material/CDK:** Inspect affected themes, overlays and interactions; review
  migration TODOs and visual differences. Do not accept regenerated golden files
  without reviewing whether the change is intended.
- **Libraries:** Validate production packages/entry points and an appropriate
  consumer build against their declared compatibility. Source aliases can conceal
  packaging or peer-dependency problems.
- **Deployment/custom builders:** Check changed output layout, server entry point,
  assets, baseHref, stylesheet processing, custom build features and scripts that
  consume them. Required compatibility changes include deployment configuration
  when a migration changes the artifact contract. Do not deploy merely to validate.
- **Supported browsers:** Compare the repository's required browsers/Browserslist
  with the target's [official browser support](https://angular.dev/reference/versions).
  Report a removed required browser as a scope/compatibility decision rather than
  silently changing support or adding speculative polyfills.

Use applicable official release notes to choose these checks. New change-detection
defaults, security patches, removed builders and preview API changes can require
runtime checks even when TypeScript compiles.

## Failed or unavailable checks

Do not hide errors, disable compiler/lint checks, skip assertions, loosen budgets
or remove coverage merely to obtain a pass. If official guidance offers a fallback
that weakens checking or changes behavior, assess its scope, document the reason
and seek a user choice only when material risk or intended behavior is unresolved.

Distinguish pass, fail, unchanged baseline failure, not configured and not run with
reason. Explain unavailable browsers, credentials or infrastructure and run useful
local checks. Missing a required build/runtime check yields incomplete evidence;
an optional expensive check need not block when its omission is justified. A no-op
uses the existing installation, leaves dependencies/tracked files untouched and
reports missing prerequisites without installing or repairing them.
