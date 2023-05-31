import { Integer, Float } from "./base.mjs";

export function parse(string) {
  string = string.trim();

  if (/^null$/.test(string)) {
    return null;
  }
  if (/^true$/.test(string)) {
    return true;
  }
  if (/^false$/.test(string)) {
    return false;
  }
  if (/^\-?[1-9]\d*$/.test(string)) {
    return Integer(string);
  }
  if (/^\-?(([1-9]\d*)|(0))\.\d*$/.test(string)) {
    return Float(string);
  }
  // scientific notation
  if (/^\-?(([1-9]\d*\.?\d*)|(0\.\d*))[eE][\+\-]?\d+$/.test(string)) {
    return Number(string);
  }
  if (/^".*"$/.test(string)) {
    return string.slice(1, -1);
  }
  if (/^\[.*\]$/.test(string)) {
    const arrayContent = string.slice(1, -1).trim();
    const array = [];
    let i = 0;
    let j = 0;
    while (arrayContent[j] !== undefined) {
      while (/\s/.test(arrayContent[j])) {
        i++;
        j++;
        continue;
      }
      if (arrayContent[j] === '"') {
        j++;
        while (!/^\"$/.test(arrayContent[j])) {
          if (/^\\$/.test(arrayContent[j])) j++;
          j++;
        }
        j++;
        while (/\s/.test(arrayContent[j])) j++;
        array.push(parse(arrayContent.slice(i, j)));
        if (arrayContent[j] === undefined) break;
        if (arrayContent[j] === ',') {
          j++;
          i = j;
          continue;
        }
      }
      if (arrayContent[j] === '[') {
        j++;
        let depth = 1;
        while (depth !== 0 && arrayContent[j] !== undefined) {
          if (arrayContent[j] === '"') {
            j++;
            if (arrayContent[j] !== '"') {
              j++;
              while (!/^[^\\]"$/.test(arrayContent[j - 1] + arrayContent[j])) j++;
              j++;
            }
          }
          if (arrayContent[j] === '[') depth++;
          if (arrayContent[j] === ']') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Array is not closed!');
        while (/\s/.test(arrayContent[j])) j++;
        array.push(parse(arrayContent.slice(i, j)));
        i = j;
        if (arrayContent[j] === undefined) break;
        if (arrayContent[j] === ',') {
          i++;
          j++;
          continue;
        }
      }
      if (arrayContent[j] === '{') {
        j++;
        let depth = 1;
        while (depth !== 0 && arrayContent[j] !== undefined) {
          if (arrayContent[j] === '"') {
            j++;
            if (arrayContent[j] !== '"') {
              j++;
              while (!/^[^\\]"$/.test(arrayContent[j - 1] + arrayContent[j])) j++;
              j++;
            }
          }
          if (arrayContent[j] === '{') depth++;
          if (arrayContent[j] === '}') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Object is not closed!');
        while (/\s/.test(arrayContent[j])) j++;
        array.push(parse(arrayContent.slice(i, j)));
        i = j;
        if (arrayContent[j] === undefined) break;
        if (arrayContent[j] === ',') {
          i++;
          j++;
          continue;
        }
      }
      while (arrayContent[j] !== ',' && arrayContent[j] !== undefined) {
        j++;
      }
      if (arrayContent[j] === ',') {
        array.push(parse(arrayContent.slice(i, j)));
        j++;
        i = j;
        continue;
      }
      if (arrayContent[j] === undefined) {
        array.push(parse(arrayContent.slice(i, j)));
        break;
      }
    }
    return array;
  }
  if (/^{.*}$/.test(string)) {
    const objectContent = string.slice(1, -1).trim();
    const object = {};
    let i = 0;
    let j = 0;
    while (objectContent[j] !== undefined) {
      while (/\s/.test(objectContent[j])) {
        i++;
        j++;
        continue;
      }
      if (objectContent[j] !== '"') throw new Error('Invalid object key!');
      i = j;
      j++;
      while (!/^\"$/.test(objectContent[j])) {
        if (/^\\$/.test(objectContent[j])) j++;
        j++;
      }
      j++;
      const key = objectContent.slice(i + 1, j - 1);
      while (/\s/.test(objectContent[j])) j++;
      if (objectContent[j] !== ':') throw new Error('Colon Missing!');
      j++;
      while (/\s/.test(objectContent[j])) j++;
      i = j;
      if (objectContent[j] === '"') {
        j++;
        while (!/^\"$/.test(objectContent[j])) {
          if (/^\\$/.test(objectContent[j])) j++;
          j++;
        }
        j++;
        while (/\s/.test(objectContent[j])) j++;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        if (objectContent[j] === undefined) break;
        if (objectContent[j] === ',') {
          i++;
          j++;
          continue;
        }
      }
      if (objectContent[j] === '[') {
        j++;
        let depth = 1;
        while (depth !== 0 && objectContent[j] !== undefined) {
          if (objectContent[j] === '"') {
            j++;
            if (objectContent[j] !== '"') {
              j++;
              while (!/^[^\\]"$/.test(objectContent[j - 1] + objectContent[j])) j++;
              j++;
            }
          }
          if (objectContent[j] === '[') depth++;
          if (objectContent[j] === ']') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Array is not closed!');
        while (/\s/.test(objectContent[j])) j++;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        if (objectContent[j] === undefined) break;
        if (objectContent[j] === ',') {
          i++;
          j++;
          continue;
        }
      }
      if (objectContent[j] === '{') {
        j++;
        let depth = 1;
        while (depth !== 0 && objectContent[j] !== undefined) {
          if (objectContent[j] === '"') {
            j++;
            if (objectContent[j] !== '"') {
              j++;
              while (!/^[^\\]"$/.test(objectContent[j - 1] + objectContent[j])) j++;
              j++;
            }
          }
          if (objectContent[j] === '{') depth++;
          if (objectContent[j] === '}') depth--;
          j++;
        }
        if (depth !== 0) throw new Error('Object is not closed!');
        while (/\s/.test(objectContent[j])) j++;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        if (objectContent[j] === undefined) break;
        if (objectContent[j] === ',') {
          i++;
          j++;
          continue;
        }
      }
      while (objectContent[j] !== ',' && objectContent[j] !== undefined) {
        j++;
      }
      if (objectContent[j] === ',') {
        object[key] = parse(objectContent.slice(i, j));
        j++;
        i = j;
        continue;
      }
      if (objectContent[j] === undefined) {
        object[key] = parse(objectContent.slice(i, j));
        break;
      }
    }
    return object;
  }

  throw new Error('Invalid JSON String!');
}
