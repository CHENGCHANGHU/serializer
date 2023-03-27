/**
 * Transform a string to a number or a bigint.
 * When the value cannot be transformed, return NaN.
 * @param value string
 * @returns a number, a bigint or NaN
 */
export function Integer(value: string | number): number | bigint {
  try {
    if (typeof value === 'number') {
      return value;
    }
    if (String(Number(value)) === value) {
      return Number(value);
    }
    if (String(BigInt(value)) === value) {
      return BigInt(value);
    }
    return NaN;
  } catch (e) {
    console.error(e);
    return NaN;
  }
}

class StringifyFloat {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    const floatNumber = Number(this.value);
    if (isNaN(floatNumber)) {
      return 'null';
    }
    return floatNumber.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 20,
    });
  }
}

/**
 * Transform a value to a StringifyFloat.
 * @param value string
 * @returns a StringifyFloat
 */
export function Float(value: string): StringifyFloat {
  return new StringifyFloat(value);
}

const DefaultOption: StringifyOption = {
  placeholder: ' ',
  depth: 0,
};

interface StringifyOption {
  placeholder?: string,
  depth?: number,
}

export function stringify<T = any>(
  object: T,
  option: StringifyOption = DefaultOption,
): string {
  const { placeholder, depth } = {
    ...DefaultOption,
    ...option,
  };
  const indentionText = (new Array(depth)).fill(placeholder).join('');

  const type = Object.prototype.toString.call(object);

  let keys: string[] = [];
  if (type === '[object Object]') {
    keys = Object.keys(object)
      .filter((key: string) => (object as unknown as any)[key] !== undefined);
  }

  switch (type) {
    case '[object Null]':
      return 'null';
    case '[object String]':
      return `"${object as unknown as string}"`;
    case '[object BigInt]':
      return (object as unknown as bigint).toString();
    case '[object Number]':
      if (isNaN(object as unknown as number)) {
        return 'null';
      }
      return (object as unknown as number).toString();
    case '[object Boolean]':
      return (object as unknown as boolean).toString();
    case '[object Array]':
      return (object as unknown as any[]).length !== 0
        ? `[\n${indentionText}${placeholder}${
          (object as unknown as any[])
            .map((item: any) => stringify(
              item === undefined ? null : item,
              {
                placeholder,
                depth: (depth || 0) + 1,
              },
            ))
            .join(`,\n${indentionText}${placeholder}`)
        }\n${indentionText}]`
        : '[]';
    case '[object Object]':
      if (object instanceof StringifyFloat) {
        return object.toString();
      }
      return keys.length !== 0
        ? `{\n${indentionText}${placeholder}${
          keys
            .map((key: string) => `"${key}": ${
              stringify((object as unknown as any)[key], {
                placeholder,
                depth: (depth || 0) + 1,
              })
            }`)
            .join(`,\n${indentionText}${placeholder}`)
        }\n${indentionText}}`
        : '{}';
    default:
      throw new Error(`Unhandled type ${Object.prototype.toString.call(object)}!`);
  }
}

export function parse(value: string) {
  if (typeof value !== 'string') {
    throw new Error('The value is not a string!');
  }
  const trimmedValue = value.trim();
  if (/^\s*$/.test(trimmedValue)) {
    throw new Error('The value is not a valid string!');
  }

  if (/^true$/.test(trimmedValue)) {
    return true;
  }
  if (/^false$/.test(trimmedValue)) {
    return false;
  }
  if (/^null$/.test(trimmedValue)) {
    return null;
  }
  if (/^\d+$/.test(trimmedValue)) {
    return Integer(trimmedValue);
  }
  if (/^\d+\.\d+$/.test(trimmedValue)) {
    return Float(trimmedValue);
  }
  if (/^".*"$/.test(trimmedValue)) {
    return trimmedValue.slice(1, -1);
  }

  throw new Error('The value is not a valid string!');
}
