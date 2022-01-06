export function createValidTitle(str){
    let validTitle=str;
   for (let index = 0; index < validTitle.length; index++) {
       const element = validTitle[index];
       if(/[a-z]/i.test(element)){
        validTitle=validTitle.toLowerCase();
          validTitle=validTitle.replace(element.toLowerCase(), element.toUpperCase());
          break;
       } 
       validTitle=validTitle.replace(element, ' '); 
   }
    
    validTitle = validTitle.trim().replace(/[^a-z \d,.!:?'-]/gi, function(){
return '';
    }).slice(0, 60);
 if(validTitle.length<6){
  validTitle= 'Default title';
 }
  return  validTitle;
}