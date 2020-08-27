/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/van.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game/objects/box.ts":
/*!*********************************!*\
  !*** ./src/game/objects/box.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
class Box extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/box.png";
        this.collision = true;
        this.height = 64;
        this.width = 500;
        this.gravity = false;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    register_controls() {
        this.bindControl("Mouse1", () => {
            this.delete();
        });
    }
}
exports.Box = Box;


/***/ }),

/***/ "./src/game/objects/goomba.ts":
/*!************************************!*\
  !*** ./src/game/objects/goomba.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.StandingGoomba = exports.Goomba = void 0;
const sprite_1 = __webpack_require__(/*! ../../lib/sprite */ "./src/lib/sprite.ts");
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
})(direction || (direction = {}));
class Goomba extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        if (id != undefined) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            selected: false
        };
    }
    renderf(t) {
        let sprites = sprite_1.sprite_gen(this.sprite_sheet, this.width, this.height);
        if (Math.floor(t / 250) % 2 == 0) {
            return sprites[0];
        }
        else {
            return sprites[1];
        }
    }
    register_controls() {
        /*
        this.bindControl("Mouse1",()=>{
          this.state.velocity.x = 0;
          this.state.velocity.y = 0;
          this.state.selected = !this.state.selected;
          this.gravity = !this.gravity;
        });
        */
        this.bindControl("KeyA", () => {
            this.state.velocity.x = -3;
        });
        this.bindControl("KeyD", () => {
            this.state.velocity.x = 3;
        });
        this.bindControl("KeyW", () => {
            this.state.velocity.y += 15;
        });
    }
    statef(time) {
        /*
        if(this.state.selected){
          let mouse_position = Poll_Mouse();
          if(mouse_position.y > mouse_position.last.y){
            if(this.collision_check({
              x:this.state.position.x,
              y:this.state.position.y + this.height,
              width:this.width,
              height:1
            }).length == 0){
              this.state.position.y = mouse_position.y - this.height/2;
            }
          }
          else if(mouse_position.y < mouse_position.last.y){
            if(this.collision_check({
              x:this.state.position.x,
              y:this.state.position.y - 1,
              width:this.width,
              height:1
            }).length == 0){
              this.state.position.y = mouse_position.y - this.height/2;
            }
          }
          if(mouse_position.x < mouse_position.last.x){
            if(this.collision_check({
              x:this.state.position.x - 1,
              y:this.state.position.y,
              width:1,
              height:this.height
            }).length == 0){
              this.state.position.x = mouse_position.x - this.width/2;
            }
          }
          else if(mouse_position.x > mouse_position.last.x){
            if(this.collision_check({
              x:this.state.position.x + this.width,
              y:this.state.position.y,
              width:1,
              height:this.height
            }).length == 0){
              this.state.position.x = mouse_position.x - this.width/2;
            }
          }
        }
        else if(getGame().getRoom().check_collisions({
          x:this.state.position.x,
          y:this.state.position.y - 1,
          width:this.width,
          height:1
        }).length > 0){
          let left_fall_box:collision_box = {
            x:this.state.position.x - this.width - 3,
            y:this.state.position.y - this.height,
            height:this.height,
            width:this.width
          }
          let left_wall_box:collision_box = {
            x:this.state.position.x - 3,
            y:this.state.position.y,
            height:this.height,
            width:3
          }
          let right_fall_box:collision_box = {
            x:this.state.position.x + this.width + 3,
            y:this.state.position.y - this.height,
            height:this.height,
            width:this.width
          }
          let right_wall_box:collision_box = {
            x:this.state.position.x + this.width,
            y:this.state.position.y,
            height:this.height,
            width:3
          }
          if(this.state.direction == direction.right){
            this.state.velocity.x = 3;
            if(getGame().getRoom().check_collisions(right_fall_box).length == 0 || getGame().getRoom().check_collisions(right_wall_box).length > 0){
              this.state.direction = direction.left;
            }
          }
          else if(this.state.direction == direction.left){
            this.state.velocity.x = -3;
            if(getGame().getRoom().check_collisions(left_fall_box).length == 0 || getGame().getRoom().check_collisions(left_wall_box).length > 0){
              this.state.direction = direction.right;
            }
          }
        }
        */
    }
}
exports.Goomba = Goomba;
class StandingGoomba extends object_1.gravity_obj {
    constructor(x, y, id = undefined) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        if (id) {
            this.id = id;
        }
        this.state = {
            direction: direction.left,
            position: {
                x,
                y
            },
            velocity: {
                x: 0,
                y: 0
            },
            selected: false
        };
    }
    register_controls() {
        this.bindControl("Mouse1", () => {
            this.state.selected = !this.state.selected;
            this.gravity = !this.gravity;
        });
    }
    statef(time) {
        if (this.state.selected) {
            let mouse_position = controls_1.Poll_Mouse();
            if (mouse_position.y > mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y + this.height,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            else if (mouse_position.y < mouse_position.last.y) {
                if (this.collision_check({
                    x: this.state.position.x,
                    y: this.state.position.y - 1,
                    width: this.width,
                    height: 1
                }).length == 0) {
                    this.state.position.y = mouse_position.y - this.height / 2;
                }
            }
            if (mouse_position.x < mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x - 1,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
            else if (mouse_position.x > mouse_position.last.x) {
                if (this.collision_check({
                    x: this.state.position.x + this.width,
                    y: this.state.position.y,
                    width: 1,
                    height: this.height
                }).length == 0) {
                    this.state.position.x = mouse_position.x - this.width / 2;
                }
            }
        }
    }
}
exports.StandingGoomba = StandingGoomba;


/***/ }),

/***/ "./src/game/objects/room_loader.ts":
/*!*****************************************!*\
  !*** ./src/game/objects/room_loader.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Door = void 0;
const object_1 = __webpack_require__(/*! ../../lib/object */ "./src/lib/object.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Door extends object_1.gravity_obj {
    constructor(a, z) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/door.png";
        this.height = 128;
        this.width = 64;
        this.gravity = false;
        this.collision = false;
        this.state = {
            getRoom: z,
            position: {
                x: a[0],
                y: a[1],
            },
            velocity: {
                x: 0,
                y: 0
            }
        };
    }
    create_room() {
        return new this.state.getRoom;
    }
    transport() {
        van_1.getGame().loadRoom(this.create_room());
    }
    register_controls() {
        this.bindControl("Mouse1", () => {
            this.transport();
        });
    }
}
exports.Door = Door;


/***/ }),

/***/ "./src/game/rooms/overworld.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/overworld.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overworld = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const room_loader_1 = __webpack_require__(/*! ../objects/room_loader */ "./src/game/objects/room_loader.ts");
const test_room_1 = __webpack_require__(/*! ./test_room */ "./src/game/rooms/test_room.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
        this.objects = [new box_1.Box(500, 0, "box"), new room_loader_1.Door([500, 64], test_room_1.Tester), new goomba_1.Goomba(800, 800, "player"), new goomba_1.StandingGoomba(801, 900), new goomba_1.StandingGoomba(0, 0, "cursor"), new box_1.Box(0, 0) /*,new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)*/];
        this.state = {
            player: undefined
        };
    }
    register_controls() {
        this.bindControl("Mouse1", () => __awaiter(this, void 0, void 0, function* () {
            let mouse_pos = controls_1.Poll_Mouse();
            if (this.check_collisions({
                x: mouse_pos.x,
                y: mouse_pos.y,
                width: 500,
                height: 64
            }).length == 0) {
                let b = new box_1.Box(mouse_pos.x, mouse_pos.y);
                yield b.load();
                this.objects.unshift(b);
            }
        }));
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            room_1.apply_gravity(this.objects[a], -.5, -15);
            collision_1.velocity_collision_check(this.objects[a], this.objects);
            this.objects[a].statef(time);
        }
        let player = this.getObj("player");
        let cursor = this.getObj("cursor");
        if (player) {
            let camera = van_1.getGame().state.camera;
            //console.log(camera.state.dimensions.width);
            camera.x = player.state.position.x - (camera.state.dimensions.width / 2);
            camera.y = player.state.position.y - (camera.state.dimensions.height / 2);
        }
        if (cursor) {
            cursor.collision = false;
            cursor.gravity = false;
            let mouse = controls_1.Poll_Mouse();
            cursor.state.position.x = mouse.x - cursor.width / 2;
            cursor.state.position.y = mouse.y - cursor.height / 2;
        }
    }
}
exports.Overworld = Overworld;
//, new Box(0,0)


/***/ }),

/***/ "./src/game/rooms/test_room.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/test_room.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const room_loader_1 = __webpack_require__(/*! ../objects/room_loader */ "./src/game/objects/room_loader.ts");
const overworld_1 = __webpack_require__(/*! ./overworld */ "./src/game/rooms/overworld.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
class Tester extends room_1.room {
    constructor() {
        super();
        this.background_url = "http://localhost/src/game/rooms/Tester.jpg";
        this.objects = [new box_1.Box(500, 500, "box"), new room_loader_1.Door([500, 564], overworld_1.Overworld), new goomba_1.Goomba(800, 1300, "player"), new goomba_1.StandingGoomba(801, 1400), new goomba_1.StandingGoomba(801, 1500), new goomba_1.StandingGoomba(801, 1600), new goomba_1.StandingGoomba(801, 1700)];
        this.state = {
            player: undefined
        };
    }
    register_controls() {
        this.bindControl("Mouse1", () => __awaiter(this, void 0, void 0, function* () {
            let mouse_pos = controls_1.Poll_Mouse();
            if (this.check_collisions({
                x: mouse_pos.x,
                y: mouse_pos.y,
                width: 500,
                height: 64
            }).length == 0) {
                let b = new box_1.Box(mouse_pos.x, mouse_pos.y);
                yield b.load();
                this.objects.unshift(b);
            }
        }));
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            room_1.apply_gravity(this.objects[a], -.5, -15);
            collision_1.velocity_collision_check(this.objects[a], this.objects);
            this.objects[a].statef(time);
        }
        let player = this.getObj("player");
        if (player) {
            let camera = van_1.getGame().state.camera;
            camera.state.position.x = player.state.position.x - (camera.state.dimensions.width / 2);
            camera.state.position.y = player.state.position.y - 64;
        }
    }
}
exports.Tester = Tester;


/***/ }),

