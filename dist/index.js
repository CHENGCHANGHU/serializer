!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Serializer=t():e.Serializer=t()}("undefined"==typeof self?this:self,(()=>(()=>{"use strict";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{parse:()=>o,stringify:()=>i});class r{value;constructor(e){this.value=e}toString(){const e=Number(this.value);return isNaN(e)?"null":e.toLocaleString("en-US",{useGrouping:!1,maximumFractionDigits:20})}}function o(e){if(e=e.trim(),/^null$/.test(e))return null;if(/^true$/.test(e))return!0;if(/^false$/.test(e))return!1;if(/^\-?[1-9]\d*$/.test(e))return function(e){try{return"number"==typeof e?e:String(Number(e))===e||/^\-?(([1-9]\d*\.?\d*)|(0\.\d*))[eE][\+\-]?\d+$/.test(e)?Number(e):String(BigInt(e))===e?BigInt(e):NaN}catch(e){return console.error(e),NaN}}(e);if(/^\-?(([1-9]\d*)|(0))\.\d*$/.test(e))return new r(e);if(/^\-?(([1-9]\d*\.?\d*)|(0\.\d*))[eE][\+\-]?\d+$/.test(e))return Number(e);if(/^".*"$/.test(e))return e.slice(1,-1);if(/^\[.*\]$/.test(e)){const t=e.slice(1,-1).trim(),r=[];let i=0,n=0;for(;void 0!==t[n];){for(;/\s/.test(t[n]);)i++,n++;if('"'===t[n]){for(n++;!/^\"$/.test(t[n]);)/^\\$/.test(t[n])&&n++,n++;for(n++;/\s/.test(t[n]);)n++;if(r.push(o(t.slice(i,n))),void 0===t[n])break;if(","===t[n]){n++,i=n;continue}}if("["===t[n]){n++;let e=1;for(;0!==e&&void 0!==t[n];){if('"'===t[n]&&(n++,'"'!==t[n])){for(n++;!/^[^\\]"$/.test(t[n-1]+t[n]);)n++;n++}"["===t[n]&&e++,"]"===t[n]&&e--,n++}if(0!==e)throw new Error("Array is not closed!");for(;/\s/.test(t[n]);)n++;if(r.push(o(t.slice(i,n))),i=n,void 0===t[n])break;if(","===t[n]){i++,n++;continue}}if("{"===t[n]){n++;let e=1;for(;0!==e&&void 0!==t[n];){if('"'===t[n]&&(n++,'"'!==t[n])){for(n++;!/^[^\\]"$/.test(t[n-1]+t[n]);)n++;n++}"{"===t[n]&&e++,"}"===t[n]&&e--,n++}if(0!==e)throw new Error("Object is not closed!");for(;/\s/.test(t[n]);)n++;if(r.push(o(t.slice(i,n))),i=n,void 0===t[n])break;if(","===t[n]){i++,n++;continue}}for(;","!==t[n]&&void 0!==t[n];)n++;if(","!==t[n]){if(void 0===t[n]){r.push(o(t.slice(i,n)));break}}else r.push(o(t.slice(i,n))),n++,i=n}return r}if(/^{.*}$/.test(e)){const t=e.slice(1,-1).trim(),r={};let i=0,n=0;for(;void 0!==t[n];){for(;/\s/.test(t[n]);)i++,n++;if('"'!==t[n])throw new Error("Invalid object key!");for(i=n,n++;!/^\"$/.test(t[n]);)/^\\$/.test(t[n])&&n++,n++;n++;const e=t.slice(i+1,n-1);for(;/\s/.test(t[n]);)n++;if(":"!==t[n])throw new Error("Colon Missing!");for(n++;/\s/.test(t[n]);)n++;if(i=n,'"'===t[n]){for(n++;!/^\"$/.test(t[n]);)/^\\$/.test(t[n])&&n++,n++;for(n++;/\s/.test(t[n]);)n++;if(r[e]=o(t.slice(i,n)),i=n,void 0===t[n])break;if(","===t[n]){i++,n++;continue}}if("["===t[n]){n++;let s=1;for(;0!==s&&void 0!==t[n];){if('"'===t[n]&&(n++,'"'!==t[n])){for(n++;!/^[^\\]"$/.test(t[n-1]+t[n]);)n++;n++}"["===t[n]&&s++,"]"===t[n]&&s--,n++}if(0!==s)throw new Error("Array is not closed!");for(;/\s/.test(t[n]);)n++;if(r[e]=o(t.slice(i,n)),i=n,void 0===t[n])break;if(","===t[n]){i++,n++;continue}}if("{"===t[n]){n++;let s=1;for(;0!==s&&void 0!==t[n];){if('"'===t[n]&&(n++,'"'!==t[n])){for(n++;!/^[^\\]"$/.test(t[n-1]+t[n]);)n++;n++}"{"===t[n]&&s++,"}"===t[n]&&s--,n++}if(0!==s)throw new Error("Object is not closed!");for(;/\s/.test(t[n]);)n++;if(r[e]=o(t.slice(i,n)),i=n,void 0===t[n])break;if(","===t[n]){i++,n++;continue}}for(;","!==t[n]&&void 0!==t[n];)n++;if(","!==t[n]){if(void 0===t[n]){r[e]=o(t.slice(i,n));break}}else r[e]=o(t.slice(i,n)),n++,i=n}return r}throw new Error("Invalid JSON String!")}function i(e="",{indentionString:t=" ",indentionLevel:r=0,toHTML:o=!1}={indentionString:" ",indentionLevel:0,toHTML:!1}){const n=new Array(r).fill(t).join("");switch(Object.prototype.toString.call(e)){case"[object Undefined]":return o?'<span style="color: #0000aa;">undefined</span>':"undefined";case"[object Null]":return o?'<span style="color: #0000aa;">null</spa>':"null";case"[object String]":return o?`<span style="color: #aaaa00;">"${e.toString()}"</span>`:`"${e.toString()}"`;case"[object Number]":case"[object Boolean]":return o?`<span style="color: #0000aa;">${e.toString()}</span>`:e.toString();case"[object Array]":return e.length?`[\n${n}${t}${e.map((e=>i(e,{indentionString:t,indentionLevel:r+1,toHTML:o}))).join(`,\n${n}${t}`)}\n${n}]`:"[]";case"[object Object]":return Object.keys(e).length?`{\n${n}${t}${Object.keys(e).map((n=>`"${n}":${t}${i(e[n],{indentionString:t,indentionLevel:r+1,toHTML:o})}`)).join(`,\n${n}${t}`)}\n${n}}`:"{}";default:return console.log(Object.prototype.toString.call(e)),e}}return t})()));