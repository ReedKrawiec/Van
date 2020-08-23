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
const van_1 = __webpack_require__(/*! ../../van */ "./src/van.ts");
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
        this.bindControl("Mouse1", () => {
            this.state.velocity.x = 0;
            this.state.velocity.y = 0;
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
        else if (van_1.GetCurrentRoom().check_collisions({
            x: this.state.position.x,
            y: this.state.position.y - 1,
            width: this.width,
            height: 1
        }).length > 0) {
            let left_fall_box = {
                x: this.state.position.x - this.width - 3,
                y: this.state.position.y - this.height,
                height: this.height,
                width: this.width
            };
            let left_wall_box = {
                x: this.state.position.x - 3,
                y: this.state.position.y,
                height: this.height,
                width: 3
            };
            let right_fall_box = {
                x: this.state.position.x + this.width + 3,
                y: this.state.position.y - this.height,
                height: this.height,
                width: this.width
            };
            let right_wall_box = {
                x: this.state.position.x + this.width,
                y: this.state.position.y,
                height: this.height,
                width: 3
            };
            if (this.state.direction == direction.right) {
                this.state.velocity.x = 3;
                if (van_1.GetCurrentRoom().check_collisions(right_fall_box).length == 0 || van_1.GetCurrentRoom().check_collisions(right_wall_box).length > 0) {
                    this.state.direction = direction.left;
                }
            }
            else if (this.state.direction == direction.left) {
                this.state.velocity.x = -3;
                if (van_1.GetCurrentRoom().check_collisions(left_fall_box).length == 0 || van_1.GetCurrentRoom().check_collisions(left_wall_box).length > 0) {
                    this.state.direction = direction.right;
                }
            }
        }
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
class Overworld extends room_1.room {
    constructor() {
        super();
        this.background_url = "https://img.wallpapersafari.com/desktop/1920/1080/8/51/imD41l.jpg";
        this.objects = [new box_1.Box(500, 0, "box"), new goomba_1.Goomba(800, 800, "player"), new goomba_1.StandingGoomba(801, 900) /*,new StandingGoomba(801,1000),new StandingGoomba(801,1100),new StandingGoomba(801,1200)*/];
        this.state = {
            player: undefined
        };
    }
    register_controls() {
        this.bindControl("Mouse1", () => __awaiter(this, void 0, void 0, function* () {
            let mouse_pos = controls_1.Poll_Mouse();
            let b = new box_1.Box(mouse_pos.x, mouse_pos.y);
            if (this.check_collisions({
                x: mouse_pos.x,
                y: mouse_pos.y,
                width: b.width,
                height: b.height
            }).length == 0) {
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
exports.velocity_collision_check = exports.check_collisions = exports.check_all_collisions = void 0;
const object_1 = __webpack_require__(/*! ../lib/object */ "./src/lib/object.ts");
var direction;
(function (direction) {
    direction[direction["left"] = 0] = "left";
    direction[direction["right"] = 1] = "right";
    direction[direction["up"] = 2] = "up";
    direction[direction["down"] = 3] = "down";
})(direction || (direction = {}));
function check_all_collisions(c, objs, exemption) {
    let matched = [];
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            matched.push(a.id);
        }
    }
    return matched;
}
exports.check_all_collisions = check_all_collisions;
//Checks up to the first collision
function check_collisions(c, objs, exemption) {
    for (let a of objs) {
        if (a.id !== exemption && a.collision && a.collides_with_box(c)) {
            return a.id;
        }
    }
    return undefined;
}
exports.check_collisions = check_collisions;
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
exports.Bind = exports.Poll_Mouse = void 0;
const van_1 = __webpack_require__(/*! ../van */ "./src/van.ts");
window.addEventListener("click", (e) => {
    let dimen = van_1.GetScreenDimensions();
    let box = {
        x: e.clientX,
        y: dimen.height - e.clientY,
        height: 1,
        width: 1
    };
    if ("Mouse1" in mouseBinds) {
        for (let a = 0; a < mouseBinds["Mouse1"].length; a++) {
            console.log(mouseBinds["Mouse1"][a]);
            if (mouseBinds["Mouse1"][a][1] !== undefined) {
                if (mouseBinds["Mouse1"][a][1].collides_with_box(box)) {
                    mouseBinds["Mouse1"][a][0]();
                }
            }
            else {
                mouseBinds["Mouse1"][a][0]();
            }
        }
    }
});
window.addEventListener("keydown", (e) => {
    if (e.code in binds) {
        for (let a = 0; a < binds[e.code].length; a++) {
            binds[e.code][a]();
        }
    }
});
window.addEventListener("mousemove", (e) => {
    last_x = x;
    last_y = y;
    x = e.clientX;
    y = e.clientY;
});
let x = 0;
let y = 0;
let last_x = 0;
let last_y = 0;
let binds = {};
let mouseBinds = {};
function Poll_Mouse() {
    let height = van_1.GetScreenDimensions().height;
    return ({
        x,
        y: height - y,
        last: {
            x: last_x,
            y: height - last_y
        }
    });
}
exports.Poll_Mouse = Poll_Mouse;
function Bind(keyname, func, object) {
    if (keyname.slice(0, 5) !== "Mouse") {
        if (binds[keyname] == undefined) {
            binds[keyname] = [];
        }
        binds[keyname].push(func);
    }
    else {
        if (mouseBinds[keyname] == undefined) {
            mouseBinds[keyname] = [];
        }
        mouseBinds[keyname].push([func, object]);
    }
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
        this.id = "" + counter;
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
            controls_1.Bind(key, func, this);
        }
        else {
            controls_1.Bind(key, func);
        }
    }
    register_controls() {
    }
    delete() {
        van_1.GetCurrentRoom().deleteItem(this.id);
    }
    collision_check(a) {
        if (this.collision) {
            let room = van_1.GetCurrentRoom();
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
        if (van_1.DEBUG)
            van_1.render_collision_box(box);
        return collision_1.check_all_collisions(box, this.objects, exempt);
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
exports.loadRoom = exports.render_collision_box = exports.GetCurrentRoom = exports.GetScreenDimensions = exports.DEBUG = void 0;
exports.DEBUG = true;
const overworld_1 = __webpack_require__(/*! ./game/rooms/overworld */ "./src/game/rooms/overworld.ts");
let canvas_element = document.getElementById("target");
let context = canvas_element.getContext("2d");
let vheight = 1000;
let vwidth = 1800;
//How often the game logic loop should run, in milliseconds
let logic_loop_interval = 1000 / 60;
let last_time = new Date();
function GetScreenDimensions() {
    return ({
        height: vheight,
        width: vwidth
    });
}
exports.GetScreenDimensions = GetScreenDimensions;
function GetCurrentRoom() {
    return curr_room;
}
exports.GetCurrentRoom = GetCurrentRoom;
exports.render_collision_box = (a) => {
    boxes.push(a);
};
let boxes = [];
let curr_room;
let logic;
const start_logic = (a) => {
    return setInterval(() => {
        let new_time = new Date();
        let time_since = new_time.getTime() - last_time.getTime();
        last_time = new_time;
        curr_room.statef(new_time.getTime());
    }, a);
};
const renderer = (sprite, x, y, scaling) => {
    let final_x = x * scaling;
    let final_y = vheight - y - sprite.sprite_height * scaling;
    let height = sprite.sprite_height * scaling;
    let width = sprite.sprite_width * scaling;
    context.drawImage(sprite.sprite_sheet, sprite.left, sprite.top, sprite.sprite_width, sprite.sprite_height, final_x, final_y, width, height);
};
const renderLoop = (t) => {
    let scaling = 1;
    context.clearRect(0, 0, vwidth, vheight);
    let object_to_render = curr_room.objects;
    renderer(curr_room.renderf(t), 0, 0, scaling);
    let index = 0;
    for (let a of object_to_render) {
        let st = a.state;
        renderer(a.renderf(t), st.position.x, st.position.y, scaling);
        index++;
    }
    let box;
    while (box = boxes.pop()) {
        let x = box.x * scaling;
        let y = vheight - box.y - box.height * scaling;
        context.fillRect(x * scaling, y * scaling, box.width * scaling, box.height * scaling);
    }
    requestAnimationFrame(renderLoop);
};
function loadRoom(x) {
    return __awaiter(this, void 0, void 0, function* () {
        let new_room = yield x.load();
        x.register_controls();
        curr_room = x;
        if (logic != undefined) {
            clearInterval(logic);
        }
        main();
    });
}
exports.loadRoom = loadRoom;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        logic = start_logic(logic_loop_interval);
        requestAnimationFrame(renderLoop);
    });
}
loadRoom(new overworld_1.Overworld());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9ib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvb2JqZWN0cy9nb29tYmEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUvcm9vbXMvb3ZlcndvcmxkLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29sbGlzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvY29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYi9yb29tLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvc3ByaXRlLnRzIiwid2VicGFjazovLy8uL3NyYy92YW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSxvRkFB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UUFDekMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUFBO0FBRUQsUUFBUSxDQUFDLElBQUkscUJBQVMsRUFBRSxDQUFDLENBQUMiLCJmaWxlIjoidmFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmFuLnRzXCIpO1xuIiwiaW1wb3J0IHtncmF2aXR5X29ian0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtvYmpfc3RhdGV9IGZyb20gXCIuLi8uLi9saWIvc3RhdGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBncmF2aXR5X29iajxvYmpfc3RhdGU+e1xyXG4gIHNwcml0ZV91cmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Qvc3JjL2dhbWUvb2JqZWN0cy9ib3gucG5nXCJcclxuICBjb2xsaXNpb24gPSB0cnVlXHJcbiAgaGVpZ2h0ID0gNjQ7XHJcbiAgd2lkdGggPSA1MDA7XHJcbiAgZ3Jhdml0eSA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKHg6bnVtYmVyLCB5Om51bWJlciwgaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCAhPSB1bmRlZmluZWQpe1xyXG4gICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBwb3NpdGlvbjp7XHJcbiAgICAgICAgeCxcclxuICAgICAgICB5XHJcbiAgICAgIH0sXHJcbiAgICAgIHZlbG9jaXR5OntcclxuICAgICAgICB4OjAsXHJcbiAgICAgICAgeTowXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIiwoKT0+e1xyXG4gICAgICB0aGlzLmRlbGV0ZSgpO1xyXG4gICAgfSlcclxuICB9XHJcbn0iLCJpbXBvcnQge3ZlbG9jaXR5LG9ial9zdGF0ZSxzdGF0ZV9mdW5jfSBmcm9tIFwiLi4vLi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7c3ByaXRlLHNwcml0ZV9nZW59IGZyb20gXCIuLi8uLi9saWIvc3ByaXRlXCI7XHJcbmltcG9ydCB7Z3Jhdml0eV9vYmosb2JqfSBmcm9tIFwiLi4vLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge1BvbGxfTW91c2V9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuaW1wb3J0IHtjb2xsaXNpb25fYm94fSBmcm9tIFwiLi4vLi4vbGliL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge0JpbmR9IGZyb20gXCIuLi8uLi9saWIvY29udHJvbHNcIjtcclxuXHJcbmltcG9ydCB7T3ZlcndvcmxkfSBmcm9tIFwiLi4vcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7bG9hZFJvb20sR2V0Q3VycmVudFJvb219IGZyb20gXCIuLi8uLi92YW5cIjtcclxuXHJcbmVudW0gZGlyZWN0aW9ue1xyXG4gIGxlZnQsXHJcbiAgcmlnaHRcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBnb29tYmFfc3RhdGUgZXh0ZW5kcyBvYmpfc3RhdGV7XHJcbiAgZGlyZWN0aW9uOiBkaXJlY3Rpb24sXHJcbiAgdmVsb2NpdHk6dmVsb2NpdHksXHJcbiAgc2VsZWN0ZWQ6Ym9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgR29vbWJhIGV4dGVuZHMgZ3Jhdml0eV9vYmo8Z29vbWJhX3N0YXRlPntcclxuICBzcHJpdGVfdXJsID0gXCJodHRwOi8vbG9jYWxob3N0L3NyYy9nYW1lL29iamVjdHMvZ29vbWJhLnBuZ1wiO1xyXG4gIGhlaWdodCA9IDY0O1xyXG4gIHdpZHRoID0gNjQ7XHJcbiAgY29sbGlzaW9uID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3Rvcih4Om51bWJlcix5Om51bWJlcixpZDpzdHJpbmcgPSB1bmRlZmluZWQpe1xyXG4gICAgc3VwZXIoKTtcclxuICAgIGlmKGlkICE9IHVuZGVmaW5lZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGRpcmVjdGlvbjpkaXJlY3Rpb24ubGVmdCxcclxuICAgICAgcG9zaXRpb246e1xyXG4gICAgICAgIHgsXHJcbiAgICAgICAgeVxyXG4gICAgICB9LFxyXG4gICAgICB2ZWxvY2l0eTp7XHJcbiAgICAgICAgeDowLFxyXG4gICAgICAgIHk6MFxyXG4gICAgICB9LFxyXG4gICAgICBzZWxlY3RlZDpmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxuICByZW5kZXJmKHQ6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gc3ByaXRlX2dlbih0aGlzLnNwcml0ZV9zaGVldCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KTtcclxuICAgIGlmKE1hdGguZmxvb3IodC8yNTApICUgMiA9PSAwKXtcclxuICAgICAgcmV0dXJuIHNwcml0ZXNbMF07XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gc3ByaXRlc1sxXTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIiwoKT0+e1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAwO1xyXG4gICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gIXRoaXMuc3RhdGUuc2VsZWN0ZWQ7XHJcbiAgICAgIHRoaXMuZ3Jhdml0eSA9ICF0aGlzLmdyYXZpdHk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICAgIGlmKHRoaXMuc3RhdGUuc2VsZWN0ZWQpe1xyXG4gICAgICBsZXQgbW91c2VfcG9zaXRpb24gPSBQb2xsX01vdXNlKCk7XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPiBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCxcclxuICAgICAgICAgIHdpZHRoOnRoaXMud2lkdGgsXHJcbiAgICAgICAgICBoZWlnaHQ6MVxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueSA9IG1vdXNlX3Bvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmKG1vdXNlX3Bvc2l0aW9uLnkgPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lnkpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54LFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgLSAxLFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKG1vdXNlX3Bvc2l0aW9uLnggPCBtb3VzZV9wb3NpdGlvbi5sYXN0Lngpe1xyXG4gICAgICAgIGlmKHRoaXMuY29sbGlzaW9uX2NoZWNrKHtcclxuICAgICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gMSxcclxuICAgICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgICAgd2lkdGg6MSxcclxuICAgICAgICAgIGhlaWdodDp0aGlzLmhlaWdodFxyXG4gICAgICAgIH0pLmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUucG9zaXRpb24ueCA9IG1vdXNlX3Bvc2l0aW9uLnggLSB0aGlzLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueCA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoR2V0Q3VycmVudFJvb20oKS5jaGVja19jb2xsaXNpb25zKHtcclxuICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55IC0gMSxcclxuICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgaGVpZ2h0OjFcclxuICAgIH0pLmxlbmd0aCA+IDApe1xyXG4gICAgICBsZXQgbGVmdF9mYWxsX2JveDpjb2xsaXNpb25fYm94ID0ge1xyXG4gICAgICAgIHg6dGhpcy5zdGF0ZS5wb3NpdGlvbi54IC0gdGhpcy53aWR0aCAtIDMsXHJcbiAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodCxcclxuICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHQsXHJcbiAgICAgICAgd2lkdGg6dGhpcy53aWR0aFxyXG4gICAgICB9XHJcbiAgICAgIGxldCBsZWZ0X3dhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAzLFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDozXHJcbiAgICAgIH1cclxuICAgICAgbGV0IHJpZ2h0X2ZhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoICsgMyxcclxuICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDp0aGlzLndpZHRoXHJcbiAgICAgIH1cclxuICAgICAgbGV0IHJpZ2h0X3dhbGxfYm94OmNvbGxpc2lvbl9ib3ggPSB7XHJcbiAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLFxyXG4gICAgICAgIHk6dGhpcy5zdGF0ZS5wb3NpdGlvbi55LFxyXG4gICAgICAgIGhlaWdodDp0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDozXHJcbiAgICAgIH1cclxuICAgICAgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgICB0aGlzLnN0YXRlLnZlbG9jaXR5LnggPSAzO1xyXG4gICAgICAgIGlmKEdldEN1cnJlbnRSb29tKCkuY2hlY2tfY29sbGlzaW9ucyhyaWdodF9mYWxsX2JveCkubGVuZ3RoID09IDAgfHwgR2V0Q3VycmVudFJvb20oKS5jaGVja19jb2xsaXNpb25zKHJpZ2h0X3dhbGxfYm94KS5sZW5ndGggPiAwKXtcclxuICAgICAgICAgIHRoaXMuc3RhdGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYodGhpcy5zdGF0ZS5kaXJlY3Rpb24gPT0gZGlyZWN0aW9uLmxlZnQpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUudmVsb2NpdHkueCA9IC0zO1xyXG4gICAgICAgIGlmKEdldEN1cnJlbnRSb29tKCkuY2hlY2tfY29sbGlzaW9ucyhsZWZ0X2ZhbGxfYm94KS5sZW5ndGggPT0gMCB8fCBHZXRDdXJyZW50Um9vbSgpLmNoZWNrX2NvbGxpc2lvbnMobGVmdF93YWxsX2JveCkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbi5yaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdGFuZGluZ0dvb21iYSBleHRlbmRzIGdyYXZpdHlfb2JqPGdvb21iYV9zdGF0ZT57XHJcbiAgc3ByaXRlX3VybCA9IFwiaHR0cDovL2xvY2FsaG9zdC9zcmMvZ2FtZS9vYmplY3RzL2dvb21iYS5wbmdcIjtcclxuICBoZWlnaHQgPSA2NDtcclxuICB3aWR0aCA9IDY0O1xyXG4gIGNvbGxpc2lvbiA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoeDpudW1iZXIseTpudW1iZXIsaWQ6c3RyaW5nID0gdW5kZWZpbmVkKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBpZihpZCl7XHJcbiAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH0gICAgXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkaXJlY3Rpb246ZGlyZWN0aW9uLmxlZnQsXHJcbiAgICAgIHBvc2l0aW9uOntcclxuICAgICAgICB4LFxyXG4gICAgICAgIHlcclxuICAgICAgfSxcclxuICAgICAgdmVsb2NpdHk6e1xyXG4gICAgICAgIHg6MCxcclxuICAgICAgICB5OjBcclxuICAgICAgfSxcclxuICAgICAgc2VsZWN0ZWQ6ZmFsc2VcclxuICAgIH1cclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIiwoKT0+e1xyXG4gICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gIXRoaXMuc3RhdGUuc2VsZWN0ZWQ7XHJcbiAgICAgIHRoaXMuZ3Jhdml0eSA9ICF0aGlzLmdyYXZpdHk7XHJcbiAgICB9KVxyXG4gIH1cclxuICBzdGF0ZWYodGltZTpudW1iZXIpe1xyXG4gICAgaWYodGhpcy5zdGF0ZS5zZWxlY3RlZCl7XHJcbiAgICAgIGxldCBtb3VzZV9wb3NpdGlvbiA9IFBvbGxfTW91c2UoKTtcclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueSA+IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0LFxyXG4gICAgICAgICAgd2lkdGg6dGhpcy53aWR0aCxcclxuICAgICAgICAgIGhlaWdodDoxXHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi55ID0gbW91c2VfcG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYobW91c2VfcG9zaXRpb24ueSA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueSl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLngsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSAtIDEsXHJcbiAgICAgICAgICB3aWR0aDp0aGlzLndpZHRoLFxyXG4gICAgICAgICAgaGVpZ2h0OjFcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnkgPSBtb3VzZV9wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYobW91c2VfcG9zaXRpb24ueCA8IG1vdXNlX3Bvc2l0aW9uLmxhc3QueCl7XHJcbiAgICAgICAgaWYodGhpcy5jb2xsaXNpb25fY2hlY2soe1xyXG4gICAgICAgICAgeDp0aGlzLnN0YXRlLnBvc2l0aW9uLnggLSAxLFxyXG4gICAgICAgICAgeTp0aGlzLnN0YXRlLnBvc2l0aW9uLnksXHJcbiAgICAgICAgICB3aWR0aDoxLFxyXG4gICAgICAgICAgaGVpZ2h0OnRoaXMuaGVpZ2h0XHJcbiAgICAgICAgfSkubGVuZ3RoID09IDApe1xyXG4gICAgICAgICAgdGhpcy5zdGF0ZS5wb3NpdGlvbi54ID0gbW91c2VfcG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihtb3VzZV9wb3NpdGlvbi54ID4gbW91c2VfcG9zaXRpb24ubGFzdC54KXtcclxuICAgICAgICBpZih0aGlzLmNvbGxpc2lvbl9jaGVjayh7XHJcbiAgICAgICAgICB4OnRoaXMuc3RhdGUucG9zaXRpb24ueCArIHRoaXMud2lkdGgsXHJcbiAgICAgICAgICB5OnRoaXMuc3RhdGUucG9zaXRpb24ueSxcclxuICAgICAgICAgIHdpZHRoOjEsXHJcbiAgICAgICAgICBoZWlnaHQ6dGhpcy5oZWlnaHRcclxuICAgICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgICB0aGlzLnN0YXRlLnBvc2l0aW9uLnggPSBtb3VzZV9wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtyb29tLGFwcGx5X2dyYXZpdHl9IGZyb20gXCIuLi8uLi9saWIvcm9vbVwiO1xyXG5pbXBvcnQge1N0YW5kaW5nR29vbWJhLEdvb21iYSwgZ29vbWJhX3N0YXRlfSBmcm9tIFwiLi4vb2JqZWN0cy9nb29tYmFcIjtcclxuaW1wb3J0IHtCb3h9IGZyb20gXCIuLi9vYmplY3RzL2JveFwiOyBcclxuaW1wb3J0IHt2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2t9IGZyb20gXCIuLi8uLi9saWIvY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7IGdyYXZpdHlfb2JqIH0gZnJvbSBcIi4uLy4uL2xpYi9vYmplY3RcIjtcclxuaW1wb3J0IHtQb2xsX01vdXNlfSBmcm9tIFwiLi4vLi4vbGliL2NvbnRyb2xzXCI7XHJcblxyXG5pbnRlcmZhY2Ugb3ZlcndvcmxkX2l7XHJcbiAgcGxheWVyOmdyYXZpdHlfb2JqPHVua25vd24+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBPdmVyd29ybGQgZXh0ZW5kcyByb29tPG92ZXJ3b3JsZF9pPntcclxuICBiYWNrZ3JvdW5kX3VybD1cImh0dHBzOi8vaW1nLndhbGxwYXBlcnNhZmFyaS5jb20vZGVza3RvcC8xOTIwLzEwODAvOC81MS9pbUQ0MWwuanBnXCI7XHJcbiAgb2JqZWN0cyA9IFtuZXcgQm94KDUwMCwwLFwiYm94XCIpLG5ldyBHb29tYmEoODAwLDgwMCxcInBsYXllclwiKSxuZXcgU3RhbmRpbmdHb29tYmEoODAxLDkwMCkvKixuZXcgU3RhbmRpbmdHb29tYmEoODAxLDEwMDApLG5ldyBTdGFuZGluZ0dvb21iYSg4MDEsMTEwMCksbmV3IFN0YW5kaW5nR29vbWJhKDgwMSwxMjAwKSovXVxyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgcGxheWVyOnVuZGVmaW5lZFxyXG4gICAgfTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuICAgIHRoaXMuYmluZENvbnRyb2woXCJNb3VzZTFcIixhc3luYyAoKT0+e1xyXG4gICAgICBsZXQgbW91c2VfcG9zID0gUG9sbF9Nb3VzZSgpO1xyXG4gICAgICBsZXQgYiA9IG5ldyBCb3gobW91c2VfcG9zLngsbW91c2VfcG9zLnkpO1xyXG4gICAgICBpZih0aGlzLmNoZWNrX2NvbGxpc2lvbnMoe1xyXG4gICAgICAgIHg6bW91c2VfcG9zLngsXHJcbiAgICAgICAgeTptb3VzZV9wb3MueSxcclxuICAgICAgICB3aWR0aDpiLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDpiLmhlaWdodFxyXG4gICAgICB9KS5sZW5ndGggPT0gMCl7XHJcbiAgICAgICAgYXdhaXQgYi5sb2FkKCk7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnVuc2hpZnQoYik7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOm51bWJlcil7XHJcbiAgICBmb3IobGV0IGEgPSAwO2EgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBhKyspe1xyXG4gICAgICBhcHBseV9ncmF2aXR5KHRoaXMub2JqZWN0c1thXSwtLjUsLTE1KTtcclxuICAgICAgdmVsb2NpdHlfY29sbGlzaW9uX2NoZWNrKHRoaXMub2JqZWN0c1thXSx0aGlzLm9iamVjdHMpO1xyXG4gICAgICB0aGlzLm9iamVjdHNbYV0uc3RhdGVmKHRpbWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8sIG5ldyBCb3goMCwwKSIsImltcG9ydCB7b2JqLGdldElkfSBmcm9tIFwiLi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4uL2xpYi9zdGF0ZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb2xsaXNpb25fYm94e1xyXG4gIHg6bnVtYmVyO1xyXG4gIHk6bnVtYmVyO1xyXG4gIHdpZHRoOm51bWJlcjtcclxuICBoZWlnaHQ6bnVtYmVyO1xyXG59XHJcblxyXG5lbnVtIGRpcmVjdGlvbntcclxuICBsZWZ0LFxyXG4gIHJpZ2h0LFxyXG4gIHVwLFxyXG4gIGRvd25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2FsbF9jb2xsaXNpb25zKGM6IGNvbGxpc2lvbl9ib3gsb2JqczpBcnJheTxvYmo8dW5rbm93bj4+LGV4ZW1wdGlvbjpzdHJpbmcpe1xyXG4gIGxldCBtYXRjaGVkID0gW107XHJcbiAgZm9yIChsZXQgYSBvZiBvYmpzKSB7XHJcbiAgICBpZiAoYS5pZCAhPT0gZXhlbXB0aW9uICYmIGEuY29sbGlzaW9uICYmIGEuY29sbGlkZXNfd2l0aF9ib3goYykpIHtcclxuICAgICAgbWF0Y2hlZC5wdXNoKGEuaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbWF0Y2hlZFxyXG59XHJcbi8vQ2hlY2tzIHVwIHRvIHRoZSBmaXJzdCBjb2xsaXNpb25cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrX2NvbGxpc2lvbnMoYzogY29sbGlzaW9uX2JveCwgb2JqczogQXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZykge1xyXG4gIGZvciAobGV0IGEgb2Ygb2Jqcykge1xyXG4gICAgaWYgKGEuaWQgIT09IGV4ZW1wdGlvbiAmJiBhLmNvbGxpc2lvbiAmJiBhLmNvbGxpZGVzX3dpdGhfYm94KGMpKSB7XHJcbiAgICAgIHJldHVybiBhLmlkO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiB2ZWxvY2l0eV9tYXgodmVsb2NpdHk6bnVtYmVyLGJveDpjb2xsaXNpb25fYm94LG9ianM6QXJyYXk8b2JqPHVua25vd24+PiwgZXhlbXB0aW9uOnN0cmluZyxkaXI6ZGlyZWN0aW9uKXtcclxuICBsZXQgY29sbGlzaW9uX2lkID0gY2hlY2tfY29sbGlzaW9ucyhib3gsIG9ianMsIGV4ZW1wdGlvbik7XHJcbiAgaWYoY29sbGlzaW9uX2lkID09IHVuZGVmaW5lZCl7XHJcbiAgICByZXR1cm4gdmVsb2NpdHk7XHJcbiAgfVxyXG4gIGVsc2V7XHJcbiAgICBsZXQgY29sbGlkZXIgPSBnZXRJZChvYmpzLGNvbGxpc2lvbl9pZCk7XHJcbiAgICBsZXQgb3JpZ2luID0gZ2V0SWQob2JqcyxleGVtcHRpb24pO1xyXG4gICAgbGV0IG9yaWdfc3QgPSBvcmlnaW4uc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IGNvbGxpZGVyX3N0ID0gY29sbGlkZXIuc3RhdGUgYXMgb2JqX3N0YXRlO1xyXG4gICAgaWYoZGlyID09IGRpcmVjdGlvbi5sZWZ0KXtcclxuICAgICAgcmV0dXJuIG9yaWdfc3QucG9zaXRpb24ueCAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi54ICsgY29sbGlkZXIud2lkdGgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihkaXIgPT0gZGlyZWN0aW9uLnJpZ2h0KXtcclxuICAgICAgcmV0dXJuIGNvbGxpZGVyX3N0LnBvc2l0aW9uLnggLSAob3JpZ19zdC5wb3NpdGlvbi54ICsgb3JpZ2luLndpZHRoKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi5kb3duKXtcclxuICAgICAgcmV0dXJuIG9yaWdfc3QucG9zaXRpb24ueSAtIChjb2xsaWRlcl9zdC5wb3NpdGlvbi55ICsgY29sbGlkZXIuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZGlyID09IGRpcmVjdGlvbi51cCl7XHJcbiAgICAgIHJldHVybiBjb2xsaWRlcl9zdC5wb3NpdGlvbi55IC0gKG9yaWdfc3QucG9zaXRpb24ueSArIG9yaWdpbi5oZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZlbG9jaXR5X2NvbGxpc2lvbl9jaGVjayhvYmplY3Q6b2JqPHVua25vd24+LGxpc3Q6QXJyYXk8b2JqPHVua25vd24+Pikge1xyXG4gIGxldCBvYiA9IG9iamVjdDtcclxuICBsZXQgc3QgPSBvYmplY3QuZ2V0U3RhdGUoKSBhcyBvYmpfc3RhdGU7XHJcbiAgbGV0IHhfdmVsID0gc3QudmVsb2NpdHkueDtcclxuICBsZXQgeV92ZWwgPSBzdC52ZWxvY2l0eS55O1xyXG4gIGlmICh4X3ZlbCA+IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLnggKyBvYi53aWR0aCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfTtcclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueCxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24ucmlnaHQpO1xyXG4gICAgaWYodmVsID4gMCl7XHJcbiAgICAgIHN0LnBvc2l0aW9uLnggKz0gdmVsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgc3QudmVsb2NpdHkueCA9IDA7ICBcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSBpZiAoeF92ZWwgPCAwKSB7XHJcbiAgICBsZXQgYm94ID0ge1xyXG4gICAgICB4OiB4X3ZlbCArIHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHN0LnBvc2l0aW9uLnksXHJcbiAgICAgIHdpZHRoOiAtMSAqIHhfdmVsLFxyXG4gICAgICBoZWlnaHQ6IG9iLmhlaWdodFxyXG4gICAgfVxyXG4gICAgbGV0IHZlbCA9IHZlbG9jaXR5X21heChzdC52ZWxvY2l0eS54LGJveCxsaXN0LG9iLmlkLGRpcmVjdGlvbi5sZWZ0KTtcclxuICAgIGlmKHZlbCA8IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi54ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnggPSAwOyBcclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHlfdmVsID4gMCkge1xyXG4gICAgbGV0IGJveCA9IHtcclxuICAgICAgeDogc3QucG9zaXRpb24ueCxcclxuICAgICAgeTogc3QucG9zaXRpb24ueSArIG9iLmhlaWdodCxcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IHlfdmVsXHJcbiAgICB9XHJcbiAgICBsZXQgdmVsID0gdmVsb2NpdHlfbWF4KHN0LnZlbG9jaXR5LnksYm94LGxpc3Qsb2IuaWQsZGlyZWN0aW9uLnVwKTtcclxuICAgIGlmKHZlbCA+IDApe1xyXG4gICAgICBzdC5wb3NpdGlvbi55ICs9IHZlbDtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHN0LnZlbG9jaXR5LnkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIGlmICh5X3ZlbCA8IDApIHtcclxuICAgIGxldCBib3ggPSB7XHJcbiAgICAgIHg6IHN0LnBvc2l0aW9uLngsXHJcbiAgICAgIHk6IHlfdmVsICsgc3QucG9zaXRpb24ueSxcclxuICAgICAgd2lkdGg6IG9iLndpZHRoLFxyXG4gICAgICBoZWlnaHQ6IC0xICogeV92ZWxcclxuICAgIH1cclxuICAgIGxldCB2ZWwgPSB2ZWxvY2l0eV9tYXgoc3QudmVsb2NpdHkueSxib3gsbGlzdCxvYi5pZCxkaXJlY3Rpb24uZG93bik7XHJcbiAgICBpZih2ZWwgPCAwKXtcclxuICAgICAgc3QucG9zaXRpb24ueSArPSB2ZWw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBzdC52ZWxvY2l0eS55ID0gMDtcclxuICAgIH1cclxuICB9XHJcbn0iLCJpbXBvcnQge0dldFNjcmVlbkRpbWVuc2lvbnN9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHsgY29sbGlzaW9uX2JveCB9IGZyb20gXCIuL2NvbGxpc2lvblwiO1xyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcblxyXG5pbnRlcmZhY2UgbW91c2VQb3N7XHJcbiAgeDpudW1iZXIsXHJcbiAgeTpudW1iZXIsXHJcbiAgbGFzdDp7XHJcbiAgICB4Om51bWJlcixcclxuICAgIHk6bnVtYmVyXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNvbnRyb2xfZnVuY3tcclxuICAoKTp2b2lkXHJcbn1cclxuXHJcbmludGVyZmFjZSBtb3VzZUJpbmRze1xyXG4gIFtrZXk6c3RyaW5nXTogQXJyYXk8W2NvbnRyb2xfZnVuYyxvYmo8dW5rbm93bj5dPlxyXG59XHJcblxyXG5pbnRlcmZhY2Uga2V5QmluZHN7XHJcbiAgW2tleTpzdHJpbmddOiBBcnJheTxjb250cm9sX2Z1bmM+XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwoZSk9PntcclxuICBsZXQgZGltZW4gPSBHZXRTY3JlZW5EaW1lbnNpb25zKCk7XHJcbiAgbGV0IGJveDpjb2xsaXNpb25fYm94ID0ge1xyXG4gICAgeDplLmNsaWVudFgsXHJcbiAgICB5OmRpbWVuLmhlaWdodCAtIGUuY2xpZW50WSxcclxuICAgIGhlaWdodDoxLFxyXG4gICAgd2lkdGg6MVxyXG4gIH07XHJcbiAgaWYoXCJNb3VzZTFcIiBpbiBtb3VzZUJpbmRzKXtcclxuICAgIGZvcihsZXQgYSA9IDA7YSA8IG1vdXNlQmluZHNbXCJNb3VzZTFcIl0ubGVuZ3RoO2ErKyl7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1vdXNlQmluZHNbXCJNb3VzZTFcIl1bYV0pO1xyXG4gICAgICBpZihtb3VzZUJpbmRzW1wiTW91c2UxXCJdW2FdWzFdICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGlmKG1vdXNlQmluZHNbXCJNb3VzZTFcIl1bYV1bMV0uY29sbGlkZXNfd2l0aF9ib3goYm94KSl7XHJcbiAgICAgICAgIG1vdXNlQmluZHNbXCJNb3VzZTFcIl1bYV1bMF0oKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZXtcclxuICAgICAgICBtb3VzZUJpbmRzW1wiTW91c2UxXCJdW2FdWzBdKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgXHJcbn0pXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwoZSk9PntcclxuICBpZihlLmNvZGUgaW4gYmluZHMpe1xyXG4gICAgZm9yKGxldCBhID0gMDthIDwgYmluZHNbZS5jb2RlXS5sZW5ndGg7YSsrKXtcclxuICAgICAgYmluZHNbZS5jb2RlXVthXSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsKGUpPT57XHJcbiAgbGFzdF94ID0geDtcclxuICBsYXN0X3kgPSB5O1xyXG4gIHggPSBlLmNsaWVudFg7XHJcbiAgeSA9IGUuY2xpZW50WTtcclxufSlcclxuXHJcbmxldCB4ID0gMDtcclxubGV0IHkgPSAwO1xyXG5sZXQgbGFzdF94ID0gMDtcclxubGV0IGxhc3RfeSA9IDA7XHJcbmxldCBiaW5kczprZXlCaW5kcyA9IHt9O1xyXG5sZXQgbW91c2VCaW5kczptb3VzZUJpbmRzID0ge307XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUG9sbF9Nb3VzZSgpOm1vdXNlUG9ze1xyXG4gIGxldCBoZWlnaHQgPSBHZXRTY3JlZW5EaW1lbnNpb25zKCkuaGVpZ2h0O1xyXG4gIHJldHVybiAoe1xyXG4gICAgeCxcclxuICAgIHk6IGhlaWdodCAtIHksXHJcbiAgICBsYXN0OntcclxuICAgICAgeDpsYXN0X3gsXHJcbiAgICAgIHk6IGhlaWdodCAtIGxhc3RfeVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBCaW5kKGtleW5hbWU6c3RyaW5nLGZ1bmM6Y29udHJvbF9mdW5jLG9iamVjdD86b2JqPHVua25vd24+KXtcclxuICBpZihrZXluYW1lLnNsaWNlKDAsNSkgIT09IFwiTW91c2VcIil7XHJcbiAgICBpZihiaW5kc1trZXluYW1lXSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICBiaW5kc1trZXluYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgYmluZHNba2V5bmFtZV0ucHVzaChmdW5jKTtcclxuICB9XHJcbiAgZWxzZXtcclxuICAgIGlmKG1vdXNlQmluZHNba2V5bmFtZV0gPT0gdW5kZWZpbmVkKXtcclxuICAgICAgbW91c2VCaW5kc1trZXluYW1lXSA9IFtdO1xyXG4gICAgfVxyXG4gICAgbW91c2VCaW5kc1trZXluYW1lXS5wdXNoKFtmdW5jLG9iamVjdF0pXHJcbiAgfVxyXG59IiwiaW1wb3J0IHtzdGF0ZV9mdW5jLG9ial9zdGF0ZX0gZnJvbSBcIi4vc3RhdGVcIjtcclxuaW1wb3J0IHtyZW5kZXJfZnVuY30gZnJvbSBcIi4vcmVuZGVyXCI7XHJcbmltcG9ydCB7c3ByaXRlfSBmcm9tIFwiLi9zcHJpdGVcIjtcclxuaW1wb3J0IHtjb2xsaXNpb25fYm94fSBmcm9tIFwiLi9jb2xsaXNpb25cIjtcclxuaW1wb3J0IHtHZXRDdXJyZW50Um9vbX0gZnJvbSBcIi4uL3ZhblwiO1xyXG5pbXBvcnQge0JpbmQsY29udHJvbF9mdW5jfSBmcm9tIFwiLi9jb250cm9sc1wiO1xyXG5cclxuaW50ZXJmYWNlIG9ial9pPFQ+e1xyXG4gIHN0YXRlZjpzdGF0ZV9mdW5jPFQ+LFxyXG4gIHJlbmRlcmY6cmVuZGVyX2Z1bmNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldElkKGE6QXJyYXk8b2JqPHVua25vd24+PixpZDpzdHJpbmcpOm9iajx1bmtub3duPntcclxuICBmb3IobGV0IGIgPSAwO2IgPCBhLmxlbmd0aDsgYisrKXtcclxuICAgIGlmKGFbYl0uaWQgPT0gaWQpe1xyXG4gICAgICByZXR1cm4gYVtiXTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IGNvdW50ZXIgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIG9iajxUPntcclxuICBzcHJpdGVfdXJsID0gXCJcIjtcclxuICBzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudDtcclxuICBzdGF0ZTpUO1xyXG4gIGhlaWdodDpudW1iZXIgPSB1bmRlZmluZWQ7XHJcbiAgd2lkdGg6bnVtYmVyID0gdW5kZWZpbmVkO1xyXG4gIGNvbGxpc2lvbjpib29sZWFuID0gZmFsc2U7XHJcbiAgaWQ6c3RyaW5nO1xyXG4gIGdldFN0YXRlKCl7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcclxuICB9XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHRoaXMuaWQgPSBcIlwiK2NvdW50ZXI7XHJcbiAgICBjb3VudGVyKys7XHJcbiAgICB0aGlzLnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgfVxyXG4gIGxvYWQoKXtcclxuICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KSA9PiB7XHJcbiAgICAgIGxldCBhID0gbmV3IEltYWdlKCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5zcHJpdGVfdXJsO1xyXG4gICAgICBhLm9ubG9hZCA9ICgoKT0+e1xyXG4gICAgICAgIF90aGlzLnNwcml0ZV9zaGVldCA9IGE7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMpe1xyXG4gICAgaWYoa2V5ID09IFwiTW91c2UxXCIpe1xyXG4gICAgICBCaW5kKGtleSxmdW5jLHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgQmluZChrZXksZnVuYyk7IFxyXG4gICAgfVxyXG4gIH1cclxuICByZWdpc3Rlcl9jb250cm9scygpe1xyXG5cclxuICB9XHJcbiAgZGVsZXRlKCl7XHJcbiAgICBHZXRDdXJyZW50Um9vbSgpLmRlbGV0ZUl0ZW0odGhpcy5pZCk7XHJcbiAgfVxyXG4gIGNvbGxpc2lvbl9jaGVjayhhOmNvbGxpc2lvbl9ib3gpOnN0cmluZ1tde1xyXG4gICAgaWYodGhpcy5jb2xsaXNpb24pe1xyXG4gICAgICBsZXQgcm9vbSA9IEdldEN1cnJlbnRSb29tKCk7XHJcbiAgICAgIHJldHVybiByb29tLmNoZWNrX2NvbGxpc2lvbnMoYSx0aGlzLmlkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbiAgc3RhdGVmKHRpbWU6bnVtYmVyKXtcclxuICB9XHJcbiAgY29sbGlkZXNfd2l0aF9ib3goYTpjb2xsaXNpb25fYm94KTpib29sZWFue1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBoY29sbGlkZXMgPSBmYWxzZSwgdmNvbGxpZGVzID0gZmFsc2U7XHJcbiAgICBpZihzdC5wb3NpdGlvbi54ID49IGEueCAmJiBzdC5wb3NpdGlvbi54IDwgKGEueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKGEueCA+IHN0LnBvc2l0aW9uLnggJiYgYS54IDwgKHN0LnBvc2l0aW9uLnggKyB0aGlzLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdC5wb3NpdGlvbi55ID49IGEueSAmJiBzdC5wb3NpdGlvbi55IDwgKGEueSArIGEuaGVpZ2h0KSl7XHJcbiAgICAgIHZjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihhLnkgPiBzdC5wb3NpdGlvbi55ICYmIGEueSA8IChzdC5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBoY29sbGlkZXMgJiYgdmNvbGxpZGVzO1xyXG4gIH1cclxuICBjb2xsaWRlc193aXRoKGE6b2JqPHVua25vd24+KTpib29sZWFue1xyXG4gICAgbGV0IHN0ID0gdGhpcy5zdGF0ZSBhcyB1bmtub3duIGFzIG9ial9zdGF0ZTtcclxuICAgIGxldCBzdF8yID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICBsZXQgaGNvbGxpZGVzID0gZmFsc2UsIHZjb2xsaWRlcyA9IGZhbHNlO1xyXG4gICAgaWYoc3QucG9zaXRpb24ueCA+IHN0XzIucG9zaXRpb24ueCAmJiBzdC5wb3NpdGlvbi54IDwgKHN0XzIucG9zaXRpb24ueCArIGEud2lkdGgpKXtcclxuICAgICAgaGNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmKHN0XzIucG9zaXRpb24ueCA+IHN0LnBvc2l0aW9uLnggJiYgc3RfMi5wb3NpdGlvbi54IDwgKHN0LnBvc2l0aW9uLnggKyBhLndpZHRoKSl7XHJcbiAgICAgIGhjb2xsaWRlcyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZihzdC5wb3NpdGlvbi55ID4gc3RfMi5wb3NpdGlvbi55ICYmIHN0LnBvc2l0aW9uLnkgPCAoc3RfMi5wb3NpdGlvbi55ICsgYS53aWR0aCkpe1xyXG4gICAgICB2Y29sbGlkZXMgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYoc3RfMi5wb3NpdGlvbi55ID4gc3QucG9zaXRpb24ueSAmJiBzdF8yLnBvc2l0aW9uLnkgPCAoc3QucG9zaXRpb24ueSArIGEud2lkdGgpKXtcclxuICAgICAgdmNvbGxpZGVzID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBoY29sbGlkZXMgJiYgdmNvbGxpZGVzO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6bnVtYmVyKTpzcHJpdGV7XHJcbiAgICBsZXQgc3QgPSB0aGlzLnN0YXRlIGFzIHVua25vd24gYXMgb2JqX3N0YXRlO1xyXG4gICAgbGV0IHNwcml0ZV9oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuICAgIGxldCBzcHJpdGVfd2lkdGggPSB0aGlzLndpZHRoO1xyXG4gICAgaWYodGhpcy5oZWlnaHQgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgc3ByaXRlX2hlaWdodCA9IHRoaXMuc3ByaXRlX3NoZWV0LmhlaWdodDtcclxuICAgIH1cclxuICAgIGlmKHRoaXMud2lkdGggPT0gdW5kZWZpbmVkKXtcclxuICAgICAgc3ByaXRlX3dpZHRoID0gdGhpcy5zcHJpdGVfc2hlZXQud2lkdGg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGVfc2hlZXQ6dGhpcy5zcHJpdGVfc2hlZXQsXHJcbiAgICAgIGxlZnQ6MCxcclxuICAgICAgdG9wOjAsXHJcbiAgICAgIHNwcml0ZV93aWR0aCxcclxuICAgICAgc3ByaXRlX2hlaWdodFxyXG4gICAgfTtcclxuICAgIFxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHN0YXRpY19vYmp7XHJcbiAgc3ByaXRlX3VybCA9IFwiXCI7XHJcbiAgc3ByaXRlOkhUTUxJbWFnZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBncmF2aXR5X29iajxUPiBleHRlbmRzIG9iajxUPntcclxuICBncmF2aXR5ID0gdHJ1ZVxyXG59IiwiaW1wb3J0IHsgZ3Jhdml0eV9vYmosb2JqIH0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcbmltcG9ydCB7IHNwcml0ZSB9IGZyb20gXCIuL3Nwcml0ZVwiO1xyXG5pbXBvcnQgeyBvYmpfc3RhdGUgfSBmcm9tIFwiLi9zdGF0ZVwiO1xyXG5pbXBvcnQgeyB2ZWxvY2l0eV9jb2xsaXNpb25fY2hlY2ssY2hlY2tfY29sbGlzaW9ucyxjb2xsaXNpb25fYm94LGNoZWNrX2FsbF9jb2xsaXNpb25zIH0gZnJvbSBcIi4vY29sbGlzaW9uXCI7XHJcbmltcG9ydCB7cmVuZGVyX2NvbGxpc2lvbl9ib3gsREVCVUd9IGZyb20gXCIuLi92YW5cIjtcclxuaW1wb3J0IHtCaW5kLGNvbnRyb2xfZnVuY30gZnJvbSBcIi4vY29udHJvbHNcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhcHBseV9ncmF2aXR5KG9iOmdyYXZpdHlfb2JqPHVua25vd24+LGdyYXZfY29uc3Q6bnVtYmVyLCBncmF2X21heDpudW1iZXIpe1xyXG4gIGxldCBzdCA9IG9iLnN0YXRlIGFzIG9ial9zdGF0ZTtcclxuICBpZihvYi5ncmF2aXR5ICYmIHN0LnZlbG9jaXR5LnkgPiBncmF2X21heCl7XHJcbiAgICBzdC52ZWxvY2l0eS55ICs9IGdyYXZfY29uc3Q7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgcm9vbTxUPntcclxuICBiYWNrZ3JvdW5kX3VybDogc3RyaW5nID0gXCJcIjtcclxuICBiYWNrZ3JvdW5kOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIG9iamVjdHM6IEFycmF5PG9iajx1bmtub3duPj5cclxuICBzdGF0ZTogVFxyXG4gIGxvYWQoKSB7XHJcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IGEgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgbGV0IHRvX2F3YWl0ID0gdGhpcy5vYmplY3RzLm1hcCgoYSkgPT4gYS5sb2FkKCkpO1xyXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbCh0b19hd2FpdCk7XHJcbiAgICAgIGEuc3JjID0gdGhpcy5iYWNrZ3JvdW5kX3VybDtcclxuICAgICAgYS5vbmVycm9yID0gKCgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIGxvYWRpbmcgdXJsOlwiICsgdGhpcy5iYWNrZ3JvdW5kX3VybCk7XHJcbiAgICAgIH0pXHJcbiAgICAgIGEub25sb2FkID0gKCgpID0+IHtcclxuICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kID0gYTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgZGVsZXRlSXRlbShpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDthIDwgdGhpcy5vYmplY3RzLmxlbmd0aDthKyspe1xyXG4gICAgICBpZih0aGlzLm9iamVjdHNbYV0uaWQgPT09IGlkKXtcclxuICAgICAgICB0aGlzLm9iamVjdHMgPSB0aGlzLm9iamVjdHMuc2xpY2UoMCxhKS5jb25jYXQodGhpcy5vYmplY3RzLnNsaWNlKGErMSkpO1xyXG4gICAgICAgIGEtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG4gIGJpbmRDb250cm9sKGtleTpzdHJpbmcsZnVuYzpjb250cm9sX2Z1bmMpe1xyXG4gICAgQmluZChrZXksZnVuYyk7IFxyXG4gIH1cclxuICBjaGVja19jb2xsaXNpb25zKGJveDpjb2xsaXNpb25fYm94LGV4ZW1wdD86c3RyaW5nKTpzdHJpbmdbXXtcclxuICAgIGlmKERFQlVHKVxyXG4gICAgICByZW5kZXJfY29sbGlzaW9uX2JveChib3gpO1xyXG4gICAgcmV0dXJuIGNoZWNrX2FsbF9jb2xsaXNpb25zKGJveCx0aGlzLm9iamVjdHMsZXhlbXB0KTtcclxuICB9XHJcbiAgcmVnaXN0ZXJfY29udHJvbHMoKXtcclxuXHJcbiAgfVxyXG4gIGNsZWFudXAoKXtcclxuXHJcbiAgfVxyXG4gIHN0YXRlZih0aW1lOiBudW1iZXIpIHtcclxuICAgIGZvciAobGV0IGEgPSAwOyBhIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgYSsrKSB7XHJcbiAgICAgIHRoaXMub2JqZWN0c1thXS5zdGF0ZWYodGltZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE9iaihpZDpzdHJpbmcpe1xyXG4gICAgZm9yKGxldCBhID0gMDsgYSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGErKyl7XHJcbiAgICAgIGlmKHRoaXMub2JqZWN0c1thXS5pZCA9PSBpZCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub2JqZWN0c1thXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZW5kZXJmKHRpbWU6IG51bWJlcik6IHNwcml0ZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzcHJpdGVfc2hlZXQ6IHRoaXMuYmFja2dyb3VuZCxcclxuICAgICAgbGVmdDogMCxcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBzcHJpdGVfaGVpZ2h0OiB0aGlzLmJhY2tncm91bmQuaGVpZ2h0LFxyXG4gICAgICBzcHJpdGVfd2lkdGg6IHRoaXMuYmFja2dyb3VuZC53aWR0aFxyXG4gICAgfVxyXG4gIH1cclxufSIsImV4cG9ydCBpbnRlcmZhY2Ugc3ByaXRle1xyXG4gIHNwcml0ZV9zaGVldDpIVE1MSW1hZ2VFbGVtZW50LFxyXG4gIGxlZnQ6bnVtYmVyLFxyXG4gIHRvcDpudW1iZXIsXHJcbiAgc3ByaXRlX3dpZHRoOm51bWJlcixcclxuICBzcHJpdGVfaGVpZ2h0Om51bWJlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3ByaXRlX2dlbihzcHJpdGVfc2hlZXQ6SFRNTEltYWdlRWxlbWVudCxzcHJpdGVfd2lkdGg6bnVtYmVyLHNwcml0ZV9oZWlnaHQ6bnVtYmVyKTpBcnJheTxzcHJpdGU+e1xyXG4gIGxldCB3aWR0aCA9IHNwcml0ZV9zaGVldC53aWR0aDtcclxuICBsZXQgc3ByaXRlczpBcnJheTxzcHJpdGU+ID0gW107XHJcbiAgZm9yKGxldCBhID0gMDsgYSA8IHdpZHRoO2EgKz0gc3ByaXRlX3dpZHRoKXtcclxuICAgIHNwcml0ZXMucHVzaCh7XHJcbiAgICAgIHNwcml0ZV9zaGVldCxcclxuICAgICAgbGVmdDphLFxyXG4gICAgICB0b3A6MCxcclxuICAgICAgc3ByaXRlX2hlaWdodCxcclxuICAgICAgc3ByaXRlX3dpZHRoXHJcbiAgICB9KVxyXG4gIH1cclxuICByZXR1cm4gc3ByaXRlcztcclxufSIsImV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XHJcblxyXG5pbXBvcnQge29ian0gZnJvbSBcIi4vbGliL29iamVjdFwiO1xyXG5pbXBvcnQge29ial9zdGF0ZX0gZnJvbSBcIi4vbGliL3N0YXRlXCI7XHJcbmltcG9ydCB7cm9vbX0gZnJvbSBcIi4vbGliL3Jvb21cIjtcclxuaW1wb3J0IHtzcHJpdGV9IGZyb20gXCIuL2xpYi9zcHJpdGVcIjtcclxuaW1wb3J0IHtPdmVyd29ybGR9IGZyb20gXCIuL2dhbWUvcm9vbXMvb3ZlcndvcmxkXCI7XHJcbmltcG9ydCB7IGNvbGxpc2lvbl9ib3ggfSBmcm9tIFwiLi9saWIvY29sbGlzaW9uXCI7XHJcblxyXG5sZXQgY2FudmFzX2VsZW1lbnQ6SFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhcmdldFwiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxubGV0IGNvbnRleHQ6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzX2VsZW1lbnQuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxubGV0IHZoZWlnaHQgPSAxMDAwO1xyXG5sZXQgdndpZHRoID0gMTgwMDtcclxuXHJcbi8vSG93IG9mdGVuIHRoZSBnYW1lIGxvZ2ljIGxvb3Agc2hvdWxkIHJ1biwgaW4gbWlsbGlzZWNvbmRzXHJcbmxldCBsb2dpY19sb29wX2ludGVydmFsOm51bWJlciA9IDEwMDAvNjA7ICBcclxuXHJcbmxldCBsYXN0X3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuaW50ZXJmYWNlIGRpbWVuc2lvbnN7XHJcbiAgaGVpZ2h0Om51bWJlcixcclxuICB3aWR0aDpudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFNjcmVlbkRpbWVuc2lvbnMgKCk6ZGltZW5zaW9uc3tcclxuICByZXR1cm4oe1xyXG4gICAgaGVpZ2h0OnZoZWlnaHQsXHJcbiAgICB3aWR0aDp2d2lkdGhcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0Q3VycmVudFJvb20oKTpyb29tPHVua25vd24+e1xyXG4gIHJldHVybiBjdXJyX3Jvb207XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZW5kZXJfY29sbGlzaW9uX2JveCA9IChhOmNvbGxpc2lvbl9ib3gpID0+IHtcclxuICBib3hlcy5wdXNoKGEpO1xyXG59XHJcblxyXG5sZXQgYm94ZXM6QXJyYXk8Y29sbGlzaW9uX2JveD4gPSBbXTtcclxubGV0IGN1cnJfcm9vbTpyb29tPHVua25vd24+O1xyXG5sZXQgbG9naWM6bnVtYmVyO1xyXG5cclxuY29uc3Qgc3RhcnRfbG9naWMgPSAoYTpudW1iZXIpID0+IHtcclxuICByZXR1cm4gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgIGxldCBuZXdfdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgdGltZV9zaW5jZSA9IG5ld190aW1lLmdldFRpbWUoKSAtIGxhc3RfdGltZS5nZXRUaW1lKCk7XHJcbiAgICBsYXN0X3RpbWUgPSBuZXdfdGltZTtcclxuICAgIGN1cnJfcm9vbS5zdGF0ZWYobmV3X3RpbWUuZ2V0VGltZSgpKTtcclxuICB9LGEpO1xyXG59XHJcblxyXG5jb25zdCByZW5kZXJlciA9IChzcHJpdGU6c3ByaXRlLHg6bnVtYmVyLHk6bnVtYmVyLHNjYWxpbmc6bnVtYmVyKSA9PiB7XHJcbiAgbGV0IGZpbmFsX3ggPSB4ICogc2NhbGluZztcclxuICBsZXQgZmluYWxfeSA9IHZoZWlnaHQgLSB5IC0gc3ByaXRlLnNwcml0ZV9oZWlnaHQgKiBzY2FsaW5nO1xyXG4gIGxldCBoZWlnaHQgPSBzcHJpdGUuc3ByaXRlX2hlaWdodCAqIHNjYWxpbmc7XHJcbiAgbGV0IHdpZHRoID0gc3ByaXRlLnNwcml0ZV93aWR0aCAqIHNjYWxpbmc7XHJcbiAgY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICBzcHJpdGUuc3ByaXRlX3NoZWV0LFxyXG4gICAgc3ByaXRlLmxlZnQsXHJcbiAgICBzcHJpdGUudG9wLFxyXG4gICAgc3ByaXRlLnNwcml0ZV93aWR0aCxcclxuICAgIHNwcml0ZS5zcHJpdGVfaGVpZ2h0LFxyXG4gICAgZmluYWxfeCxcclxuICAgIGZpbmFsX3ksXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodFxyXG4gIClcclxufVxyXG5cclxuY29uc3QgcmVuZGVyTG9vcCA9ICh0Om51bWJlcik9PntcclxuICBsZXQgc2NhbGluZyA9IDE7XHJcblxyXG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsMCx2d2lkdGgsdmhlaWdodCk7XHJcbiAgbGV0IG9iamVjdF90b19yZW5kZXIgPSBjdXJyX3Jvb20ub2JqZWN0cztcclxuICByZW5kZXJlcihjdXJyX3Jvb20ucmVuZGVyZih0KSwwLDAsc2NhbGluZyk7XHJcbiAgbGV0IGluZGV4ID0gMDtcclxuICBmb3IgKGxldCBhIG9mIG9iamVjdF90b19yZW5kZXIpe1xyXG4gICAgbGV0IHN0ID0gYS5zdGF0ZSBhcyBvYmpfc3RhdGU7XHJcbiAgICByZW5kZXJlcihhLnJlbmRlcmYodCksc3QucG9zaXRpb24ueCxzdC5wb3NpdGlvbi55LHNjYWxpbmcpO1xyXG4gICAgaW5kZXgrKztcclxuICB9XHJcbiAgbGV0IGJveDtcclxuICB3aGlsZShib3ggPSBib3hlcy5wb3AoKSl7XHJcbiAgICBsZXQgeCA9IGJveC54ICogc2NhbGluZztcclxuICAgIGxldCB5ID0gdmhlaWdodCAtIGJveC55IC0gYm94LmhlaWdodCAqIHNjYWxpbmc7XHJcbiAgICBjb250ZXh0LmZpbGxSZWN0KHggKiBzY2FsaW5nLHkgKiBzY2FsaW5nLGJveC53aWR0aCAqIHNjYWxpbmcsYm94LmhlaWdodCAqIHNjYWxpbmcpO1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckxvb3ApIFxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZFJvb20oeDpyb29tPHVua25vd24+KXtcclxuICBsZXQgbmV3X3Jvb20gPSBhd2FpdCB4LmxvYWQoKTtcclxuICB4LnJlZ2lzdGVyX2NvbnRyb2xzKCk7XHJcbiAgY3Vycl9yb29tID0geDtcclxuICBpZihsb2dpYyAhPSB1bmRlZmluZWQpe1xyXG4gICAgY2xlYXJJbnRlcnZhbChsb2dpYyk7XHJcbiAgfVxyXG4gIG1haW4oKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpe1xyXG4gIGxvZ2ljID0gc3RhcnRfbG9naWMobG9naWNfbG9vcF9pbnRlcnZhbCk7XHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckxvb3ApO1xyXG59XHJcblxyXG5sb2FkUm9vbShuZXcgT3ZlcndvcmxkKCkpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9