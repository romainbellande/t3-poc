/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';
import { paraglide } from '@inlang/paraglide-next/plugin';

/** @type {import("next").NextConfig} */
const config = paraglide({
  paraglide: {
    project: './project.inlang',
    outdir: './src/paraglide',
  },
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages
  serverExternalPackages: ['kysely', 'awilix'],
});

export default config;
