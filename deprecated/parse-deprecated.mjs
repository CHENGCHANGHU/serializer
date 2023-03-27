import { Integer, Float } from "../src/base.mjs";

export function parse(value) {
  if (typeof value !== 'string') {
    throw new Error('The value is not a string!');
  }

  value = value.trim();
  if (/^\s*$/.test(value)) {
    throw new Error('The value is not a valid string!');
  }

  if (/^true$/.test(value)) {
    return true;
  }
  if (/^false$/.test(value)) {
    return false;
  }
  if (/^null$/.test(value)) {
    return null;
  }
  if (/^-?\d+$/.test(value)) {
    return Integer(value);
  }
  if (/^-?\d+\.\d+$/.test(value)) {
    return Float(value);
  }
  if (/^".*"$/.test(value)) {
    return value.slice(1, -1);
  }
  if (/^\[.*\]$/.test(value)) {
    return parseArray(value);
  }
  if (/\{.*\}/.test(value)) {
    return parseObject(value);
  }

  throw new Error('The value is not a valid string!');
}

function parseArray(value) {
  const arrayContent = value.slice(1, -1).trim();
  const array = [];

  for (let i = 0, j = 0; j < arrayContent.length;) {
    const char = arrayContent[j];
    if (/\s/.test(char)
      || char === ','
    ) {
      i++;
      j++;
      continue;
    }
    if (char === 'n') {
      j += 4;
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === 't') {
      j += 4;
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === 'f') {
      j += 5;
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === '0') {
      j++;
      while (/\s/.test(arrayContent[j])) {
        j++;
      }
      if (arrayContent[j] !== undefined
        && arrayContent[j] !== ','
        && arrayContent[j] !== ']'
        && arrayContent[j] !== '}'
      ) {
        throw new Error(`Error at ${arrayContent[j]}`);
      }
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (/[\-1-9]/.test(char)) {
      j++;
      while (/[\d\.]/.test(arrayContent[j])
        && j < arrayContent.length
      ) {
        j++;
      }
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === '"') {
      j++;
      while (arrayContent[j] !== '"') {
        j++;
      }
      j++;
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === '[') {
      let depth = 1;
      j++;
      while (depth) {
        if (arrayContent[j] === '[') {
          depth++;
        }
        if (arrayContent[j] === ']') {
          depth--;
        }
        j++;
      }
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    if (char === '{') {
      let depth = 1;
      j++;
      while (depth) {
        if (arrayContent[j] === '{') {
          depth++;
        }
        if (arrayContent[j] === '}') {
          depth--;
        }
        j++;
      }
      array.push(parse(arrayContent.slice(i, j)));
      i = j;
      continue;
    }
    throw new Error(`Error at ${char}!`);
  }
  return array;
}

function parseObject(value) {
  const objectContent = value.slice(1, -1).trim();
  const object = {};

  for (let i = 0, j = 0; j < objectContent.length;) {
    const char = objectContent[j];
    if (/\s/.test(char)
      || char === ','
    ) {
      i++;
      j++;
      continue;
    }
    if (char === '"') {
      j++;
      while (objectContent[j] !== '"') {
        j++;
      }
      j++;
      const key = parse(objectContent.slice(i, j));
      let colonPassed = false;
      while (/\s/.test(objectContent[j])
        || objectContent[j] === ':'
      ) {
        if (objectContent[j] === ':') {
          if (colonPassed) {
            throw new Error('Invalid object string');
          }
          colonPassed = true;
        }
        j++;
      }
      i = j;
      const valueChar = objectContent[j];
      if (valueChar === 'n') {
        j += 4;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === 't') {
        j += 4;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === 'f') {
        j += 5;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === '0') {
        j++;
        while (/\s/.test(objectContent[j])) {
          j++;
        }
        if (objectContent[j] !== undefined
          && objectContent[j] !== ','
          && objectContent[j] !== ']'
          && objectContent[j] !== '}'
        ) {
          throw new Error(`Error at ${objectContent[j]}`);
        }
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (/[\-1-9]/.test(valueChar)) {
        j++;
        while (/[\d\.]/.test(objectContent[j])
          && j < objectContent.length
        ) {
          j++;
        }
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === '"') {
        j++;
        while (objectContent[j] !== '"') {
          j++;
        }
        j++;
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === '[') {
        let depth = 1;
        j++;
        while (depth) {
          if (objectContent[j] === '[') {
            depth++;
          }
          if (objectContent[j] === ']') {
            depth--;
          }
          j++;
        }
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      if (valueChar === '{') {
        let depth = 1;
        j++;
        while (depth) {
          if (objectContent[j] === '{') {
            depth++;
          }
          if (objectContent[j] === '}') {
            depth--;
          }
          j++;
        }
        object[key] = parse(objectContent.slice(i, j));
        i = j;
        continue;
      }
      throw new Error(`Error at ${valueChar}!`);
    }
  }
  return object;
}
