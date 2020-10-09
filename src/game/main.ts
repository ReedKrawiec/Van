import {velocity,obj_state,room_state} from "../lib/state";
import {Overworld} from "./rooms/overworld";
import {game} from "../van";



interface player{
  power:number;
}

let canvas_element:HTMLCanvasElement = document.getElementById("target") as HTMLCanvasElement;

export let g = new game(canvas_element.getContext("2d"),{});

g.loadRoom(new Overworld());

