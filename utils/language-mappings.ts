export const languageMappings = {
  rust: "rs",
  rs: "rs",
  typescript: "ts",
  ts: "ts",
} as const;

export type Language = keyof typeof languageMappings;
