import crypto from "crypto"

export function buildFingerprint(audio) {
  // Creates random Buffer of 2500 bytes for now.
  return crypto.randomBytes(2500);
}
