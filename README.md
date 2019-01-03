# rollup-plugin-bundle-hash

Write rollup output content hashes to a file.

## Installation

```sh
npm install --save-dev rollup-plugin-bundle-hash
```

## Usage

Add this plugin at the end of your `plugins` array, after compiled assets are available for hashing. A hash of bundle contents will be written to a file.

```js
// rollup.config.js
import bundleHash from 'rollup-plugin-bundle-hash';

export default {
  // ...
  plugins: [
    bundleHash('path/to/output.hash')
  ]
}
```

## Options

A second argument can be passed with an array of paths to non-bundled assets that you want included in the content hash, for example CSS not handled by rollup.

```js
bundleHash('output.hash', ['dist/bundle.css', 'dist/something'])
```

## Why?

To provide a way to track bundle updates more accurately than checking bundle filesize or modification time. Rollup will touch output bundles even if they don't change, which can be annoying when live-reloading.
