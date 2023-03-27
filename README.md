# @golden-tiger/serializer

## parse

Parse a string to a valid JS value.

## stringify

Serialize a JS value to a JS string.

## Example

```js
import Serializer from '@golden-tiger/serializer'; // mjs
const Serializer = require('@golden-tiger/serializer'); // cjs

console.log(Serializer.parse('[true]'));
// [true]

console.log(Serializer.stringify([true]));
// [
//  true
// ]
```
