/**
 * format javascript object to string
 * @param {*} obj
 * @param {*} {
    indentionString = ' ',
    indentionLevel = 0,
    toHTML = false,
  }
 * @returns
 */
export function stringify(
  obj = '',
  {
    indentionString = ' ',
    indentionLevel = 0,
    toHTML = false,
  } = {
    indentionString: ' ',
    indentionLevel: 0,
    toHTML: false,
  },
) {
  const indentionText = (new Array(indentionLevel)).fill(indentionString).join('');
  switch (Object.prototype.toString.call(obj)) {
    case '[object Undefined]':
      return toHTML ? '<span style="color: #0000aa;">undefined</span>' : 'undefined';
    case '[object Null]':
      return toHTML ? '<span style="color: #0000aa;">null</spa>' : 'null';
    case '[object String]':
      return toHTML ? `<span style="color: #aaaa00;">"${obj.toString()}"</span>` : `"${obj.toString()}"`;
    case '[object Number]':
      return toHTML ? `<span style="color: #0000aa;">${obj.toString()}</span>` : obj.toString();
    case '[object Boolean]':
      return toHTML ? `<span style="color: #0000aa;">${obj.toString()}</span>` : obj.toString();
    case '[object Array]':
      return obj.length
        ? `[\n${indentionText}${indentionString}${
          obj.map(_ => stringify(_, {
            indentionString, indentionLevel: indentionLevel + 1, toHTML,
          }))
            .join(`,\n${indentionText}${indentionString}`)
        }\n${indentionText}]`
        : '[]';
    case '[object Object]':
      return Object.keys(obj).length
        ? `{\n${indentionText}${indentionString}${
          Object.keys(obj).map(k => `"${k}":${indentionString}${
            stringify(obj[k], {
              indentionString,
              indentionLevel: indentionLevel + 1,
              toHTML,
            })
          }`).join(`,\n${indentionText}${indentionString}`)
        }\n${indentionText}}`
        : '{}';
    default:
      console.log(Object.prototype.toString.call(obj));
      return obj;
  }
}
