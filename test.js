const hash = require('./index');
const fs = require('fs');

const tmpFilename = 'some_file';
const _hash = hash(tmpFilename);
const getHash = () => fs.readFileSync(tmpFilename).toString();

const tests = [
  function outputs_a_file() {
    _hash.generateBundle();
    return fs.existsSync(tmpFilename);
  },

  function bundle_contents_change_hash() {
    _hash.generateBundle(null, { 'foo': { code: '1' } });
    const first = getHash();
    _hash.generateBundle(null, { 'foo': { code: '2' } });
    const second = getHash();
    return first !== second;
  },

  function noops_dont_change_hash() {
    _hash.generateBundle(null, { 'foo': { code: '1' } });
    const first = getHash();
    _hash.generateBundle(null, { 'foo': { code: '1' } });
    const second = getHash();
    return first === second;
  },

  function other_files_change_hash() {
    const otherFileName = 'foo';
    const otherFilesHash = hash(tmpFilename, [otherFileName])
    fs.writeFileSync(otherFileName, '1');
    otherFilesHash.generateBundle();
    const first = getHash();
    fs.writeFileSync(otherFileName, '2');
    otherFilesHash.generateBundle();
    const second = getHash();
    fs.unlinkSync(otherFileName);
    return first !== second;
  }
];

for (const test of tests) {
  const result = test();
  fs.unlinkSync(tmpFilename);
  if (!result) throw `test failed: ${test.name}`;
}

console.log('tests OK');
