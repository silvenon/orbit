const path = require("path");

const rePathNumbers = new RegExp(`(^|${path.sep})\\d+-`, "g");
const omitNumbers = filePath => filePath.replace(rePathNumbers, "$1");

function getDocumentUrl(fileUrl, hasTabs) {
  const { dir, base, name } = path.parse(fileUrl);
  if (!base.startsWith("01-")) {
    return omitNumbers(path.join(dir, name, "/"));
  }
  return hasTabs ? omitNumbers(path.join(dir, "/")) : omitNumbers(path.join(dir, name, "/"));
}

function getParentUrl(url) {
  return path.join(path.dirname(url), "/");
}

async function getDocumentTrail(cache, url, trail = []) {
  if (url === "/") {
    return trail;
  }

  const { title } = await cache.get(url);
  return getDocumentTrail(cache, getParentUrl(url), [{ name: title, url }, ...trail]);
}

module.exports = {
  omitNumbers,
  getDocumentUrl,
  getParentUrl,
  getDocumentTrail,
};
