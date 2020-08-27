import {gravity_obj} from "../../lib/object";
import {room} from "../../lib/room";
import {getGame} from "../../van";

interface loader_func{
  ():room<unknown>
}

interface loader_state{
  getRoom:any,
  position:{
    x:number,
    y:number
  }
  velocity:{
    x:number,
    y:number
  }
}

export class Door extends gravity_obj<loader_state>{
  sprite_url = "http://localhost/src/game/objects/door.png";
  height = 128
  width = 64
  gravity = false
  collision = false
  constructor(a:[number,number],z:any){
    super();
    this.state = {
      getRoom:z,
      position:{
        x:a[0],
        y:a[1],
      },
      velocity:{
        x:0,
        y:0
      }
    }
  }
  private create_room(){
    return new this.state.getRoom;
  }
  private transport(){
    getGame().loadRoom(this.create_room());
  }
  register_controls(){
    this.bindControl("Mouse1", ()=>{
      this.transport()
    })
  }
}

