window.addEventListener("keydown",(e)=>{
  console.log(binds);
  if(e.code in binds){
    for(let a = 0;a < binds[e.code].length;a++){
      binds[e.code][a]();
    }
  }
})

window.addEventListener("mousemove",(e)=>{
  
})

let binds:any = {};

interface control_func{
  ():void
}

export function Bind(keyname:string,func:control_func){
  if(binds[keyname] == undefined){
    binds[keyname] = [];
  }
  binds[keyname].push(func);
}