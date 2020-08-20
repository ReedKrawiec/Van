export interface sprite{
  sprite_sheet:HTMLImageElement,
  left:number,
  top:number,
  sprite_width:number,
  sprite_height:number
}

export function sprite_gen(sprite_sheet:HTMLImageElement,sprite_width:number,sprite_height:number):Array<sprite>{
  let width = sprite_sheet.width;
  let sprites:Array<sprite> = [];
  for(let a = 0; a < width;a += sprite_width){
    sprites.push({
      sprite_sheet,
      left:a,
      top:0,
      sprite_height,
      sprite_width
    })
  }
  return sprites;
}