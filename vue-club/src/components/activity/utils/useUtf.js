/**
 * 表情转码
 * @param {string} str  需要转码的表情
 * @return {string} 转码后的字符串
 */
const utf16toEntities = str => {
  const patt = /[\ud800-\udbff][\udc00-\udfff]/g // 检测utf16字符正则
  str = str.replace(patt, char => {
    let H, L, code, s
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00 // 转换算法
      s = `&#${code};`
    } else {
      s = char
    }
    return s
  })
  return str
}

/**
 * 表情解码
 * @param {string} str  需要解码的字符串
 * @return {string} 转码后的表情
 */
const entitiestoUtf16 = strObj => {
  const patt = /&#\d+;/g
  const arr = strObj.match(patt) || []
  let H, L, code
  for (let i = 0; i < arr.length; i += 1) {
    code = arr[i]
    code = code.replace('&#', '').replace(';', '')
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xd800
    // 低位
    L = ((code - 0x10000) % 0x400) + 0xdc00
    code = `&#${code};`
    const s = String.fromCharCode(H, L)
    strObj = strObj.replace(code, s)
  }
  return strObj
}

export { utf16toEntities as changeToUtf, entitiestoUtf16 as changeToEmoji }
