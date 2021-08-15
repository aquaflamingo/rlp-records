import crypto from "crypto";

export function createFingerprintFileName(title) {
  let t = title.replace(/ /g, "_");
  t = t.replace(/[()]/g, "");

  return `${t}.fingerprint`;
}

export function buildFingerprint(audio) {
  // Creates random Buffer of 2500 bytes for now.
  return crypto.randomBytes(2500);
}