/***/ "./src/lib/collision.ts":
/*!******************************!*\
  !*** ./src/lib/collision.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity_collision_check = exports.check_collisions = exports.check_all_collisions = exports.check_all_objects = void 0;
const object_1 = __webpack_require__(/*! ../lib/object */ "./src/lib/object.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
    direction[direction["up"] = 2] = "up";
    direction[direction["down"] = 3] = "down";
})(direction || (direction = {}));
function check_all_objects(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_objects = check_all_objects;
function check_all_collisions(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            matched.push(a);
        }
    }
    return matched;
}
exports.check_all_collisions = check_all_collisions;
//Checks up to the first collision
function check_collisions(c, objs, exemption) {
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            return a;
        }
    }
    return undefined;
}
exports.check_collisions = check_collisions;
function velocity_max(velocity, box, objs, exemption, dir) {
    let collision = check_collisions(box, objs, exemption);
    if (collision == undefined) {
        return velocity;
    }
    else {
        let collider = collision;
        let origin = object_1.getId(objs, exemption);
        let orig_st = origin.state;
        let collider_st = collider.state;
        if (dir == direction.left) {
            return orig_st.position.x - (collider_st.position.x + collider.width);
        }
        else if (dir == direction.right) {
            return collider_st.position.x - (orig_st.position.x + origin.width);
        }
        else if (dir == direction.down) {
            return orig_st.position.y - (collider_st.position.y + collider.height);
        }
        else if (dir == direction.up) {
            return collider_st.position.y - (orig_st.position.y + origin.height);
        }
    }
}
function velocity_collision_check(object, list) {
    let ob = object;
    let st = object.getState();
    let x_vel = st.velocity.x;
    let y_vel = st.velocity.y;
    if (x_vel > 0) {
        let box = {
            x: st.position.x + ob.width,
            y: st.position.y,
            width: x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.right);
        if (vel > 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    else if (x_vel < 0) {
        let box = {
            x: x_vel + st.position.x,
            y: st.position.y,
            width: -1 * x_vel,
            height: ob.height
        };
        let vel = velocity_max(st.velocity.x, box, list, ob.id, direction.left);
        if (vel < 0) {
            st.position.x += vel;
        }
        else {
            st.velocity.x = 0;
        }
    }
    if (y_vel > 0) {
        let box = {
            x: st.position.x,
            y: st.position.y + ob.height,
            width: ob.width,
            height: y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.up);
        if (vel > 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
    else if (y_vel < 0) {
        let box = {
            x: st.position.x,
            y: y_vel + st.position.y,
            width: ob.width,
            height: -1 * y_vel
        };
        let vel = velocity_max(st.velocity.y, box, list, ob.id, direction.down);
        if (vel < 0) {
            st.position.y += vel;
        }
        else {
            st.velocity.y = 0;
        }
    }
}
exports.velocity_collision_check = velocity_collision_check;


/***/ }),

/***/ "./src/lib/controls.ts":
/*!*****************************!*\
  !*** ./src/lib/controls.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = exports.Unbind = exports.Poll_Mouse = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
let target = document.getElementById("target");
target.addEventListener("click", (e) => {
    let mouse = Poll_Mouse();
    let box = {
        x: mouse.x,
        y: mouse.y,
        height: 1,
        width: 1
    };
    let d = [...all_binds];
    for (let a = 0; a < d.length; a++) {
        let selected = d[a];
        if (selected.type === btype.mouse && selected.key === "Mouse1") {
            if (selected.obj !== undefined) {
                if (selected.obj.collides_with_box(box)) {
                    selected.function();
                }
            }
            else {
                selected.function();
            }
        }
    }
});
window.addEventListener("keydown", (e) => {
    let d = [...all_binds];
    for (let a = 0; a < all_binds.length; a++) {
        let selected = d[a];
        if (selected.type === btype.keyboard && selected.key === e.code) {
            selected.function();
        }
    }
});
let tracker = document.getElementById("target");
tracker.addEventListener("mousemove", (e) => {
    var rect = e.target.getBoundingClientRect();
    last_x = x;
    last_y = y;
    x = e.clientX - rect.left; //x position within the element.
    y = e.clientY - rect.top; //y position within the element.
    console.log(e);
});
var btype;
(function (btype) {
    btype[btype["mouse"] = 0] = "mouse";
    btype[btype["keyboard"] = 1] = "keyboard";
})(btype || (btype = {}));
let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds = {};
let mouseBinds = {};
let bind_count = 0;
let all_binds = [];
function Poll_Mouse() {
    let height = van_1.GetViewportDimensions().height;
    let canvas = van_1.getGame().state.canvas;
    let wratio = parseFloat(window.getComputedStyle(canvas).width) / van_1.GetViewportDimensions().width;
    let vratio = parseFloat(window.getComputedStyle(canvas).height) / van_1.GetViewportDimensions().height;
    let camera = van_1.getGame().state.camera;
    return ({
        x: (x / wratio / camera.state.scaling + camera.state.position.x),
        y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y),
        last: {
            x: (x / wratio / camera.state.scaling + camera.state.position.x),
            y: ((height - y / vratio) / camera.state.scaling + camera.state.position.y)
        }
    });
}
exports.Poll_Mouse = Poll_Mouse;
function Unbind(bind_id) {
    for (let a = 0; a < all_binds.length; a++) {
        if (all_binds[a].id == bind_id) {
            all_binds.splice(a, 1);
            break;
        }
    }
}
exports.Unbind = Unbind;
let id = 0;
function Bind(keyname, func, object) {
    if (keyname.slice(0, 5) === "Mouse") {
        all_binds.push({
            key: keyname,
            type: btype.mouse,
            id: id,
            function: func,
            obj: object
        });
    }
    else {
        all_binds.push({
            key: keyname,
            type: btype.keyboard,
            id: id,
            function: func
        });
    }
    id++;
    return id - 1;
}
exports.Bind = Bind;


/***/ }),

/***/ "./src/lib/object.ts":
/*!***************************!*\
  !*** ./src/lib/object.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gravity_obj = exports.static_obj = exports.obj = exports.getId = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
function getId(a, id) {
    for (let b = 0; b < a.length; b++) {
        if (a[b].id == id) {
            return a[b];
        }
    }
    return undefined;
}
exports.getId = getId;
let counter = 0;
class obj {
    constructor() {
        this.sprite_url = "";
        this.height = undefined;
        this.width = undefined;
        this.collision = false;
        this.render = true;
        this.id = "" + counter;
        this.binds = [];
        counter++;
        this.register_controls();
    }
    getState() {
        return this.state;
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => {
            let a = new Image();
            a.src = this.sprite_url;
            a.onload = (() => {
                _this.sprite_sheet = a;
                resolve();
            });
        });
    }
    bindControl(key, func) {
        if (key == "Mouse1") {
            let b = controls_1.Bind(key, func, this);
            this.binds.push(b);
        }
        else {
            this.binds.push(controls_1.Bind(key, func));
        }
    }
    register_controls() {
    }
    delete() {
        for (let a of this.binds) {
            controls_1.Unbind(a);
        }
        van_1.getGame().getRoom().deleteItem(this.id);
    }
    collision_check(a) {
        if (this.collision) {
            let room = van_1.getGame().getRoom();
            return room.check_collisions(a, this.id);
        }
        return [];
    }
    statef(time) {
    }
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        if (st.position.x >= a.x && st.position.x < (a.x + a.width)) {
            hcollides = true;
        }
        if (a.x > st.position.x && a.x < (st.position.x + this.width)) {
            hcollides = true;
        }
        if (st.position.y >= a.y && st.position.y < (a.y + a.height)) {
            vcollides = true;
        }
        if (a.y > st.position.y && a.y < (st.position.y + this.height)) {
            vcollides = true;
        }
        return hcollides && vcollides;
    }
    collides_with(a) {
        let st = this.state;
        let st_2 = a.state;
        let hcollides = false, vcollides = false;
        if (st.position.x > st_2.position.x && st.position.x < (st_2.position.x + a.width)) {
            hcollides = true;
        }
        if (st_2.position.x > st.position.x && st_2.position.x < (st.position.x + a.width)) {
            hcollides = true;
        }
        if (st.position.y > st_2.position.y && st.position.y < (st_2.position.y + a.width)) {
            vcollides = true;
        }
        if (st_2.position.y > st.position.y && st_2.position.y < (st.position.y + a.width)) {
            vcollides = true;
        }
        return hcollides && vcollides;
    }
    renderf(time) {
        let st = this.state;
        let sprite_height = this.height;
        let sprite_width = this.width;
        if (this.height == undefined) {
            sprite_height = this.sprite_sheet.height;
        }
        if (this.width == undefined) {
            sprite_width = this.sprite_sheet.width;
        }
        return {
            sprite_sheet: this.sprite_sheet,
            left: 0,
            top: 0,
            sprite_width,
            sprite_height
        };
    }
}
exports.obj = obj;
class static_obj {
    constructor() {
        this.sprite_url = "";
    }
}
exports.static_obj = static_obj;
class gravity_obj extends obj {
    constructor() {
        super(...arguments);
        this.gravity = true;
    }
}
exports.gravity_obj = gravity_obj;


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.rect_renderer = exports.sprite_renderer = exports.Camera = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
class Camera {
    constructor(x, y, width, height, scaling, stretch) {
        this.state = {
            scaling,
            stretch,
            position: {
                x: x / scaling,
                y: y / scaling
            },
            dimensions: {
                width: width / scaling,
                height: height / scaling
            }
        };
    }
    set x(x) {
        this.state.position.x = x;
    }
    set y(y) {
        this.state.position.y = y;
    }
    get x() {
        return this.state.position.x;
    }
    get y() {
        return this.state.position.y;
    }
}
exports.Camera = Camera;
exports.sprite_renderer = (r, s) => {
    let camera = r.camera;
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((s.x - camera.state.position.x) * r.camera.state.scaling);
    let final_y = ((vheight - s.y - s.sprite.sprite_height + camera.state.position.y) * r.camera.state.scaling);
    let height = s.sprite.sprite_height * r.camera.state.scaling;
    let width = s.sprite.sprite_width * r.camera.state.scaling;
    r.context.drawImage(s.sprite.sprite_sheet, s.sprite.left, s.sprite.top, s.sprite.sprite_width, s.sprite.sprite_height, final_x, final_y, width, height);
};
exports.rect_renderer = (context, rect, x, y, color, camera) => {
    let vheight = van_1.GetViewportDimensions().height;
    let final_x = ((x - camera.state.position.x) * camera.state.scaling);
    let final_y = ((vheight - y - rect.height + camera.state.position.y) * camera.state.scaling);
    let height = rect.height * camera.state.scaling;
    let width = rect.width * camera.state.scaling;
    context.strokeStyle = color;
    context.strokeRect(final_x, final_y, rect.width, height);
};


/***/ }),

