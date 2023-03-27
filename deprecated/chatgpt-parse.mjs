function parseJSON(jsonStr) {
  let index = 0;

  function parseValue() {
    const char = jsonStr[index];
    if (char === '{') {
      return parseObject();
    } else if (char === '[') {
      return parseArray();
    } else if (char === '"') {
      return parseString();
    } else if (char === 't') {
      return parseTrue();
    } else if (char === 'f') {
      return parseFalse();
    } else if (char === 'n') {
      return parseNull();
    } else {
      return parseNumber();
    }
  }

  function parseObject() {
    const obj = {};
    index++;
    while (jsonStr[index] !== '}') {
      const key = parseString();
      index++;
      const value = parseValue();
      obj[key] = value;
      if (jsonStr[index] === ',') {
        index++;
      }
    }
    index++;
    return obj;
  }

  function parseArray() {
    const arr = [];
    index++;
    while (jsonStr[index] !== ']') {
      const value = parseValue();
      arr.push(value);
      if (jsonStr[index] === ',') {
        index++;
      }
    }
    index++;
    return arr;
  }

  function parseString() {
    let str = '';
    index++;
    while (jsonStr[index] !== '"') {
      str += jsonStr[index];
      index++;
    }
    index++;
    return str;
  }

  function parseTrue() {
    index += 4;
    return true;
  }

  function parseFalse() {
    index += 5;
    return false;
  }

  function parseNull() {
    index += 4;
    return null;
  }

  function parseNumber() {
    let numStr = '';
    while (/[\d.+-]/.test(jsonStr[index])) {
      numStr += jsonStr[index];
      index++;
    }
    return parseFloat(numStr);
  }

  return parseValue();
}

console.log(parseJSON('[[1,2], ",,,"]'));
