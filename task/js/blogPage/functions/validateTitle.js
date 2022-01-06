export function validateTitle(str, getValidStr){
    const reg=/^[A-Z][a-z \d,.!:?'-]{5,61}$/g;
  if(reg.test(str)) return str;
  return  getValidStr(str);
  }