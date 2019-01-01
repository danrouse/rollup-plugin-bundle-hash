const fs = require('fs');
const hasha = require('hasha');

function bundleHash(file, otherFiles = []) {
  return {
    name: 'bundle-hash',
    generateBundle: function(options = {}, bundle = {}, isWrite = false) {
      const bundleContent = Object.values(bundle).map(f => f.code);
      const otherContent = otherFiles.map(f => fs.readFileSync(f));
      const content = bundleContent.join('') + otherContent.join('');
      const hash = hasha(content);
      fs.writeFileSync(file, hash);
    }
  };
}

module.exports = bundleHash;