/***/ "./src/lib/room.ts":
/*!*************************!*\
  !*** ./src/lib/room.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.room = exports.apply_gravity = void 0;
const collision_1 = __webpack_require__(/*! ./collision */ "./src/lib/collision.ts");
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
const controls_1 = __webpack_require__(/*! ./controls */ "./src/lib/controls.ts");
function apply_gravity(ob, grav_const, grav_max) {
    let st = ob.state;
    if (ob.gravity && st.velocity.y > grav_max) {
        st.velocity.y += grav_const;
    }
}
exports.apply_gravity = apply_gravity;
class room {
    constructor() {
        this.background_url = "";
    }
    load() {
        let _this = this;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let a = new Image();
            let to_await = this.objects.map((a) => a.load());
            yield Promise.all(to_await);
            a.src = this.background_url;
            a.onerror = (() => {
                console.log("error loading url:" + this.background_url);
            });
            a.onload = (() => {
                _this.background = a;
                resolve();
            });
        }));
    }
    deleteItem(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id === id) {
                this.objects = this.objects.slice(0, a).concat(this.objects.slice(a + 1));
                a--;
            }
        }
    }
    bindControl(key, func) {
        controls_1.Bind(key, func);
    }
    check_collisions(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_collisions(box, this.objects, exempt);
    }
    check_objects(box, exempt) {
        if (van_1.DEBUG) {
            van_1.render_collision_box(box);
        }
        return collision_1.check_all_objects(box, this.objects, exempt);
    }
    register_controls() {
    }
    cleanup() {
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            this.objects[a].statef(time);
        }
    }
    getObj(id) {
        for (let a = 0; a < this.objects.length; a++) {
            if (this.objects[a].id == id) {
                return this.objects[a];
            }
        }
        return false;
    }
    renderf(time) {
        return {
            sprite_sheet: this.background,
            left: 0,
            top: 0,
            sprite_height: this.background.height,
            sprite_width: this.background.width
        };
    }
}
exports.room = room;


/***/ }),

/***/ "./src/lib/sprite.ts":
/*!***************************!*\
  !*** ./src/lib/sprite.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sprite_gen = void 0;
function sprite_gen(sprite_sheet, sprite_width, sprite_height) {
    let width = sprite_sheet.width;
    let sprites = [];
    for (let a = 0; a < width; a += sprite_width) {
        sprites.push({
            sprite_sheet,
            left: a,
            top: 0,
            sprite_height,
            sprite_width
        });
    }
    return sprites;
}
exports.sprite_gen = sprite_gen;


/***/ }),

