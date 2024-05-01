export const animationCreate = () => {
  if (typeof window !== "undefined") {
    (window as any).WOW = require("wowjs");
  }
  new (window as any).WOW.WOW({ live: false }).init();
};


export const mockSearch = (searchObjArr: any[], searchValue: string, key?: string) => {
  let result: any[] = [];
  if ( !searchValue || searchValue === "") {
    return searchObjArr;
  }
  for (const searchObj of searchObjArr) {
    const currObj = searchObj;
    if (key) {
      if (currObj[key] === searchValue) {
        result.push(currObj);
      }
    } else {
      const keys = Object.keys(currObj);
      for (let i = 0; i < keys.length; i++) {
        if (currObj[keys[i]].toString().toLowerCase().includes(searchValue.toLowerCase())) {
          result.push(currObj);
          break;
        }
      }
    } 
  }
  return result;
}