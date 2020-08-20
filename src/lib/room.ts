import { gravity_obj,obj } from "./object";
import { sprite } from "./sprite";
import { obj_state } from "./state";
import { velocity_collision_check } from "./collision";

export function apply_gravity(ob:gravity_obj<unknown>,grav_const:number, grav_max:number){
  let st = ob.state as obj_state;
  if(ob.gravity && st.velocity.y > grav_max){
    st.velocity.y += grav_const;
  }
}

export class room<T>{
  background_url: string = "";
  background: HTMLImageElement;
  objects: Array<obj<unknown>>
  state: T
  load() {
    let _this = this;
    return new Promise(async (resolve, reject) => {
      let a = new Image();
      let to_await = this.objects.map((a) => a.load());
      await Promise.all(to_await);
      a.src = this.background_url;
      a.onerror = (() => {
        console.log("error loading url:" + this.background_url);
      })
      a.onload = (() => {
        _this.background = a;
        resolve();
      });
    })
  }
  register_controls(){

  }
  cleanup(){

  }
  statef(time: number) {
    for (let a = 0; a < this.objects.length; a++) {
      this.objects[a].statef(time);
    }
  }
  getObj(id:string){
    for(let a = 0; a < this.objects.length; a++){
      if(this.objects[a].id == id){
        return this.objects[a];
      }
    }
    return false;
  }
  renderf(time: number): sprite {
    return {
      sprite_sheet: this.background,
      left: 0,
      top: 0,
      sprite_height: this.background.height,
      sprite_width: this.background.width
    }
  }
}