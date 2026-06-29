// Ambient declarations for non-code side-effect imports (e.g. global CSS).
// Lets the editor's TypeScript service resolve `import "../global.css"` without
// flagging it, matching how Next.js handles these at build time.
declare module "*.css";
