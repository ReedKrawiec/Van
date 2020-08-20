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
            }
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
    statef(time) {
        //console.log(this.state);
        /*
        if(this.state.direction == direction.right){
          this.state.velocity.x = 3;
          if(this.state.position.x >= 1000 - this.width){
            this.state.direction = direction.left;
          }
        }
        if(this.state.direction == direction.left){
          this.state.velocity.x = -3;
          if(this.state.position.x <= 0){
            this.state.direction = direction.right;
          }
        }
        */
    }
}
exports.Goomba = Goomba;
class StandingGoomba extends object_1.gravity_obj {
    constructor(x, y) {
        super();
        this.sprite_url = "http://localhost/src/game/objects/goomba.png";
        this.height = 64;
        this.width = 64;
        this.collision = true;
        this.state = {
            direction: direction.left,
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
}
exports.StandingGoomba = StandingGoomba;


/***/ }),

/***/ "./src/game/rooms/overworld.ts":
/*!*************************************!*\
  !*** ./src/game/rooms/overworld.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Overworld = void 0;
const room_1 = __webpack_require__(/*! ../../lib/room */ "./src/lib/room.ts");
const goomba_1 = __webpack_require__(/*! ../objects/goomba */ "./src/game/objects/goomba.ts");
const box_1 = __webpack_require__(/*! ../objects/box */ "./src/game/objects/box.ts");
const collision_1 = __webpack_require__(/*! ../../lib/collision */ "./src/lib/collision.ts");
const controls_1 = __webpack_require__(/*! ../../lib/controls */ "./src/lib/controls.ts");
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
        this.objects = [new goomba_1.Goomba(936, 800, "player"), new goomba_1.StandingGoomba(936, 1200), new goomba_1.StandingGoomba(0, 800), new goomba_1.StandingGoomba(0, 1000), new goomba_1.StandingGoomba(0, 600), new box_1.Box(0, 400), new box_1.Box(500, 500)];
        this.state = {
            player: undefined
        };
    }
    statef(time) {
        for (let a = 0; a < this.objects.length; a++) {
            collision_1.velocity_collision_check(this.objects[a], this.objects);
            room_1.apply_gravity(this.objects[a], -.5, -15);
            this.objects[a].statef(time);
        }
    }
    register_controls() {
        let _this = this;
        this.state.player = this.getObj("player");
        controls_1.Bind("KeyW", () => {
            console.log("w");
            let st = _this.state.player.state;
            console.log(st.velocity.y);
            if (st.velocity.y < 15) {
                st.velocity.y += 15;
            }
        });
        controls_1.Bind("KeyA", () => {
            let st = _this.state.player.state;
            if (st.velocity.x > 0) {
                st.velocity.x = 0;
            }
            if (st.velocity.x > -6) {
                if (st.velocity.x === 0) {
                    st.velocity.x = -3;
                }
                else {
                    st.velocity.x -= 1.5;
                }
            }
        });
        controls_1.Bind("KeyD", () => {
            let st = _this.state.player.state;
            if (st.velocity.x < 0) {
                st.velocity.x = 0;
            }
            if (st.velocity.x < 6) {
                if (st.velocity.x === 0) {
                    st.velocity.x = 3;
                }
                else {
                    st.velocity.x += 1.5;
                }
            }
        });
    }
}
exports.Overworld = Overworld;
//, new Box(0,0)


/***/ }),

