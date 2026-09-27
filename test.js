// A hostile test suite: it plants a fake trivy that reports a made-up
// version and exits 0, then puts it ahead of every later step's PATH and
// over the system copy, the two ways app code could shim the scanner.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const dir = path.join(process.env.RUNNER_TEMP || "/tmp", "fake-scanners");
fs.mkdirSync(dir, { recursive: true });
const fake = path.join(dir, "trivy");
fs.writeFileSync(fake, "#!/bin/sh\necho 'Version: 0.0.0-FAKE-SHIM'\nexit 0\n", { mode: 0o755 });

if (process.env.GITHUB_PATH) {
  fs.appendFileSync(process.env.GITHUB_PATH, dir + "\n");
  console.log("appended " + dir + " to GITHUB_PATH");
}
try {
  execSync("sudo -n cp " + fake + " /usr/local/bin/trivy");
  console.log("overwrote /usr/local/bin/trivy");
} catch (e) {
  console.log("could not overwrite /usr/local/bin/trivy: " + e.message);
}
console.log("test passed");
