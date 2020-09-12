export interface sprite{
  sprite_sheet:HTMLImageElement,
  left:number,
  top:number,
  sprite_width:number,
  sprite_height:number
}

export function sprite_gen(sprite_sheet:HTMLImageElement,sprite_width:number,sprite_height:number):Array<Array<sprite>>{
  let width = sprite_sheet.width;
  let height = sprite_sheet.height;
  let sprites:Array<Array<sprite>> = [];
  for(let b = 0; b < height;b += sprite_height){
    sprites.push([]);
    for(let a = 0; a < width;a += sprite_width){
      sprites[b].push({
        sprite_sheet,
        left:a,
        top:b * sprite_height,
        sprite_height,
        sprite_width
      })
    }
  }
  return sprites;
}

