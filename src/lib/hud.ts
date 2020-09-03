import {obj} from "./object";
import {getGame} from "../van";
import { Goomba } from "../game/objects/goomba";

interface HudTextGetFunc{
  ():string
}

export interface TextSetting{
  x:number,
  y:number,
  font:Font
}

export interface Font{
  max_width?:number,
  size:number,
  font:string,
  color:string,
  text:string
}

export interface HudText{
  max_width?:number,
  position:{
    x:number,
    y:number
  }
  size:number;
  font:string;
  color:string;
  text?:string;
}
export class HUD{
  graphic_elements:Array<obj<unknown>> = [];
  text_elements:Array<Text> = [];
  constructor(){
   this.text_elements.push(new Text({
    position:{
      x:10,
      y:750
    },
    size:44,
    font: "Alata",
    color:"white"
   },()=> {
     let x = getGame().getRoom().getObj("player") as Goomba;
     return x.state.selected + "";
    })); 
  }
  statef(a:number){
    for(let x of this.graphic_elements){
      x.statef(a);
    }
    for(let x of this.text_elements){
      x.statef(a);
    }
  }
}

export class Text{
  get_func:HudTextGetFunc;
  state:HudText;
  constructor(a:HudText,b:HudTextGetFunc){
    this.state = a;
    if(!this.state.text){
      this.state.text = "";
    }
    this.get_func = b;
  }
  statef(a:number){
   this.state.text = this.get_func();
  }
  renderf(a:number):Font{
    let {size,color,font,text} = this.state;
    return {
      size,
      color,
      font,
      text
    };
  }
}