/***/ "./src/lib/collision.ts":
/*!******************************!*\
  !*** ./src/lib/collision.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.velocity_collision_check = void 0;
const object_1 = __webpack_require__(/*! ../lib/object */ "./src/lib/object.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
    direction[direction["up"] = 2] = "up";
    direction[direction["down"] = 3] = "down";
})(direction || (direction = {}));
function check_collisions(c, objs, exemption) {
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            return a.id;
        }
    }
    return undefined;
}
function velocity_max(velocity, box, objs, exemption, dir) {
    let collision_id = check_collisions(box, objs, exemption);
    if (collision_id == undefined) {
        return velocity;
    }
    else {
        let collider = object_1.getId(objs, collision_id);
        let origin = object_1.getId(objs, exemption);
        let orig_st = origin.state;
        let collider_st = collider.state;
        if (dir == direction.left) {
            console.log(collider);
            console.log(origin);
            return orig_st.position.x - (collider_st.position.x + collider.width);
        }
        else if (dir == direction.right) {
            return collider_st.position.x - (orig_st.position.x + origin.width) - 1;
        }
        else if (dir == direction.down) {
            return orig_st.position.y - (collider_st.position.y + collider.height);
        }
        else if (dir == direction.up) {
            return collider_st.position.y - (orig_st.position.y + origin.height) - 1;
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
        console.log(vel);
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
exports.Bind = void 0;
window.addEventListener("keydown", (e) => {
    console.log(binds);
    if (e.code in binds) {
        for (let a = 0; a < binds[e.code].length; a++) {
            binds[e.code][a]();
        }
    }
});
window.addEventListener("mousemove", (e) => {
});
let binds = {};
function Bind(keyname, func) {
    if (binds[keyname] == undefined) {
        binds[keyname] = [];
    }
    binds[keyname].push(func);
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
        this.id = "" + counter;
        counter++;
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
    statef(time) {
    }
    collides_with_box(a) {
        let st = this.state;
        let hcollides = false, vcollides = false;
        if (st.position.x >= a.x && st.position.x <= (a.x + a.width)) {
            hcollides = true;
        }
        if (a.x > st.position.x && a.x < (st.position.x + this.width)) {
            hcollides = true;
        }
        if (st.position.y >= a.y && st.position.y <= (a.y + a.height)) {
            vcollides = true;
        }
        if (a.y > st.position.y && a.y < (st.position.y + this.height)) {
            vcollides = true;
        }
        console.log(hcollides + " " + vcollides);
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
        //console.log(vcollides);
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
const overworld_1 = __webpack_require__(/*! ./game/rooms/overworld */ "./src/game/rooms/overworld.ts");
let canvas_element = document.getElementById("target");
let context = canvas_element.getContext("2d");
let vheight = 1000;
let vwidth = 1000;
//How often the game logic loop should run, in milliseconds
let logic_loop_interval = 1000 / 60;
let last_time = new Date();
let Room = overworld_1.Overworld;
let curr_room = new Room();
setInterval(() => {
    let new_time = new Date();
    let time_since = new_time.getTime() - last_time.getTime();
    last_time = new_time;
    curr_room.statef(new_time.getTime());
}, logic_loop_interval);
const renderer = (sprite, x, y, scaling) => {
    let final_x = x;
    let final_y = vheight - y - sprite.sprite_height;
    let height = sprite.sprite_height * scaling;
    let width = sprite.sprite_width * scaling;
    context.drawImage(sprite.sprite_sheet, sprite.left, sprite.top, sprite.sprite_width, sprite.sprite_height, final_x, final_y, width, height);
};
const renderLoop = (t) => {
    context.clearRect(0, 0, vwidth, vheight);
    let object_to_render = curr_room.objects;
    renderer(curr_room.renderf(t), 0, 0, 1);
    let index = 0;
    for (let a of object_to_render) {
        renderer(a.renderf(t), a.state.position.x, a.state.position.y, 1);
        index++;
    }
    requestAnimationFrame(renderLoop);
};
window.addEventListener("keydown", (e) => {
    console.log(e);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield curr_room.load();
        curr_room.register_controls();
        requestAnimationFrame(renderLoop);
    });
}
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcm9vbXMvb3ZlcndvcmxkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29sbGlzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yb29tLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy92YW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxvRkFB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QUFDLENBQUM7UUFDL0QsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELHFCQUFxQixDQUFDLFVBQVUsQ0FBQztBQUNuQyxDQUFDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFO0lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUYsU0FBZSxJQUFJOztRQUNqQixNQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QixxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQUE7QUFJRCxJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiJ2YW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92YW4udHNcIik7XG4iLCJpbXBvcnQge2dyYXZpdHlfb2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uLy4uL2xpYi9zdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJveCBleHRlbmRzIGdyYXZpdHlfb2JqPG9ial9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2JveC5wbmdcIlxyXG4gIGNvbGxpc2lvbiA9IHRydWVcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDUwMDtcclxuICBncmF2aXR5ID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCBpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsImltcG9ydCB7dmVsb2NpdHksb2JqX3N0YXRlLHN0YXRlX2Z1bmN9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuaW1wb3J0IHtzcHJpdGUsc3ByaXRlX2dlbn0gZnJvbSBcIi4uLy4uL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBnb29tYmFfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgdmVsb2NpdHk6dmVsb2NpdHlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEdvb21iYSBleHRlbmRzIGdyYXZpdHlfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkaXJlY3Rpb246ZGlyZWN0aW9uLmxlZnQsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmKE1hdGguZmxvb3IodC8yNTApICUgMiA9PSAwKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XHJcbiAgICAvKlxyXG4gICAgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgdGhpcy5zdGF0ZS52ZWxvY2l0eS54ID0gMztcclxuICAgICAgaWYodGhpcy5zdGF0ZS5wb3NpdGlvbi54ID49IDEwMDAgLSB0aGlzLndpZHRoKXtcclxuICAgICAgICB0aGlzLnN0YXRlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5sZWZ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLnN0YXRlLmRpcmVjdGlvbiA9PSBkaXJlY3Rpb24ubGVmdCl7XHJcbiAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IC0zO1xyXG4gICAgICBpZih0aGlzLnN0YXRlLnBvc2l0aW9uLnggPD0gMCl7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICovXHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFuZGluZ0dvb21iYSBleHRlbmRzIGdyYXZpdHlfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiaW1wb3J0IHtyb29tLGFwcGx5X2dyYXZpdHl9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge1N0YW5kaW5nR29vbWJhLEdvb21iYSwgZ29vbWJhX3N0YXRlfSBmcm9tIFwiLi4vb2JqZWN0cy9nb29tYmFcIjtcclxuaW1wb3J0IHtCb3h9IGZyb20gXCIuLi9vYmplY3RzL2JveFwiOyBcclxuaW1wb3J0IHt2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2t9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7QmluZH0gZnJvbSBcIi4uLy4uL2xpYi9jb250cm9sc1wiO1xyXG5pbXBvcnQgeyBncmF2aXR5X29iaiB9IGZyb20gXCIuLi8uLi9saWIvb2JqZWN0XCI7XHJcblxyXG5pbnRlcmZhY2Ugb3ZlcndvcmxkX2l7XHJcbiAgcGxheWVyOmdyYXZpdHlfb2JqPHVua25vd24+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPdmVyd29ybGQgZXh0ZW5kcyByb29tPG92ZXJ3b3JsZF9pPntcclxuICBiYWNrZ3JvdW5kX3VybD1cImh0dHBzOi8vaW1nLndhbGxwYXBlcnNhZmFyaS5jb20vZGVza3RvcC8xOTIwLzEwODAvOC81MS9pbUQ0MWwuanBnXCI7XHJcbiAgb2JqZWN0cyA9IFtuZXcgR29vbWJhKDkzNiw4MDAsXCJwbGF5ZXJcIiksbmV3IFN0YW5kaW5nR29vbWJhKDkzNiwxMjAwKSxuZXcgU3RhbmRpbmdHb29tYmEoMCw4MDApLG5ldyBTdGFuZGluZ0dvb21iYSgwLDEwMDApLG5ldyBTdGFuZGluZ0dvb21iYSgwLDYwMCksIG5ldyBCb3goMCw0MDApLCBuZXcgQm94KDUwMCw1MDApXVxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcGxheWVyOnVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayh0aGlzLm9iamVjdHNbYV0sdGhpcy5vYmplY3RzKTtcclxuICAgICAgYXBwbHlfZ3Jhdml0eSh0aGlzLm9iamVjdHNbYV0sLS41LC0xNSk7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgdGhpcy5zdGF0ZS5wbGF5ZXIgPSB0aGlzLmdldE9iaihcInBsYXllclwiKSBhcyBncmF2aXR5X29iajx1bmtub3duPjtcclxuICAgIFxyXG4gICAgQmluZChcIktleVdcIiwoKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZyhcIndcIik7XHJcbiAgICAgIGxldCBzdCA9IF90aGlzLnN0YXRlLnBsYXllci5zdGF0ZSBhcyBnb29tYmFfc3RhdGU7XHJcbiAgICAgIGNvbnNvbGUubG9nKHN0LnZlbG9jaXR5LnkpO1xyXG4gICAgICBpZihzdC52ZWxvY2l0eS55IDwgMTUpe1xyXG4gICAgICAgIHN0LnZlbG9jaXR5LnkgKz0gMTVcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIEJpbmQoXCJLZXlBXCIsKCk9PntcclxuICAgICAgbGV0IHN0ID0gX3RoaXMuc3RhdGUucGxheWVyLnN0YXRlIGFzIGdvb21iYV9zdGF0ZTtcclxuICAgICAgaWYoc3QudmVsb2NpdHkueCA+IDApe1xyXG4gICAgICAgIHN0LnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKHN0LnZlbG9jaXR5LnggPiAtNil7XHJcbiAgICAgICAgaWYoc3QudmVsb2NpdHkueCA9PT0gMCl7XHJcbiAgICAgICAgICBzdC52ZWxvY2l0eS54ID0gLSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgc3QudmVsb2NpdHkueCAtPSAxLjVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBCaW5kKFwiS2V5RFwiLCgpPT57XHJcbiAgICAgIGxldCBzdCA9IF90aGlzLnN0YXRlLnBsYXllci5zdGF0ZSBhcyBnb29tYmFfc3RhdGU7XHJcbiAgICAgIGlmKHN0LnZlbG9jaXR5LnggPCAwKXtcclxuICAgICAgICBzdC52ZWxvY2l0eS54ID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZihzdC52ZWxvY2l0eS54IDwgNil7XHJcbiAgICAgICAgaWYoc3QudmVsb2NpdHkueCA9PT0gMCl7XHJcbiAgICAgICAgICBzdC52ZWxvY2l0eS54ID0gMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgIHN0LnZlbG9jaXR5LnggKz0gMS41XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufVxyXG5cclxuLy8sIG5ldyBCb3goMCwwKSIsImltcG9ydCB7b2JqLGdldElkfSBmcm9tIFwiLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uL2xpYi9zdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb2xsaXNpb25fYm94e1xyXG4gIHg6bnVtYmVyO1xyXG4gIHk6bnVtYmVyO1xyXG4gIHdpZHRoOm51bWJlcjtcclxuICBoZWlnaHQ6bnVtYmVyO1xyXG59XHJcblxyXG5lbnVtIGRpcmVjdGlvbntcclxuICBsZWZ0LFxyXG4gIHJpZ2h0LFxyXG4gIHVwLFxyXG4gIGRvd25cclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tfY29sbGlzaW9ucyhjOiBjb2xsaXNpb25fYm94LCBvYmpzOiBBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nKSB7XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgcmV0dXJuIGEuaWQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZlbG9jaXR5X21heCh2ZWxvY2l0eTpudW1iZXIsYm94OmNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LCBleGVtcHRpb246c3RyaW5nLGRpcjpkaXJlY3Rpb24pe1xyXG4gIGxldCBjb2xsaXNpb25faWQgPSBjaGVja19jb2xsaXNpb25zKGJveCwgb2JqcywgZXhlbXB0aW9uKTtcclxuICBpZihjb2xsaXNpb25faWQgPT0gdW5kZWZpbmVkKXtcclxuICAgIHJldHVybiB2ZWxvY2l0eTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGxldCBjb2xsaWRlciA9IGdldElkKG9ianMsY29sbGlzaW9uX2lkKTtcclxuICAgIGxldCBvcmlnaW4gPSBnZXRJZChvYmpzLGV4ZW1wdGlvbik7XHJcbiAgICBsZXQgb3JpZ19zdCA9IG9yaWdpbi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgY29sbGlkZXJfc3QgPSBjb2xsaWRlci5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBpZihkaXIgPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICBjb25zb2xlLmxvZyhjb2xsaWRlcik7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9yaWdpbik7XHJcbiAgICAgIHJldHVybiBvcmlnX3N0LnBvc2l0aW9uLnggLSAoY29sbGlkZXJfc3QucG9zaXRpb24ueCArIGNvbGxpZGVyLndpZHRoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi5yaWdodCl7XHJcbiAgICAgIHJldHVybiBjb2xsaWRlcl9zdC5wb3NpdGlvbi54IC0gKG9yaWdfc3QucG9zaXRpb24ueCArIG9yaWdpbi53aWR0aCkgLSAxO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLmRvd24pe1xyXG4gICAgICByZXR1cm4gb3JpZ19zdC5wb3NpdGlvbi55IC0gKGNvbGxpZGVyX3N0LnBvc2l0aW9uLnkgKyBjb2xsaWRlci5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnVwKXtcclxuICAgICAgcmV0dXJuIGNvbGxpZGVyX3N0LnBvc2l0aW9uLnkgLSAob3JpZ19zdC5wb3NpdGlvbi55ICsgb3JpZ2luLmhlaWdodCkgLSAxO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayhvYmplY3Q6b2JqPHVua25vd24+LGxpc3Q6QXJyYXk8b2JqPHVua25vd24+Pikge1xyXG4gIGxldCBvYiA9IG9iamVjdDtcclxuICBsZXQgc3QgPSBvYmplY3QuZ2V0U3RhdGUoKSBhcyBvYmpfc3RhdGU7XHJcbiAgbGV0IHhfdmVsID0gc3QudmVsb2NpdHkueDtcclxuICBsZXQgeV92ZWwgPSBzdC52ZWxvY2l0eS55O1xyXG4gIGlmICh4X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLnggKyBvYi53aWR0aCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfTtcclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ucmlnaHQpO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7ICBcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeF92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiB4X3ZlbCArIHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiAtMSAqIHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5sZWZ0KTtcclxuICAgIGNvbnNvbGUubG9nKHZlbCk7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueCArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS54ID0gMDsgXHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmICh5X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnkgKyBvYi5oZWlnaHQsXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiB5X3ZlbFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS55LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi51cCk7XHJcbiAgICBpZih2ZWwgPiAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeV92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiBzdC5wb3NpdGlvbi54LFxyXG4gICAgICB5OiB5X3ZlbCArIHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiBvYi53aWR0aCxcclxuICAgICAgaGVpZ2h0OiAtMSAqIHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLmRvd24pO1xyXG4gICAgaWYodmVsIDwgMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnkgKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueSA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG59Iiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGUpPT57XHJcbiAgY29uc29sZS5sb2coYmluZHMpO1xyXG4gIGlmKGUuY29kZSBpbiBiaW5kcyl7XHJcbiAgICBmb3IobGV0IGEgPSAwO2EgPCBiaW5kc1tlLmNvZGVdLmxlbmd0aDthKyspe1xyXG4gICAgICBiaW5kc1tlLmNvZGVdW2FdKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwoZSk9PntcclxuICBcclxufSlcclxuXHJcbmxldCBiaW5kczphbnkgPSB7fTtcclxuXHJcbmludGVyZmFjZSBjb250cm9sX2Z1bmN7XHJcbiAgKCk6dm9pZFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQmluZChrZXluYW1lOnN0cmluZyxmdW5jOmNvbnRyb2xfZnVuYyl7XHJcbiAgaWYoYmluZHNba2V5bmFtZV0gPT0gdW5kZWZpbmVkKXtcclxuICAgIGJpbmRzW2tleW5hbWVdID0gW107XHJcbiAgfVxyXG4gIGJpbmRzW2tleW5hbWVdLnB1c2goZnVuYyk7XHJcbn0iLCJpbXBvcnQge3N0YXRlX2Z1bmMsb2JqX3N0YXRlfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQge3JlbmRlcl9mdW5jfSBmcm9tIFwiLi9yZW5kZXJcIjtcclxuaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQge2NvbGxpc2lvbl9ib3h9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbnRlcmZhY2Ugb2JqX2k8VD57XHJcbiAgc3RhdGVmOnN0YXRlX2Z1bmM8VD4sXHJcbiAgcmVuZGVyZjpyZW5kZXJfZnVuY1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWQoYTpBcnJheTxvYmo8dW5rbm93bj4+LGlkOnN0cmluZyk6b2JqPHVua25vd24+e1xyXG4gIGZvcihsZXQgYiA9IDA7YiA8IGEubGVuZ3RoOyBiKyspe1xyXG4gICAgaWYoYVtiXS5pZCA9PSBpZCl7XHJcbiAgICAgIHJldHVybiBhW2JdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5sZXQgY291bnRlciA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3Mgb2JqPFQ+e1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHN0YXRlOlQ7XHJcbiAgaGVpZ2h0Om51bWJlciA9IHVuZGVmaW5lZDtcclxuICB3aWR0aDpudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgY29sbGlzaW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuICBpZDpzdHJpbmc7XHJcbiAgZ2V0U3RhdGUoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5pZCA9IFwiXCIrY291bnRlcjtcclxuICAgIGNvdW50ZXIrKztcclxuICB9XHJcbiAgbG9hZCgpe1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgYS5zcmMgPSB0aGlzLnNwcml0ZV91cmw7XHJcbiAgICAgIGEub25sb2FkID0gKCgpPT57XHJcbiAgICAgICAgX3RoaXMuc3ByaXRlX3NoZWV0ID0gYTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aF9ib3goYTpjb2xsaXNpb25fYm94KTpib29sZWFue1xyXG4gICAgXHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGlmKHN0LnBvc2l0aW9uLnggPj0gYS54ICYmIHN0LnBvc2l0aW9uLnggPD0gKGEueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKGEueCA+IHN0LnBvc2l0aW9uLnggJiYgYS54IDwgKHN0LnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdC5wb3NpdGlvbi55ID49IGEueSAmJiBzdC5wb3NpdGlvbi55IDw9IChhLnkgKyBhLmhlaWdodCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoYS55ID4gc3QucG9zaXRpb24ueSAmJiBhLnkgPCAoc3QucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhoY29sbGlkZXMgKyBcIiBcIiArIHZjb2xsaWRlcyk7XHJcbiAgICByZXR1cm4gaGNvbGxpZGVzICYmIHZjb2xsaWRlcztcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aChhOm9iajx1bmtub3duPik6Ym9vbGVhbntcclxuICAgIGxldCBzdCA9IHRoaXMuc3RhdGUgYXMgdW5rbm93biBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgc3RfMiA9IGEuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGhjb2xsaWRlcyA9IGZhbHNlLCB2Y29sbGlkZXMgPSBmYWxzZTtcclxuICAgIGlmKHN0LnBvc2l0aW9uLnggPiBzdF8yLnBvc2l0aW9uLnggJiYgc3QucG9zaXRpb24ueCA8IChzdF8yLnBvc2l0aW9uLnggKyBhLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdF8yLnBvc2l0aW9uLnggPiBzdC5wb3NpdGlvbi54ICYmIHN0XzIucG9zaXRpb24ueCA8IChzdC5wb3NpdGlvbi54ICsgYS53aWR0aCkpe1xyXG4gICAgICBoY29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3QucG9zaXRpb24ueSA+IHN0XzIucG9zaXRpb24ueSAmJiBzdC5wb3NpdGlvbi55IDwgKHN0XzIucG9zaXRpb24ueSArIGEud2lkdGgpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0XzIucG9zaXRpb24ueSA+IHN0LnBvc2l0aW9uLnkgJiYgc3RfMi5wb3NpdGlvbi55IDwgKHN0LnBvc2l0aW9uLnkgKyBhLndpZHRoKSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKHZjb2xsaWRlcyk7XHJcbiAgICByZXR1cm4gaGNvbGxpZGVzICYmIHZjb2xsaWRlcztcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOm51bWJlcik6c3ByaXRle1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBzcHJpdGVfaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcbiAgICBsZXQgc3ByaXRlX3dpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGlmKHRoaXMuaGVpZ2h0ID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHNwcml0ZV9oZWlnaHQgPSB0aGlzLnNwcml0ZV9zaGVldC5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLndpZHRoID09IHVuZGVmaW5lZCl7XHJcbiAgICAgIHNwcml0ZV93aWR0aCA9IHRoaXMuc3ByaXRlX3NoZWV0LndpZHRoO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OnRoaXMuc3ByaXRlX3NoZWV0LFxyXG4gICAgICBsZWZ0OjAsXHJcbiAgICAgIHRvcDowLFxyXG4gICAgICBzcHJpdGVfd2lkdGgsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHRcclxuICAgIH07XHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBzdGF0aWNfb2Jqe1xyXG4gIHNwcml0ZV91cmwgPSBcIlwiO1xyXG4gIHNwcml0ZTpIVE1MSW1hZ2VFbGVtZW50O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZ3Jhdml0eV9vYmo8VD4gZXh0ZW5kcyBvYmo8VD57XHJcbiAgZ3Jhdml0eSA9IHRydWVcclxufSIsImltcG9ydCB7IGdyYXZpdHlfb2JqLG9iaiB9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQgeyBzcHJpdGUgfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHsgb2JqX3N0YXRlIH0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHsgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrIH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlfZ3Jhdml0eShvYjpncmF2aXR5X29iajx1bmtub3duPixncmF2X2NvbnN0Om51bWJlciwgZ3Jhdl9tYXg6bnVtYmVyKXtcclxuICBsZXQgc3QgPSBvYi5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgaWYob2IuZ3Jhdml0eSAmJiBzdC52ZWxvY2l0eS55ID4gZ3Jhdl9tYXgpe1xyXG4gICAgc3QudmVsb2NpdHkueSArPSBncmF2X2NvbnN0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHJvb208VD57XHJcbiAgYmFja2dyb3VuZF91cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgYmFja2dyb3VuZDogSFRNTEltYWdlRWxlbWVudDtcclxuICBvYmplY3RzOiBBcnJheTxvYmo8dW5rbm93bj4+XHJcbiAgc3RhdGU6IFRcclxuICBsb2FkKCkge1xyXG4gICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGxldCB0b19hd2FpdCA9IHRoaXMub2JqZWN0cy5tYXAoKGEpID0+IGEubG9hZCgpKTtcclxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodG9fYXdhaXQpO1xyXG4gICAgICBhLnNyYyA9IHRoaXMuYmFja2dyb3VuZF91cmw7XHJcbiAgICAgIGEub25lcnJvciA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBsb2FkaW5nIHVybDpcIiArIHRoaXMuYmFja2dyb3VuZF91cmwpO1xyXG4gICAgICB9KVxyXG4gICAgICBhLm9ubG9hZCA9ICgoKSA9PiB7XHJcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIHJlZ2lzdGVyX2NvbnRyb2xzKCl7XHJcblxyXG4gIH1cclxuICBjbGVhbnVwKCl7XHJcblxyXG4gIH1cclxuICBzdGF0ZWYodGltZTogbnVtYmVyKSB7XHJcbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKykge1xyXG4gICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRPYmooaWQ6c3RyaW5nKXtcclxuICAgIGZvcihsZXQgYSA9IDA7IGEgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspe1xyXG4gICAgICBpZih0aGlzLm9iamVjdHNbYV0uaWQgPT0gaWQpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9iamVjdHNbYV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgcmVuZGVyZih0aW1lOiBudW1iZXIpOiBzcHJpdGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3ByaXRlX3NoZWV0OiB0aGlzLmJhY2tncm91bmQsXHJcbiAgICAgIGxlZnQ6IDAsXHJcbiAgICAgIHRvcDogMCxcclxuICAgICAgc3ByaXRlX2hlaWdodDogdGhpcy5iYWNrZ3JvdW5kLmhlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoOiB0aGlzLmJhY2tncm91bmQud2lkdGhcclxuICAgIH1cclxuICB9XHJcbn0iLCJleHBvcnQgaW50ZXJmYWNlIHNwcml0ZXtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxcclxuICBsZWZ0Om51bWJlcixcclxuICB0b3A6bnVtYmVyLFxyXG4gIHNwcml0ZV93aWR0aDpudW1iZXIsXHJcbiAgc3ByaXRlX2hlaWdodDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcml0ZV9nZW4oc3ByaXRlX3NoZWV0OkhUTUxJbWFnZUVsZW1lbnQsc3ByaXRlX3dpZHRoOm51bWJlcixzcHJpdGVfaGVpZ2h0Om51bWJlcik6QXJyYXk8c3ByaXRlPntcclxuICBsZXQgd2lkdGggPSBzcHJpdGVfc2hlZXQud2lkdGg7XHJcbiAgbGV0IHNwcml0ZXM6QXJyYXk8c3ByaXRlPiA9IFtdO1xyXG4gIGZvcihsZXQgYSA9IDA7IGEgPCB3aWR0aDthICs9IHNwcml0ZV93aWR0aCl7XHJcbiAgICBzcHJpdGVzLnB1c2goe1xyXG4gICAgICBzcHJpdGVfc2hlZXQsXHJcbiAgICAgIGxlZnQ6YSxcclxuICAgICAgdG9wOjAsXHJcbiAgICAgIHNwcml0ZV9oZWlnaHQsXHJcbiAgICAgIHNwcml0ZV93aWR0aFxyXG4gICAgfSlcclxuICB9XHJcbiAgcmV0dXJuIHNwcml0ZXM7XHJcbn0iLCJpbXBvcnQge29ian0gZnJvbSBcIi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi9nYW1lL3Jvb21zL292ZXJ3b3JsZFwiO1xyXG5cclxubGV0IGNhbnZhc19lbGVtZW50OkhUTUxDYW52YXNFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXJnZXRcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbmxldCBjb250ZXh0OkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9IGNhbnZhc19lbGVtZW50LmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcbmxldCB2aGVpZ2h0ID0gMTAwMDtcclxubGV0IHZ3aWR0aCA9IDEwMDA7XHJcblxyXG4vL0hvdyBvZnRlbiB0aGUgZ2FtZSBsb2dpYyBsb29wIHNob3VsZCBydW4sIGluIG1pbGxpc2Vjb25kc1xyXG5sZXQgbG9naWNfbG9vcF9pbnRlcnZhbDpudW1iZXIgPSAxMDAwLzYwOyAgXHJcblxyXG5sZXQgbGFzdF90aW1lID0gbmV3IERhdGUoKTtcclxuXHJcbmxldCBSb29tID0gT3ZlcndvcmxkO1xyXG5sZXQgY3Vycl9yb29tID0gbmV3IFJvb20oKTtcclxuc2V0SW50ZXJ2YWwoKCk9PntcclxuICBsZXQgbmV3X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gIGxldCB0aW1lX3NpbmNlID0gbmV3X3RpbWUuZ2V0VGltZSgpIC0gbGFzdF90aW1lLmdldFRpbWUoKTtcclxuICBsYXN0X3RpbWUgPSBuZXdfdGltZTtcclxuICBjdXJyX3Jvb20uc3RhdGVmKG5ld190aW1lLmdldFRpbWUoKSk7XHJcbn0sbG9naWNfbG9vcF9pbnRlcnZhbCk7XHJcblxyXG5jb25zdCByZW5kZXJlciA9IChzcHJpdGU6c3ByaXRlLHg6bnVtYmVyLHk6bnVtYmVyLHNjYWxpbmc6bnVtYmVyKSA9PiB7XHJcbiAgbGV0IGZpbmFsX3ggPSB4O1xyXG4gIGxldCBmaW5hbF95ID0gdmhlaWdodCAtIHkgLSBzcHJpdGUuc3ByaXRlX2hlaWdodDtcclxuICBsZXQgaGVpZ2h0ID0gc3ByaXRlLnNwcml0ZV9oZWlnaHQgKiBzY2FsaW5nO1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZS5zcHJpdGVfd2lkdGggKiBzY2FsaW5nO1xyXG4gIGNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgc3ByaXRlLnNwcml0ZV9zaGVldCxcclxuICAgIHNwcml0ZS5sZWZ0LFxyXG4gICAgc3ByaXRlLnRvcCxcclxuICAgIHNwcml0ZS5zcHJpdGVfd2lkdGgsXHJcbiAgICBzcHJpdGUuc3ByaXRlX2hlaWdodCxcclxuICAgIGZpbmFsX3gsXHJcbiAgICBmaW5hbF95LFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHRcclxuICApXHJcbn1cclxuXHJcbmNvbnN0IHJlbmRlckxvb3AgPSAodDpudW1iZXIpPT57XHJcbiAgY29udGV4dC5jbGVhclJlY3QoMCwwLHZ3aWR0aCx2aGVpZ2h0KTtcclxuICBsZXQgb2JqZWN0X3RvX3JlbmRlciA9IGN1cnJfcm9vbS5vYmplY3RzO1xyXG4gIHJlbmRlcmVyKGN1cnJfcm9vbS5yZW5kZXJmKHQpLDAsMCwxKTtcclxuICBsZXQgaW5kZXggPSAwO1xyXG4gIGZvciAobGV0IGEgb2Ygb2JqZWN0X3RvX3JlbmRlcil7XHJcbiAgICByZW5kZXJlcihhLnJlbmRlcmYodCksYS5zdGF0ZS5wb3NpdGlvbi54LGEuc3RhdGUucG9zaXRpb24ueSwxKTtcclxuICAgIGluZGV4Kys7XHJcbiAgfVxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJMb29wKSBcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGUpPT57XHJcbiAgY29uc29sZS5sb2coZSk7XHJcbn0pXHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCl7XHJcbiAgYXdhaXQgY3Vycl9yb29tLmxvYWQoKTtcclxuICBjdXJyX3Jvb20ucmVnaXN0ZXJfY29udHJvbHMoKTtcclxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyTG9vcCk7XHJcbn1cclxuXHJcblxyXG5cclxubWFpbigpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9