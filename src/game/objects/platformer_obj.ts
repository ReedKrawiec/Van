import {gravity_obj} from "../../lib/object";
import {obj_state} from "../../lib/state";

export interface plat_state extends obj_state{
  health:number  
}

export class platformer_obj<t> extends gravity_obj<t>{
  enemy = false;
  constructor(){
    super();
  }
  statef(a:number){
    let state = this.state as unknown as plat_state;
    if(state.health <= 0){
      this.delete();
    }
  }
}