/***/ "./src/van.ts":
/*!********************!*\
  !*** ./src/van.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGame = exports.game = exports.render_collision_box = exports.GetViewportDimensions = exports.GetScreenDimensions = exports.DEBUG = void 0;
exports.DEBUG = true;
const overworld_1 = __webpack_require__(/*! ./game/rooms/overworld */ "./src/game/rooms/overworld.ts");
const render_1 = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");
let canvas_element = document.getElementById("target");
let context = canvas_element.getContext("2d");
let screen_width = window.innerWidth;
let screen_height = window.innerHeight;
/*
let vheight = 1200;
let vwidth = vheight * (16/9);
canvas.width = vwidth;
canvas.height = vheight;
*/
let vwidth = 800;
let vheight = 400;
//How often the game logic loop should run, in milliseconds
let logic_loop_interval = 1000 / 60;
let last_time = new Date();
function GetScreenDimensions() {
    return ({
        width: screen_width,
        height: screen_height
    });
}
exports.GetScreenDimensions = GetScreenDimensions;
function GetViewportDimensions() {
    return ({
        height: vheight,
        width: vwidth
    });
}
exports.GetViewportDimensions = GetViewportDimensions;
exports.render_collision_box = (a) => {
    boxes.push(a);
};
let boxes = [];
let deep = (a) => {
    return JSON.parse(JSON.stringify(a));
};
class game {
    constructor(ctx, a) {
        this.state = {
            canvas: canvas_element,
            logic: undefined,
            context: ctx,
            camera: new render_1.Camera(0, 0, vwidth, vheight, 1, false),
            current_room: undefined,
            player_state: {
                power: 0
            }
        };
        this.loadRoom(a);
    }
    render(t) {
        this.state.context.clearRect(0, 0, vwidth, vheight);
        this.state.context.fillStyle = "black";
        this.state.context.fillRect(0, 0, vwidth, vheight);
        let camera_colliders = this.state.current_room.check_objects({
            x: this.state.camera.state.position.x,
            y: this.state.camera.state.position.y,
            width: this.state.camera.state.dimensions.width,
            height: this.state.camera.state.dimensions.height
        });
        let render_args = {
            context: this.state.context,
            camera: this.state.camera,
        };
        render_1.sprite_renderer(render_args, {
            sprite: this.state.current_room.renderf(t),
            x: 0,
            y: 0
        });
        for (let a of camera_colliders) {
            let st = a.state;
            if (a.render) {
                render_1.sprite_renderer(render_args, {
                    sprite: a.renderf(t),
                    x: st.position.x,
                    y: st.position.y
                });
            }
        }
        let box;
        while (boxes.length > 0) {
            let box = boxes.pop();
            let rect = {
                width: box.width,
                height: box.height
            };
            render_1.rect_renderer(context, rect, box.x, box.y, "#FF0000", this.state.camera);
        }
        requestAnimationFrame((a) => { this.render(a); });
    }
    start_logic(a) {
        return setInterval(() => {
            let new_time = new Date();
            let time_since = new_time.getTime() - last_time.getTime();
            last_time = new_time;
            this.state.current_room.statef(new_time.getTime());
        }, a);
    }
    getRoom() {
        return this.state.current_room;
    }
    loadRoom(x) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.current_room !== undefined) {
                while (this.state.current_room.objects.length > 0) {
                    this.state.current_room.objects[0].delete();
                }
            }
            let new_room = yield x.load();
            x.register_controls();
            this.state.current_room = x;
            if (this.state.logic != undefined) {
                clearInterval(this.state.logic);
            }
            this.state.logic = this.start_logic(logic_loop_interval);
            this.render(0);
        });
    }
}
exports.game = game;
let game_inst = new game(context, new overworld_1.Overworld());
function getGame() {
    return game_inst;
}
exports.getGame = getGame;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9yb29tX2xvYWRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2FtZS9yb29tcy9vdmVyd29ybGQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcm9vbXMvdGVzdF9yb29tLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29sbGlzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yZW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yb29tLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy92YW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFB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TyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUM3QzthQUNGO1lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUIsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQzVCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUyxFQUFDO2dCQUMvQixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQztZQUNELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRjtBQW5GRCxvQkFtRkM7QUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxxQkFBUyxFQUFFLENBQUMsQ0FBQztBQUVsRCxTQUFnQixPQUFPO0lBQ3JCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFGRCwwQkFFQyIsImZpbGUiOiJ2YW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92YW4udHNcIik7XG4iLCJpbXBvcnQge2dyYXZpdHlfb2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIGdyYXZpdHlfb2JqPG9ial9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2JveC5wbmdcIlxyXG4gIGNvbGxpc2lvbiA9IHRydWVcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDUwMDtcclxuICBncmF2aXR5ID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsKCk9PntcclxuICAgICAgdGhpcy5kZWxldGUoKTtcclxuICAgIH0pXHJcbiAgfVxyXG59IiwiaW1wb3J0IHt2ZWxvY2l0eSxvYmpfc3RhdGUsc3RhdGVfZnVuY30gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5pbXBvcnQge3Nwcml0ZSxzcHJpdGVfZ2VufSBmcm9tIFwiLi4vLi4vbGliL3Nwcml0ZVwiO1xyXG5pbXBvcnQge2dyYXZpdHlfb2JqLG9ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtQb2xsX01vdXNlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4uLy4uL2xpYi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtCaW5kfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbXBvcnQge092ZXJ3b3JsZH0gZnJvbSBcIi4uL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBnb29tYmFfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgdmVsb2NpdHk6dmVsb2NpdHksXHJcbiAgc2VsZWN0ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR29vbWJhIGV4dGVuZHMgZ3Jhdml0eV9vYmo8Z29vbWJhX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL29iamVjdHMvZ29vbWJhLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzZWxlY3RlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmKE1hdGguZmxvb3IodC8yNTApICUgMiA9PSAwKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIC8qXHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsKCk9PntcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gMDtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS55ID0gMDtcclxuICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICF0aGlzLnN0YXRlLnNlbGVjdGVkO1xyXG4gICAgICB0aGlzLmdyYXZpdHkgPSAhdGhpcy5ncmF2aXR5O1xyXG4gICAgfSk7XHJcbiAgICAqL1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleUFcIiwoKT0+e1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAtMztcclxuICAgIH0pO1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIktleURcIiwoKT0+e1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAzO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiS2V5V1wiLCgpPT57XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueSArPSAxNTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBcclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgLypcclxuICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWQpe1xyXG4gICAgICBsZXQgbW91c2VfcG9zaXRpb24gPSBQb2xsX01vdXNlKCk7XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPiBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCxcclxuICAgICAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6MVxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlX3Bvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgLSAxLFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnggPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lngpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gMSxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgd2lkdGg6MSxcclxuICAgICAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IG1vdXNlX3Bvc2l0aW9uLnggLSB0aGlzLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueCA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoZ2V0R2FtZSgpLmdldFJvb20oKS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55IC0gMSxcclxuICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OjFcclxuICAgIH0pLmxlbmd0aCA+IDApe1xyXG4gICAgICBsZXQgbGVmdF9mYWxsX2JveDpjb2xsaXNpb25fYm94ID0ge1xyXG4gICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gdGhpcy53aWR0aCAtIDMsXHJcbiAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodCxcclxuICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHQsXHJcbiAgICAgICAgd2lkdGg6dGhpcy53aWR0aFxyXG4gICAgICB9XHJcbiAgICAgIGxldCBsZWZ0X3dhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAzLFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDozXHJcbiAgICAgIH1cclxuICAgICAgbGV0IHJpZ2h0X2ZhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICsgMyxcclxuICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDp0aGlzLndpZHRoXHJcbiAgICAgIH1cclxuICAgICAgbGV0IHJpZ2h0X3dhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDozXHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAzO1xyXG4gICAgICAgIGlmKGdldEdhbWUoKS5nZXRSb29tKCkuY2hlY2tfY29sbGlzaW9ucyhyaWdodF9mYWxsX2JveCkubGVuZ3RoID09IDAgfHwgZ2V0R2FtZSgpLmdldFJvb20oKS5jaGVja19jb2xsaXNpb25zKHJpZ2h0X3dhbGxfYm94KS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IC0zO1xyXG4gICAgICAgIGlmKGdldEdhbWUoKS5nZXRSb29tKCkuY2hlY2tfY29sbGlzaW9ucyhsZWZ0X2ZhbGxfYm94KS5sZW5ndGggPT0gMCB8fCBnZXRHYW1lKCkuZ2V0Um9vbSgpLmNoZWNrX2NvbGxpc2lvbnMobGVmdF93YWxsX2JveCkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICovXHJcblxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0YW5kaW5nR29vbWJhIGV4dGVuZHMgZ3Jhdml0eV9vYmo8Z29vbWJhX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL29iamVjdHMvZ29vbWJhLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkKXtcclxuICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSAgICBcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzZWxlY3RlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG4gICAgdGhpcy5iaW5kQ29udHJvbChcIk1vdXNlMVwiLCgpPT57XHJcbiAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSAhdGhpcy5zdGF0ZS5zZWxlY3RlZDtcclxuICAgICAgdGhpcy5ncmF2aXR5ID0gIXRoaXMuZ3Jhdml0eTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICBpZih0aGlzLnN0YXRlLnNlbGVjdGVkKXtcclxuICAgICAgbGV0IG1vdXNlX3Bvc2l0aW9uID0gUG9sbF9Nb3VzZSgpO1xyXG4gICAgICBpZihtb3VzZV9wb3NpdGlvbi55ID4gbW91c2VfcG9zaXRpb24ubGFzdC55KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi55IDwgbW91c2VfcG9zaXRpb24ubGFzdC55KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55IC0gMSxcclxuICAgICAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6MVxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlX3Bvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihtb3VzZV9wb3NpdGlvbi54IDwgbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCAtIDEsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKG1vdXNlX3Bvc2l0aW9uLnggPiBtb3VzZV9wb3NpdGlvbi5sYXN0Lngpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgd2lkdGg6MSxcclxuICAgICAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IG1vdXNlX3Bvc2l0aW9uLnggLSB0aGlzLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge2dyYXZpdHlfb2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge3Jvb219IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge2dldEdhbWV9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSBsb2FkZXJfZnVuY3tcclxuICAoKTpyb29tPHVua25vd24+XHJcbn1cclxuXHJcbmludGVyZmFjZSBsb2FkZXJfc3RhdGV7XHJcbiAgZ2V0Um9vbTphbnksXHJcbiAgcG9zaXRpb246e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxuICB2ZWxvY2l0eTp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRG9vciBleHRlbmRzIGdyYXZpdHlfb2JqPGxvYWRlcl9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2Rvb3IucG5nXCI7XHJcbiAgaGVpZ2h0ID0gMTI4XHJcbiAgd2lkdGggPSA2NFxyXG4gIGdyYXZpdHkgPSBmYWxzZVxyXG4gIGNvbGxpc2lvbiA9IGZhbHNlXHJcbiAgY29uc3RydWN0b3IoYTpbbnVtYmVyLG51bWJlcl0sejphbnkpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGdldFJvb206eixcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6YVswXSxcclxuICAgICAgICB5OmFbMV0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBjcmVhdGVfcm9vbSgpe1xyXG4gICAgcmV0dXJuIG5ldyB0aGlzLnN0YXRlLmdldFJvb207XHJcbiAgfVxyXG4gIHByaXZhdGUgdHJhbnNwb3J0KCl7XHJcbiAgICBnZXRHYW1lKCkubG9hZFJvb20odGhpcy5jcmVhdGVfcm9vbSgpKTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIiwgKCk9PntcclxuICAgICAgdGhpcy50cmFuc3BvcnQoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7cm9vbSxhcHBseV9ncmF2aXR5fSBmcm9tIFwiLi4vLi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtTdGFuZGluZ0dvb21iYSxHb29tYmEsIGdvb21iYV9zdGF0ZX0gZnJvbSBcIi4uL29iamVjdHMvZ29vbWJhXCI7XHJcbmltcG9ydCB7Qm94fSBmcm9tIFwiLi4vb2JqZWN0cy9ib3hcIjsgXHJcbmltcG9ydCB7dmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrfSBmcm9tIFwiLi4vLi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQgeyBncmF2aXR5X29iaiB9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcbmltcG9ydCB7UG9sbF9Nb3VzZX0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQge0Rvb3J9IGZyb20gXCIuLi9vYmplY3RzL3Jvb21fbG9hZGVyXCI7XHJcbmltcG9ydCB7VGVzdGVyfSBmcm9tIFwiLi90ZXN0X3Jvb21cIjtcclxuaW1wb3J0IHsgZ2V0R2FtZSB9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmludGVyZmFjZSBvdmVyd29ybGRfaXtcclxuICBwbGF5ZXI6Z3Jhdml0eV9vYmo8dW5rbm93bj5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE92ZXJ3b3JsZCBleHRlbmRzIHJvb208b3ZlcndvcmxkX2k+e1xyXG4gIGJhY2tncm91bmRfdXJsPVwiaHR0cHM6Ly9pbWcud2FsbHBhcGVyc2FmYXJpLmNvbS9kZXNrdG9wLzE5MjAvMTA4MC84LzUxL2ltRDQxbC5qcGdcIjtcclxuICBvYmplY3RzID0gW25ldyBCb3goNTAwLDAsXCJib3hcIiksbmV3IERvb3IoWzUwMCw2NF0sVGVzdGVyKSxuZXcgR29vbWJhKDgwMCw4MDAsXCJwbGF5ZXJcIiksbmV3IFN0YW5kaW5nR29vbWJhKDgwMSw5MDApLG5ldyBTdGFuZGluZ0dvb21iYSgwLDAsXCJjdXJzb3JcIiksbmV3IEJveCgwLDApLyosbmV3IFN0YW5kaW5nR29vbWJhKDgwMSwxMDAwKSxuZXcgU3RhbmRpbmdHb29tYmEoODAxLDExMDApLG5ldyBTdGFuZGluZ0dvb21iYSg4MDEsMTIwMCkqL11cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBsYXllcjp1bmRlZmluZWRcclxuICAgIH07XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsYXN5bmMgKCk9PntcclxuICAgICAgbGV0IG1vdXNlX3BvcyA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYodGhpcy5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgICB4Om1vdXNlX3Bvcy54LFxyXG4gICAgICAgIHk6bW91c2VfcG9zLnksXHJcbiAgICAgICAgd2lkdGg6NTAwLFxyXG4gICAgICAgIGhlaWdodDo2NFxyXG4gICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGIgPSBuZXcgQm94KG1vdXNlX3Bvcy54LG1vdXNlX3Bvcy55KTtcclxuICAgICAgICBhd2FpdCBiLmxvYWQoKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMudW5zaGlmdChiKTtcclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGFwcGx5X2dyYXZpdHkodGhpcy5vYmplY3RzW2FdLC0uNSwtMTUpO1xyXG4gICAgICB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sodGhpcy5vYmplY3RzW2FdLHRoaXMub2JqZWN0cyk7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcGxheWVyID0gdGhpcy5nZXRPYmooXCJwbGF5ZXJcIikgYXMgR29vbWJhO1xyXG4gICAgbGV0IGN1cnNvciA9IHRoaXMuZ2V0T2JqKFwiY3Vyc29yXCIpIGFzIEdvb21iYTtcclxuICAgIGlmKHBsYXllcil7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgY2FtZXJhID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhjYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCk7XHJcbiAgICAgIGNhbWVyYS54ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnggLSAoY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMik7XHJcbiAgICAgIGNhbWVyYS55ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnkgLSAoY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0LzIpO1xyXG4gICAgfVxyXG4gICAgaWYoY3Vyc29yKXtcclxuICAgICAgY3Vyc29yLmNvbGxpc2lvbiA9IGZhbHNlO1xyXG4gICAgICBjdXJzb3IuZ3Jhdml0eSA9IGZhbHNlO1xyXG4gICAgICBsZXQgbW91c2UgPSBQb2xsX01vdXNlKCk7XHJcbiAgICAgIGN1cnNvci5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2UueCAtIGN1cnNvci53aWR0aC8yO1xyXG4gICAgICBjdXJzb3Iuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlLnkgLSBjdXJzb3IuaGVpZ2h0LzI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG4vLywgbmV3IEJveCgwLDApIiwiaW1wb3J0IHtHb29tYmEsU3RhbmRpbmdHb29tYmF9IGZyb20gXCIuLi9vYmplY3RzL2dvb21iYVwiO1xyXG5pbXBvcnQge0JveH0gZnJvbSBcIi4uL29iamVjdHMvYm94XCI7XHJcbmltcG9ydCB7cm9vbSxhcHBseV9ncmF2aXR5fSBmcm9tIFwiLi4vLi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHt2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2t9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7RG9vcn0gZnJvbSBcIi4uL29iamVjdHMvcm9vbV9sb2FkZXJcIjtcclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuL292ZXJ3b3JsZFwiO1xyXG5pbXBvcnQge1BvbGxfTW91c2V9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuaW1wb3J0IHsgZ2V0R2FtZSB9IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0ZXIgZXh0ZW5kcyByb29tPHt9PntcclxuICBiYWNrZ3JvdW5kX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9yb29tcy9UZXN0ZXIuanBnXCI7XHJcbm9iamVjdHMgPSBbbmV3IEJveCg1MDAsNTAwLFwiYm94XCIpLG5ldyBEb29yKFs1MDAsNTY0XSxPdmVyd29ybGQpLG5ldyBHb29tYmEoODAwLDEzMDAsXCJwbGF5ZXJcIiksbmV3IFN0YW5kaW5nR29vbWJhKDgwMSwxNDAwKSxuZXcgU3RhbmRpbmdHb29tYmEoODAxLDE1MDApLG5ldyBTdGFuZGluZ0dvb21iYSg4MDEsMTYwMCksbmV3IFN0YW5kaW5nR29vbWJhKDgwMSwxNzAwKV1cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBsYXllcjp1bmRlZmluZWRcclxuICAgIH07XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICB0aGlzLmJpbmRDb250cm9sKFwiTW91c2UxXCIsYXN5bmMgKCk9PntcclxuICAgICAgbGV0IG1vdXNlX3BvcyA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYodGhpcy5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgICB4Om1vdXNlX3Bvcy54LFxyXG4gICAgICAgIHk6bW91c2VfcG9zLnksXHJcbiAgICAgICAgd2lkdGg6NTAwLFxyXG4gICAgICAgIGhlaWdodDo2NFxyXG4gICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgbGV0IGIgPSBuZXcgQm94KG1vdXNlX3Bvcy54LG1vdXNlX3Bvcy55KTtcclxuICAgICAgICBhd2FpdCBiLmxvYWQoKTtcclxuICAgICAgICB0aGlzLm9iamVjdHMudW5zaGlmdChiKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGFwcGx5X2dyYXZpdHkodGhpcy5vYmplY3RzW2FdLC0uNSwtMTUpO1xyXG4gICAgICB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sodGhpcy5vYmplY3RzW2FdLHRoaXMub2JqZWN0cyk7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcGxheWVyID0gdGhpcy5nZXRPYmooXCJwbGF5ZXJcIikgYXMgR29vbWJhO1xyXG4gICAgaWYocGxheWVyKXtcclxuICAgICAgbGV0IGNhbWVyYSA9IGdldEdhbWUoKS5zdGF0ZS5jYW1lcmE7XHJcbiAgICAgIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnggLSAoY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMud2lkdGgvMik7XHJcbiAgICAgIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55ID0gcGxheWVyLnN0YXRlLnBvc2l0aW9uLnkgLSA2NDtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge29iaixnZXRJZH0gZnJvbSBcIi4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29sbGlzaW9uX2JveHtcclxuICB4Om51bWJlcjtcclxuICB5Om51bWJlcjtcclxuICB3aWR0aDpudW1iZXI7XHJcbiAgaGVpZ2h0Om51bWJlcjtcclxufVxyXG5cclxuZW51bSBkaXJlY3Rpb257XHJcbiAgbGVmdCxcclxuICByaWdodCxcclxuICB1cCxcclxuICBkb3duXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19hbGxfb2JqZWN0cyhjOiBjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PixleGVtcHRpb246c3RyaW5nKTpBcnJheTxvYmo8dW5rbm93bj4+e1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tfYWxsX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sZXhlbXB0aW9uOnN0cmluZyk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICBsZXQgbWF0Y2hlZCA9IFtdO1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIG1hdGNoZWQucHVzaChhKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG1hdGNoZWRcclxufVxyXG4vL0NoZWNrcyB1cCB0byB0aGUgZmlyc3QgY29sbGlzaW9uXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja19jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsIG9ianM6IEFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcpIHtcclxuICBmb3IgKGxldCBhIG9mIG9ianMpIHtcclxuICAgIGlmIChhLmlkICE9PSBleGVtcHRpb24gJiYgYS5jb2xsaXNpb24gJiYgYS5jb2xsaWRlc193aXRoX2JveChjKSkge1xyXG4gICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuZnVuY3Rpb24gdmVsb2NpdHlfbWF4KHZlbG9jaXR5Om51bWJlcixib3g6Y29sbGlzaW9uX2JveCxvYmpzOkFycmF5PG9iajx1bmtub3duPj4sIGV4ZW1wdGlvbjpzdHJpbmcsZGlyOmRpcmVjdGlvbil7XHJcbiAgbGV0IGNvbGxpc2lvbiA9IGNoZWNrX2NvbGxpc2lvbnMoYm94LCBvYmpzLCBleGVtcHRpb24pO1xyXG4gIGlmKGNvbGxpc2lvbiA9PSB1bmRlZmluZWQpe1xyXG4gICAgcmV0dXJuIHZlbG9jaXR5O1xyXG4gIH1cclxuICBlbHNle1xyXG4gICAgbGV0IGNvbGxpZGVyID0gY29sbGlzaW9uO1xyXG4gICAgbGV0IG9yaWdpbiA9IGdldElkKG9ianMsZXhlbXB0aW9uKTtcclxuICAgIGxldCBvcmlnX3N0ID0gb3JpZ2luLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBjb2xsaWRlcl9zdCA9IGNvbGxpZGVyLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGlmKGRpciA9PSBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgIHJldHVybiBvcmlnX3N0LnBvc2l0aW9uLnggLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueCArIGNvbGxpZGVyLndpZHRoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgIHJldHVybiBjb2xsaWRlcl9zdC5wb3NpdGlvbi54IC0gKG9yaWdfc3QucG9zaXRpb24ueCArIG9yaWdpbi53aWR0aCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24uZG93bil7XHJcbiAgICAgIHJldHVybiBvcmlnX3N0LnBvc2l0aW9uLnkgLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueSArIGNvbGxpZGVyLmhlaWdodCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGRpciA9PSBkaXJlY3Rpb24udXApe1xyXG4gICAgICByZXR1cm4gY29sbGlkZXJfc3QucG9zaXRpb24ueSAtIChvcmlnX3N0LnBvc2l0aW9uLnkgKyBvcmlnaW4uaGVpZ2h0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2sob2JqZWN0Om9iajx1bmtub3duPixsaXN0OkFycmF5PG9iajx1bmtub3duPj4pIHtcclxuICBsZXQgb2IgPSBvYmplY3Q7XHJcbiAgbGV0IHN0ID0gb2JqZWN0LmdldFN0YXRlKCkgYXMgb2JqX3N0YXRlO1xyXG4gIGxldCB4X3ZlbCA9IHN0LnZlbG9jaXR5Lng7XHJcbiAgbGV0IHlfdmVsID0gc3QudmVsb2NpdHkueTtcclxuICBpZiAoeF92ZWwgPiAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54ICsgb2Iud2lkdGgsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH07XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LngsYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnJpZ2h0KTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyAgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2UgaWYgKHhfdmVsIDwgMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogeF92ZWwgKyBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiBzdC5wb3NpdGlvbi55LFxyXG4gICAgICB3aWR0aDogLTEgKiB4X3ZlbCxcclxuICAgICAgaGVpZ2h0OiBvYi5oZWlnaHRcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ubGVmdCk7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh5X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnkgKyBvYi5oZWlnaHQsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi51cCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeV92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiB5X3ZlbCArIHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiAtMSAqIHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmRvd24pO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtHZXRTY3JlZW5EaW1lbnNpb25zLEdldFZpZXdwb3J0RGltZW5zaW9ucyxnZXRHYW1lfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtvYmp9IGZyb20gXCIuL29iamVjdFwiO1xyXG5cclxuaW50ZXJmYWNlIG1vdXNlUG9ze1xyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyLFxyXG4gIGxhc3Q6e1xyXG4gICAgeDpudW1iZXIsXHJcbiAgICB5Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbnRyb2xfZnVuY3tcclxuICAoKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBtb3VzZUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8W2NvbnRyb2xfZnVuYyxvYmo8dW5rbm93bj5dPlxyXG59XHJcblxyXG5pbnRlcmZhY2Uga2V5QmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxjb250cm9sX2Z1bmM+XHJcbn1cclxubGV0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpO1xyXG50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XHJcbiAgbGV0IG1vdXNlID0gUG9sbF9Nb3VzZSgpO1xyXG4gIGxldCBib3g6Y29sbGlzaW9uX2JveCA9IHtcclxuICAgIHg6bW91c2UueCxcclxuICAgIHk6bW91c2UueSxcclxuICAgIGhlaWdodDoxLFxyXG4gICAgd2lkdGg6MVxyXG4gIH07XHJcbiAgbGV0IGQgPSBbLi4uYWxsX2JpbmRzXTtcclxuICBmb3IobGV0IGEgPSAwO2EgPCBkLmxlbmd0aDthKyspe1xyXG4gICAgbGV0IHNlbGVjdGVkID0gZFthXTtcclxuICAgIGlmKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLm1vdXNlICYmIHNlbGVjdGVkLmtleSA9PT0gXCJNb3VzZTFcIil7XHJcbiAgICAgIGlmKHNlbGVjdGVkLm9iaiAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBpZihzZWxlY3RlZC5vYmouY29sbGlkZXNfd2l0aF9ib3goYm94KSl7XHJcbiAgICAgICAgICBzZWxlY3RlZC5mdW5jdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNle1xyXG4gICAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7ICAgICAgICBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gIFxyXG59KVxyXG5cclxuXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcclxuICBsZXQgZCA9IFsuLi5hbGxfYmluZHNdO1xyXG4gIGZvciAobGV0IGEgPSAwOyBhIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBkW2FdO1xyXG4gICAgaWYgKHNlbGVjdGVkLnR5cGUgPT09IGJ0eXBlLmtleWJvYXJkICYmIHNlbGVjdGVkLmtleSA9PT0gZS5jb2RlKSB7XHJcbiAgICAgIHNlbGVjdGVkLmZ1bmN0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5sZXQgdHJhY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpO1xyXG50cmFja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcclxuICB2YXIgcmVjdCA9IChlLnRhcmdldCBhcyBIVE1MQ2FudmFzRWxlbWVudCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgO1xyXG4gIFxyXG4gIGxhc3RfeCA9IHg7XHJcbiAgbGFzdF95ID0geTtcclxuICB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0OyAvL3ggcG9zaXRpb24gd2l0aGluIHRoZSBlbGVtZW50LlxyXG4gIHkgPSBlLmNsaWVudFkgLSByZWN0LnRvcDsgIC8veSBwb3NpdGlvbiB3aXRoaW4gdGhlIGVsZW1lbnQuXHJcbiAgY29uc29sZS5sb2coZSk7XHJcblxyXG59KVxyXG5cclxuZW51bSBidHlwZXtcclxuICBtb3VzZSxcclxuICBrZXlib2FyZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgYmluZHtcclxuICBrZXk6c3RyaW5nLFxyXG4gIHR5cGU6YnR5cGUsXHJcbiAgaWQ6bnVtYmVyLFxyXG4gIGZ1bmN0aW9uOmNvbnRyb2xfZnVuYyxcclxuICBvYmo/Om9iajx1bmtub3duPlxyXG59XHJcblxyXG5sZXQgeCA9IDA7XHJcbmxldCB5ID0gMDtcclxubGV0IGxhc3RfeCA9IDA7XHJcbmxldCBsYXN0X3kgPSAwO1xyXG5sZXQgYmluZHM6a2V5QmluZHMgPSB7fTtcclxubGV0IG1vdXNlQmluZHM6bW91c2VCaW5kcyA9IHt9O1xyXG5sZXQgYmluZF9jb3VudCA9IDA7XHJcblxyXG5sZXQgYWxsX2JpbmRzOkFycmF5PGJpbmQ+ID0gW11cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG9sbF9Nb3VzZSgpOm1vdXNlUG9ze1xyXG4gIGxldCBoZWlnaHQgPSBHZXRWaWV3cG9ydERpbWVuc2lvbnMoKS5oZWlnaHQ7XHJcbiAgbGV0IGNhbnZhcyA9IGdldEdhbWUoKS5zdGF0ZS5jYW52YXM7XHJcbiAgbGV0IHdyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS53aWR0aCkvR2V0Vmlld3BvcnREaW1lbnNpb25zKCkud2lkdGg7XHJcbiAgbGV0IHZyYXRpbyA9IHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKS5oZWlnaHQpL0dldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgY2FtZXJhID0gZ2V0R2FtZSgpLnN0YXRlLmNhbWVyYTtcclxuICByZXR1cm4gKHtcclxuICAgIHg6ICh4L3dyYXRpby9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSAsXHJcbiAgICB5OiAoKGhlaWdodCAtIHkvdnJhdGlvKS9jYW1lcmEuc3RhdGUuc2NhbGluZyArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSxcclxuICAgIGxhc3Q6e1xyXG4gICAgICB4OiAoeC93cmF0aW8vY2FtZXJhLnN0YXRlLnNjYWxpbmcgKyBjYW1lcmEuc3RhdGUucG9zaXRpb24ueCksXHJcbiAgICAgIHk6ICgoaGVpZ2h0IC0geS92cmF0aW8pL2NhbWVyYS5zdGF0ZS5zY2FsaW5nICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuYmluZChiaW5kX2lkOm51bWJlcil7XHJcbiAgZm9yKGxldCBhID0gMDthIDwgYWxsX2JpbmRzLmxlbmd0aDsgYSsrKXtcclxuICAgIGlmKGFsbF9iaW5kc1thXS5pZCA9PSBiaW5kX2lkKXtcclxuICAgICAgYWxsX2JpbmRzLnNwbGljZShhLDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcblxyXG5sZXQgaWQgPSAwO1xyXG5leHBvcnQgZnVuY3Rpb24gQmluZChrZXluYW1lOnN0cmluZyxmdW5jOmNvbnRyb2xfZnVuYyxvYmplY3Q/Om9iajx1bmtub3duPik6bnVtYmVye1xyXG4gIGlmKGtleW5hbWUuc2xpY2UoMCw1KSA9PT0gXCJNb3VzZVwiKXtcclxuICAgIGFsbF9iaW5kcy5wdXNoKHtcclxuICAgICAga2V5OmtleW5hbWUsXHJcbiAgICAgIHR5cGU6YnR5cGUubW91c2UsXHJcbiAgICAgIGlkOmlkLFxyXG4gICAgICBmdW5jdGlvbjpmdW5jLFxyXG4gICAgICBvYmo6b2JqZWN0XHJcbiAgICB9KVxyXG4gIH1cclxuICBlbHNle1xyXG4gICAgYWxsX2JpbmRzLnB1c2goe1xyXG4gICAgICBrZXk6a2V5bmFtZSxcclxuICAgICAgdHlwZTpidHlwZS5rZXlib2FyZCxcclxuICAgICAgaWQ6aWQsXHJcbiAgICAgIGZ1bmN0aW9uOmZ1bmNcclxuICAgIH0pXHJcbiAgfVxyXG4gIGlkKys7XHJcbiAgcmV0dXJuIGlkIC0gMTtcclxufSIsImltcG9ydCB7c3RhdGVfZnVuYyxvYmpfc3RhdGV9IGZyb20gXCIuL3N0YXRlXCI7XHJcbmltcG9ydCB7cmVuZGVyX2Z1bmN9IGZyb20gXCIuL3JlbmRlclwiO1xyXG5pbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7Y29sbGlzaW9uX2JveH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7Z2V0R2FtZX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge1VuYmluZCxCaW5kLGNvbnRyb2xfZnVuY30gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuXHJcbmludGVyZmFjZSBvYmpfaTxUPntcclxuICBzdGF0ZWY6c3RhdGVfZnVuYzxUPixcclxuICByZW5kZXJmOnJlbmRlcl9mdW5jXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJZChhOkFycmF5PG9iajx1bmtub3duPj4saWQ6c3RyaW5nKTpvYmo8dW5rbm93bj57XHJcbiAgZm9yKGxldCBiID0gMDtiIDwgYS5sZW5ndGg7IGIrKyl7XHJcbiAgICBpZihhW2JdLmlkID09IGlkKXtcclxuICAgICAgcmV0dXJuIGFbYl07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmxldCBjb3VudGVyID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBvYmo8VD57XHJcbiAgc3ByaXRlX3VybCA9IFwiXCI7XHJcbiAgc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgc3RhdGU6VDtcclxuICBoZWlnaHQ6bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIHdpZHRoOm51bWJlciA9IHVuZGVmaW5lZDtcclxuICBjb2xsaXNpb246Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIGlkOnN0cmluZztcclxuICBiaW5kczpBcnJheTxudW1iZXI+O1xyXG4gIHJlbmRlciA9IHRydWU7XHJcbiAgZ2V0U3RhdGUoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5pZCA9IFwiXCIrY291bnRlcjtcclxuICAgIHRoaXMuYmluZHMgPSBbXTsgIFxyXG4gICAgY291bnRlcisrO1xyXG4gICAgdGhpcy5yZWdpc3Rlcl9jb250cm9scygpO1xyXG4gIH1cclxuICBsb2FkKCl7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgYSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuc3ByaXRlX3VybDtcclxuICAgICAgYS5vbmxvYWQgPSAoKCk9PntcclxuICAgICAgICBfdGhpcy5zcHJpdGVfc2hlZXQgPSBhO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBiaW5kQ29udHJvbChrZXk6c3RyaW5nLGZ1bmM6Y29udHJvbF9mdW5jKXtcclxuICAgIGlmKGtleSA9PSBcIk1vdXNlMVwiKXtcclxuICAgICAgbGV0IGIgPSBCaW5kKGtleSxmdW5jLHRoaXMpO1xyXG4gICAgICB0aGlzLmJpbmRzLnB1c2goYik7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB0aGlzLmJpbmRzLnB1c2goQmluZChrZXksZnVuYykpOyBcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGRlbGV0ZSgpe1xyXG4gICAgZm9yKGxldCBhIG9mIHRoaXMuYmluZHMpe1xyXG4gICAgICBVbmJpbmQoYSk7XHJcbiAgICB9XHJcbiAgICBnZXRHYW1lKCkuZ2V0Um9vbSgpLmRlbGV0ZUl0ZW0odGhpcy5pZCk7XHJcbiAgfVxyXG4gIGNvbGxpc2lvbl9jaGVjayhhOmNvbGxpc2lvbl9ib3gpOkFycmF5PG9iajx1bmtub3duPj57XHJcbiAgICBpZih0aGlzLmNvbGxpc2lvbil7XHJcbiAgICAgIGxldCByb29tID0gZ2V0R2FtZSgpLmdldFJvb20oKTtcclxuICAgICAgcmV0dXJuIHJvb20uY2hlY2tfY29sbGlzaW9ucyhhLHRoaXMuaWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gIH1cclxuICBjb2xsaWRlc193aXRoX2JveChhOmNvbGxpc2lvbl9ib3gpOmJvb2xlYW57XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGlmKHN0LnBvc2l0aW9uLnggPj0gYS54ICYmIHN0LnBvc2l0aW9uLnggPCAoYS54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoYS54ID4gc3QucG9zaXRpb24ueCAmJiBhLnggPCAoc3QucG9zaXRpb24ueCArIHRoaXMud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0LnBvc2l0aW9uLnkgPj0gYS55ICYmIHN0LnBvc2l0aW9uLnkgPCAoYS55ICsgYS5oZWlnaHQpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKGEueSA+IHN0LnBvc2l0aW9uLnkgJiYgYS55IDwgKHN0LnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIGNvbGxpZGVzX3dpdGgoYTpvYmo8dW5rbm93bj4pOmJvb2xlYW57XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IHN0XzIgPSBhLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBoY29sbGlkZXMgPSBmYWxzZSwgdmNvbGxpZGVzID0gZmFsc2U7XHJcbiAgICBpZihzdC5wb3NpdGlvbi54ID4gc3RfMi5wb3NpdGlvbi54ICYmIHN0LnBvc2l0aW9uLnggPCAoc3RfMi5wb3NpdGlvbi54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3RfMi5wb3NpdGlvbi54ID4gc3QucG9zaXRpb24ueCAmJiBzdF8yLnBvc2l0aW9uLnggPCAoc3QucG9zaXRpb24ueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0LnBvc2l0aW9uLnkgPiBzdF8yLnBvc2l0aW9uLnkgJiYgc3QucG9zaXRpb24ueSA8IChzdF8yLnBvc2l0aW9uLnkgKyBhLndpZHRoKSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdF8yLnBvc2l0aW9uLnkgPiBzdC5wb3NpdGlvbi55ICYmIHN0XzIucG9zaXRpb24ueSA8IChzdC5wb3NpdGlvbi55ICsgYS53aWR0aCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGhjb2xsaWRlcyAmJiB2Y29sbGlkZXM7XHJcbiAgfVxyXG4gIHJlbmRlcmYodGltZTpudW1iZXIpOnNwcml0ZXtcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgc3ByaXRlX2hlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG4gICAgbGV0IHNwcml0ZV93aWR0aCA9IHRoaXMud2lkdGg7XHJcbiAgICBpZih0aGlzLmhlaWdodCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5zcHJpdGVfc2hlZXQuaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy53aWR0aCA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBzcHJpdGVfd2lkdGggPSB0aGlzLnNwcml0ZV9zaGVldC53aWR0aDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNwcml0ZV9zaGVldDp0aGlzLnNwcml0ZV9zaGVldCxcclxuICAgICAgbGVmdDowLFxyXG4gICAgICB0b3A6MCxcclxuICAgICAgc3ByaXRlX3dpZHRoLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgc3RhdGljX29iantcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGU6SFRNTEltYWdlRWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGdyYXZpdHlfb2JqPFQ+IGV4dGVuZHMgb2JqPFQ+e1xyXG4gIGdyYXZpdHkgPSB0cnVlXHJcbn0iLCJpbXBvcnQge3Nwcml0ZX0gZnJvbSBcIi4vc3ByaXRlXCI7XHJcbmltcG9ydCB7R2V0Vmlld3BvcnREaW1lbnNpb25zfSBmcm9tIFwiLi4vdmFuXCI7XHJcbmltcG9ydCB7b2JqfSBmcm9tIFwiLi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuL3N0YXRlXCI7XHJcblxyXG5pbnRlcmZhY2UgY2FtZXJhX3N0YXRle1xyXG4gIHNjYWxpbmc6bnVtYmVyLFxyXG4gIHN0cmV0Y2g6Ym9vbGVhbixcclxuICBwb3NpdGlvbjp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG4gIGRpbWVuc2lvbnM6e1xyXG4gICAgd2lkdGg6bnVtYmVyLFxyXG4gICAgaGVpZ2h0Om51bWJlclxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbWVyYXtcclxuICBzdGF0ZTpjYW1lcmFfc3RhdGVcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcix3aWR0aDpudW1iZXIsaGVpZ2h0Om51bWJlcixzY2FsaW5nOm51bWJlcixzdHJldGNoOmJvb2xlYW4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgc2NhbGluZyxcclxuICAgICAgc3RyZXRjaCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHg6eC9zY2FsaW5nLFxyXG4gICAgICAgIHk6eS9zY2FsaW5nXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpbWVuc2lvbnM6e1xyXG4gICAgICAgIHdpZHRoOndpZHRoIC8gc2NhbGluZyxcclxuICAgICAgICBoZWlnaHQ6aGVpZ2h0IC8gc2NhbGluZ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldCB4KHg6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IHg7XHJcbiAgfVxyXG4gIHNldCB5KHk6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IHkgXHJcbiAgfVxyXG4gIGdldCB4KCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5wb3NpdGlvbi54O1xyXG4gIH1cclxuICBnZXQgeSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUucG9zaXRpb24ueTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIHJlbmRlcl9mdW5je1xyXG4gICh4Om51bWJlcix5Om51bWJlcixzY2FsaW5nOm51bWJlcik6dm9pZFxyXG59XHJcblxyXG5pbnRlcmZhY2UgcmVjdGFuZ2xle1xyXG4gIHdpZHRoOm51bWJlcixcclxuICBoZWlnaHQ6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBzcHJpdGVfYXJnc3tcclxuICBzcHJpdGU6c3ByaXRlLFxyXG4gIHg6bnVtYmVyLFxyXG4gIHk6bnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSByZW5kZXJlcl9hcmdze1xyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGNhbWVyYTpDYW1lcmFcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwcml0ZV9yZW5kZXJlciA9IChyOnJlbmRlcmVyX2FyZ3MsczpzcHJpdGVfYXJncykgPT4ge1xyXG4gIGxldCBjYW1lcmEgPSByLmNhbWVyYTtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgZmluYWxfeCA9ICgocy54IC0gY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngpICogci5jYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGZpbmFsX3kgPSAoKHZoZWlnaHQgLSBzLnkgLSBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0ICsgY2FtZXJhLnN0YXRlLnBvc2l0aW9uLnkpICogci5jYW1lcmEuc3RhdGUuc2NhbGluZyk7XHJcbiAgbGV0IGhlaWdodCA9IHMuc3ByaXRlLnNwcml0ZV9oZWlnaHQgKiByLmNhbWVyYS5zdGF0ZS5zY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHMuc3ByaXRlLnNwcml0ZV93aWR0aCAqIHIuY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgci5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgIHMuc3ByaXRlLnNwcml0ZV9zaGVldCxcclxuICAgIHMuc3ByaXRlLmxlZnQsXHJcbiAgICBzLnNwcml0ZS50b3AsXHJcbiAgICBzLnNwcml0ZS5zcHJpdGVfd2lkdGgsXHJcbiAgICBzLnNwcml0ZS5zcHJpdGVfaGVpZ2h0LFxyXG4gICAgZmluYWxfeCxcclxuICAgIGZpbmFsX3ksXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlY3RfcmVuZGVyZXIgPSAoY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQscmVjdDpyZWN0YW5nbGUseDpudW1iZXIseTpudW1iZXIsY29sb3I6c3RyaW5nLGNhbWVyYTpDYW1lcmEpID0+IHtcclxuICBsZXQgdmhlaWdodCA9IEdldFZpZXdwb3J0RGltZW5zaW9ucygpLmhlaWdodDtcclxuICBsZXQgZmluYWxfeCA9ICgoeCAtIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi54KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgZmluYWxfeSA9ICgodmhlaWdodCAtIHkgLSByZWN0LmhlaWdodCArIGNhbWVyYS5zdGF0ZS5wb3NpdGlvbi55KSAqIGNhbWVyYS5zdGF0ZS5zY2FsaW5nKTtcclxuICBsZXQgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKiBjYW1lcmEuc3RhdGUuc2NhbGluZztcclxuICBsZXQgd2lkdGggPSByZWN0LndpZHRoICogY2FtZXJhLnN0YXRlLnNjYWxpbmc7XHJcbiAgY29udGV4dC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gIGNvbnRleHQuc3Ryb2tlUmVjdChmaW5hbF94LGZpbmFsX3kscmVjdC53aWR0aCxoZWlnaHQpO1xyXG59IiwiaW1wb3J0IHsgZ3Jhdml0eV9vYmosb2JqIH0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7IHNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBvYmpfc3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2ssY2hlY2tfY29sbGlzaW9ucyxjb2xsaXNpb25fYm94LGNoZWNrX2FsbF9jb2xsaXNpb25zLGNoZWNrX2FsbF9vYmplY3RzfSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtyZW5kZXJfY29sbGlzaW9uX2JveCxERUJVR30gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge0JpbmQsY29udHJvbF9mdW5jfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5pbXBvcnQgeyBPdmVyd29ybGQgfSBmcm9tIFwiLi4vZ2FtZS9yb29tcy9vdmVyd29ybGRcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseV9ncmF2aXR5KG9iOmdyYXZpdHlfb2JqPHVua25vd24+LGdyYXZfY29uc3Q6bnVtYmVyLCBncmF2X21heDpudW1iZXIpe1xyXG4gIGxldCBzdCA9IG9iLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBpZihvYi5ncmF2aXR5ICYmIHN0LnZlbG9jaXR5LnkgPiBncmF2X21heCl7XHJcbiAgICBzdC52ZWxvY2l0eS55ICs9IGdyYXZfY29uc3Q7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgcm9vbTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDogc3RyaW5nID0gXCJcIjtcclxuICBiYWNrZ3JvdW5kOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIG9iamVjdHM6IEFycmF5PG9iajx1bmtub3duPj5cclxuICBzdGF0ZTogVFxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgbGV0IHRvX2F3YWl0ID0gdGhpcy5vYmplY3RzLm1hcCgoYSkgPT4gYS5sb2FkKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbCh0b19hd2FpdCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5iYWNrZ3JvdW5kX3VybDtcclxuICAgICAgYS5vbmVycm9yID0gKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGxvYWRpbmcgdXJsOlwiICsgdGhpcy5iYWNrZ3JvdW5kX3VybCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIGEub25sb2FkID0gKCgpID0+IHtcclxuICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kID0gYTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgZGVsZXRlSXRlbShpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDthIDwgdGhpcy5vYmplY3RzLmxlbmd0aDthKyspe1xyXG4gICAgICBpZih0aGlzLm9iamVjdHNbYV0uaWQgPT09IGlkKXtcclxuICAgICAgICB0aGlzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuc2xpY2UoMCxhKS5jb25jYXQodGhpcy5vYmplY3RzLnNsaWNlKGErMSkpO1xyXG4gICAgICAgIGEtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBiaW5kQ29udHJvbChrZXk6c3RyaW5nLGZ1bmM6Y29udHJvbF9mdW5jKXtcclxuICAgIEJpbmQoa2V5LGZ1bmMpOyBcclxuICB9XHJcbiAgY2hlY2tfY29sbGlzaW9ucyhib3g6Y29sbGlzaW9uX2JveCxleGVtcHQ/OnN0cmluZyk6QXJyYXk8b2JqPHVua25vd24+PntcclxuICAgIGlmKERFQlVHKXtcclxuICAgICAgcmVuZGVyX2NvbGxpc2lvbl9ib3goYm94KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGVja19hbGxfY29sbGlzaW9ucyhib3gsdGhpcy5vYmplY3RzLGV4ZW1wdCk7XHJcbiAgfVxyXG4gIGNoZWNrX29iamVjdHMoYm94OmNvbGxpc2lvbl9ib3gsZXhlbXB0PzpzdHJpbmcpe1xyXG4gICAgaWYoREVCVUcpe1xyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9vYmplY3RzKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGNsZWFudXAoKXtcclxuXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE9iaihpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1thXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6IG51bWJlcik6IHNwcml0ZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGVfc2hlZXQ6IHRoaXMuYmFja2dyb3VuZCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0OiB0aGlzLmJhY2tncm91bmQuaGVpZ2h0LFxyXG4gICAgICBzcHJpdGVfd2lkdGg6IHRoaXMuYmFja2dyb3VuZC53aWR0aFxyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2Ugc3ByaXRle1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LFxyXG4gIGxlZnQ6bnVtYmVyLFxyXG4gIHRvcDpudW1iZXIsXHJcbiAgc3ByaXRlX3dpZHRoOm51bWJlcixcclxuICBzcHJpdGVfaGVpZ2h0Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlX2dlbihzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxzcHJpdGVfd2lkdGg6bnVtYmVyLHNwcml0ZV9oZWlnaHQ6bnVtYmVyKTpBcnJheTxzcHJpdGU+e1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZV9zaGVldC53aWR0aDtcclxuICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gW107XHJcbiAgZm9yKGxldCBhID0gMDsgYSA8IHdpZHRoO2EgKz0gc3ByaXRlX3dpZHRoKXtcclxuICAgIHNwcml0ZXMucHVzaCh7XHJcbiAgICAgIHNwcml0ZV9zaGVldCxcclxuICAgICAgbGVmdDphLFxyXG4gICAgICB0b3A6MCxcclxuICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXR1cm4gc3ByaXRlcztcclxufSIsImV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XHJcblxyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7cm9vbX0gZnJvbSBcIi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7VGVzdGVyfSBmcm9tIFwiLi9nYW1lL3Jvb21zL3Rlc3Rfcm9vbVwiO1xyXG5pbXBvcnQgeyBjb2xsaXNpb25fYm94IH0gZnJvbSBcIi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge3Nwcml0ZV9yZW5kZXJlcixyZWN0X3JlbmRlcmVyLCBDYW1lcmF9IGZyb20gXCIuL2xpYi9yZW5kZXJcIjtcclxuXHJcbmxldCBjYW52YXNfZWxlbWVudDpIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG5sZXQgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSBjYW52YXNfZWxlbWVudC5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5cclxuXHJcbmxldCBzY3JlZW5fd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxubGV0IHNjcmVlbl9oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4vKlxyXG5sZXQgdmhlaWdodCA9IDEyMDA7XHJcbmxldCB2d2lkdGggPSB2aGVpZ2h0ICogKDE2LzkpO1xyXG5jYW52YXMud2lkdGggPSB2d2lkdGg7XHJcbmNhbnZhcy5oZWlnaHQgPSB2aGVpZ2h0O1xyXG4qL1xyXG5cclxubGV0IHZ3aWR0aCA9IDgwMDtcclxubGV0IHZoZWlnaHQgPSA0MDA7XHJcblxyXG5cclxuLy9Ib3cgb2Z0ZW4gdGhlIGdhbWUgbG9naWMgbG9vcCBzaG91bGQgcnVuLCBpbiBtaWxsaXNlY29uZHNcclxubGV0IGxvZ2ljX2xvb3BfaW50ZXJ2YWw6bnVtYmVyID0gMTAwMC82MDsgIFxyXG5cclxubGV0IGxhc3RfdGltZSA9IG5ldyBEYXRlKCk7XHJcblxyXG5pbnRlcmZhY2UgZGltZW5zaW9uc3tcclxuICBoZWlnaHQ6bnVtYmVyLFxyXG4gIHdpZHRoOm51bWJlclxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFNjcmVlbkRpbWVuc2lvbnMgKCk6ZGltZW5zaW9uc3tcclxuICByZXR1cm4oe1xyXG4gICAgd2lkdGg6c2NyZWVuX3dpZHRoLFxyXG4gICAgaGVpZ2h0OnNjcmVlbl9oZWlnaHRcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0Vmlld3BvcnREaW1lbnNpb25zICgpOmRpbWVuc2lvbnN7XHJcbiAgcmV0dXJuKHtcclxuICAgIGhlaWdodDp2aGVpZ2h0LFxyXG4gICAgd2lkdGg6dndpZHRoXHJcbiAgfSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlbmRlcl9jb2xsaXNpb25fYm94ID0gKGE6Y29sbGlzaW9uX2JveCkgPT4ge1xyXG4gIGJveGVzLnB1c2goYSk7XHJcbn1cclxuXHJcbmxldCBib3hlczpBcnJheTxjb2xsaXNpb25fYm94PiA9IFtdO1xyXG5cclxubGV0IGRlZXAgPSAoYTphbnkpID0+e1xyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGEpKTtcclxufVxyXG5cclxuaW50ZXJmYWNlIGdhbWVfc3RhdGV7XHJcbiAgbG9naWM6bnVtYmVyLFxyXG4gIGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gIGN1cnJlbnRfcm9vbTpyb29tPHVua25vd24+LFxyXG4gIGNhbWVyYTpDYW1lcmEsXHJcbiAgY2FudmFzOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gIHBsYXllcl9zdGF0ZTp7XHJcbiAgICBwb3dlcjpudW1iZXJcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBnYW1le1xyXG4gIHN0YXRlOmdhbWVfc3RhdGU7XHJcbiAgY29udGV4dDpDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgY29uc3RydWN0b3IoY3R4OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxhOnJvb208dW5rbm93bj4pe1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgY2FudmFzOmNhbnZhc19lbGVtZW50LFxyXG4gICAgICBsb2dpYzp1bmRlZmluZWQsXHJcbiAgICAgIGNvbnRleHQ6Y3R4LFxyXG4gICAgICBjYW1lcmE6bmV3IENhbWVyYSgwLDAsdndpZHRoLHZoZWlnaHQsMSxmYWxzZSksXHJcbiAgICAgIGN1cnJlbnRfcm9vbTogdW5kZWZpbmVkLFxyXG4gICAgICBwbGF5ZXJfc3RhdGU6e1xyXG4gICAgICAgIHBvd2VyOjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5sb2FkUm9vbShhKTtcclxuICB9XHJcbiAgcmVuZGVyKHQ6bnVtYmVyKXtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5jbGVhclJlY3QoMCwwLHZ3aWR0aCx2aGVpZ2h0KTtcclxuICAgIHRoaXMuc3RhdGUuY29udGV4dC5maWxsU3R5bGU9XCJibGFja1wiO1xyXG4gICAgdGhpcy5zdGF0ZS5jb250ZXh0LmZpbGxSZWN0KDAsMCx2d2lkdGgsdmhlaWdodCk7XHJcbiAgICBsZXQgY2FtZXJhX2NvbGxpZGVycyA9IHRoaXMuc3RhdGUuY3VycmVudF9yb29tLmNoZWNrX29iamVjdHMoe1xyXG4gICAgICB4OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6dGhpcy5zdGF0ZS5jYW1lcmEuc3RhdGUuZGltZW5zaW9ucy53aWR0aCxcclxuICAgICAgaGVpZ2h0OnRoaXMuc3RhdGUuY2FtZXJhLnN0YXRlLmRpbWVuc2lvbnMuaGVpZ2h0XHJcbiAgICB9KTtcclxuICAgIGxldCByZW5kZXJfYXJncyA9IHtcclxuICAgICAgY29udGV4dDp0aGlzLnN0YXRlLmNvbnRleHQsXHJcbiAgICAgIGNhbWVyYTp0aGlzLnN0YXRlLmNhbWVyYSxcclxuICAgIH07XHJcbiAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICBzcHJpdGU6dGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ucmVuZGVyZih0KSxcclxuICAgICAgeDowLFxyXG4gICAgICB5OjBcclxuICAgIH0pO1xyXG4gICAgZm9yIChsZXQgYSBvZiBjYW1lcmFfY29sbGlkZXJzKXtcclxuICAgICAgbGV0IHN0ID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICAgIGlmKGEucmVuZGVyKXtcclxuICAgICAgICBzcHJpdGVfcmVuZGVyZXIocmVuZGVyX2FyZ3Mse1xyXG4gICAgICAgICAgc3ByaXRlOmEucmVuZGVyZih0KSxcclxuICAgICAgICAgIHg6c3QucG9zaXRpb24ueCxcclxuICAgICAgICAgIHk6c3QucG9zaXRpb24ueVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgYm94OmNvbGxpc2lvbl9ib3g7XHJcbiAgICB3aGlsZShib3hlcy5sZW5ndGggPiAwKXtcclxuICAgICAgbGV0IGJveCA9IGJveGVzLnBvcCgpO1xyXG4gICAgICBsZXQgcmVjdCA9IHtcclxuICAgICAgICB3aWR0aDpib3gud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OmJveC5oZWlnaHRcclxuICAgICAgfVxyXG4gICAgICByZWN0X3JlbmRlcmVyKGNvbnRleHQscmVjdCxib3gueCxib3gueSxcIiNGRjAwMDBcIix0aGlzLnN0YXRlLmNhbWVyYSk7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKGEpPT57dGhpcy5yZW5kZXIoYSl9KTsgXHJcbiAgfVxyXG4gIHN0YXJ0X2xvZ2ljKGE6bnVtYmVyKXtcclxuICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICBsZXQgbmV3X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgdGltZV9zaW5jZSA9IG5ld190aW1lLmdldFRpbWUoKSAtIGxhc3RfdGltZS5nZXRUaW1lKCk7XHJcbiAgICAgIGxhc3RfdGltZSA9IG5ld190aW1lO1xyXG4gICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5zdGF0ZWYobmV3X3RpbWUuZ2V0VGltZSgpKTtcclxuICAgIH0sYSk7XHJcbiAgfVxyXG4gIGdldFJvb20oKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbTtcclxuICB9XHJcbiAgYXN5bmMgbG9hZFJvb20oeDpyb29tPHVua25vd24+KXtcclxuXHJcbiAgICBpZih0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgd2hpbGUodGhpcy5zdGF0ZS5jdXJyZW50X3Jvb20ub2JqZWN0cy5sZW5ndGggPiAwKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRfcm9vbS5vYmplY3RzWzBdLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3X3Jvb20gPSBhd2FpdCB4LmxvYWQoKTtcclxuICAgIHgucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICAgIHRoaXMuc3RhdGUuY3VycmVudF9yb29tID0geDtcclxuICAgIGlmKHRoaXMuc3RhdGUubG9naWMgIT0gdW5kZWZpbmVkKXtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmxvZ2ljKTtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUubG9naWMgPSB0aGlzLnN0YXJ0X2xvZ2ljKGxvZ2ljX2xvb3BfaW50ZXJ2YWwpXHJcbiAgICB0aGlzLnJlbmRlcigwKTtcclxuICB9XHJcbn1cclxuXHJcbmxldCBnYW1lX2luc3QgPSBuZXcgZ2FtZShjb250ZXh0LG5ldyBPdmVyd29ybGQoKSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2FtZSgpe1xyXG4gIHJldHVybiBnYW1lX2luc3Q7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9