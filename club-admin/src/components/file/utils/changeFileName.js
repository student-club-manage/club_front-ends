// 返回一个函数,有两个变量,一个是文件字符串,一个是文件名,返回一个新的文件字符串,文件名为传入的文件名
export default function changeFileName(fileStr, fileName) {
  const suffix = fileStr.substring(fileStr.lastIndexOf(".") + 1);

  return fileName + "." + suffix;
}
