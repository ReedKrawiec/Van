import {sprite} from "./sprite";
import {GetViewportDimensions} from "../van";
import {obj} from "./object";
import {obj_state} from "./state";

interface camera_state{
  scaling:number,
  stretch:boolean,
  position:{
    x:number,
    y:number
  }
  dimensions:{
    width:number,
    height:number
  }
}

export class Camera{
  state:camera_state
  constructor(x:number,y:number,width:number,height:number,scaling:number,stretch:boolean){
    this.state = {
      scaling,
      stretch,
      position:{
        x:x/scaling,
        y:y/scaling
      },
      dimensions:{
        width:width / scaling,
        height:height / scaling
      }
    }
  }
  set x(x:number){
    this.state.position.x = x;
  }
  set y(y:number){
    this.state.position.y = y 
  }
  get x(){
    return this.state.position.x;
  }
  get y(){
    return this.state.position.y;
  }

}

export interface render_func{
  (x:number,y:number,scaling:number):void
}

interface rectangle{
  width:number,
  height:number
}

interface sprite_args{
  sprite:sprite,
  x:number,
  y:number
}

interface renderer_args{
  context:CanvasRenderingContext2D,
  camera:Camera
}

export const sprite_renderer = (r:renderer_args,s:sprite_args) => {
  let camera = r.camera;
  let vheight = GetViewportDimensions().height;
  let final_x = ((s.x - camera.state.position.x) * r.camera.state.scaling);
  let final_y = ((vheight - s.y - s.sprite.sprite_height + camera.state.position.y) * r.camera.state.scaling);
  let height = s.sprite.sprite_height * r.camera.state.scaling;
  let width = s.sprite.sprite_width * r.camera.state.scaling;
  r.context.drawImage(
    s.sprite.sprite_sheet,
    s.sprite.left,
    s.sprite.top,
    s.sprite.sprite_width,
    s.sprite.sprite_height,
    final_x,
    final_y,
    width,
    height
  )
}

export const rect_renderer = (context:CanvasRenderingContext2D,rect:rectangle,x:number,y:number,color:string,camera:Camera) => {
  let vheight = GetViewportDimensions().height;
  let final_x = ((x - camera.state.position.x) * camera.state.scaling);
  let final_y = ((vheight - y - rect.height + camera.state.position.y) * camera.state.scaling);
  let height = rect.height * camera.state.scaling;
  let width = rect.width * camera.state.scaling;
  context.strokeStyle = color;
  context.strokeRect(final_x,final_y,rect.width,height);
}