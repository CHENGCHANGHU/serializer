/**
 * Transform a string to a number or a bigint.
 * When the value cannot be transformed, return NaN.
 * @param value string
 * @returns a number, a bigint or NaN
 */
export function Integer(value) {
  try {
    if (typeof value === 'number') {
      return value;
    }
    if (String(Number(value)) === value
      || /^\-?(([1-9]\d*\.?\d*)|(0\.\d*))[eE][\+\-]?\d+$/.test(value)
    ) {
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

class FloatClass {
  value;

  constructor(value) {
    this.value = value;
  }

  toString() {
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
 * Transform a value to a FloatClass.
 * @param value string
 * @returns a FloatClass
 */
export function Float(value) {
  return new FloatClass(value);
}
