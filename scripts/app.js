// ///  ??? Elequont Javascripts (vol.2) Paint Program. Groovy ???  ///

// elt = function (name, attributes) {
//     var node = document.createElement(name);
//     if (attributes) {
//         for (var attr in attributes)
//             if (attributes.hasOwnProperty(attr))
//                 node.setAttribute(attr, attributes[attr]);
//     }
//     for (var i = 2; i < arguments.length; i++) {
//         var child = arguments[i];
//         if (typeof child == "string")
//             child = document.createTextNode(child);
//         node.appendChild(child);
//     }

//     return node;
// };

// var controls = Object.create(null);

// createPaint = function (parent) {
//     var canvas = elt("canvas", { width: window.screen.width, height: window.screen.height ,class: "canvas" });
//     var cx = canvas.getContext("2d");
//     var toolbar = elt("div", { class: "toolbar" });
//     for (var name in controls)
//         toolbar.appendChild(controls[name](cx));
//     var panel = elt("div", { class: "picturepanel" }, canvas);
//     parent.appendChild(elt("div",{class:"container"}, panel, toolbar));
// }

// var tools = Object.create(null);

// controls.tool = function (cx) {
//     var select = elt("select");
//     for (var name in tools)
//         select.appendChild(elt("option", null, name));
//     cx.canvas.addEventListener("mousedown", function (event) {
//             if (event.which == 1) {
//                 tools[select.value](event, cx);
//                 event.preventDefault();
//             }
//         });
//     return elt("span", null, "Tool: ", select);
// };

// relativePos = function (event, element) {
//     var rect = element.getBoundingClientRect();
//     return {
//         x: Math.floor(event.clientX - rect.left),
//         y: Math.floor(event.clientY - rect.top)
//     };
// }

// trackDrag = function (onMove, onEnd) {
//     end = (event) => {
//         removeEventListener("mousemove", onMove);
//         removeEventListener("mouseup", end);
//         if (onEnd)
//             onEnd(event);
//     };
//     addEventListener("mousemove", onMove);
//     addEventListener("mouseup", end);
// }

// tools.Line = function (event, cx, onEnd) {
//     cx.lineCap = "round";
//     var pos = relativePos(event, cx.canvas);
//     trackDrag((event) => {
//         cx.beginPath();
//         cx.moveTo(pos.x, pos.y);
//         pos = relativePos(event, cx.canvas);
//         cx.lineTo(pos.x, pos.y);
//         cx.stroke();
//     }, onEnd);
// };

// tools.Erase = function (event, cx) {
//     cx.globalCompositeOperation = "destination-out";
//     tools.Line(event, cx, function () {
//             cx.globalCompositeOperation = "source-over";
//         });
// };

// controls.color = function (cx) {
//     var input = elt("input", { type: "color" });
//     input.addEventListener("change", function () {
//             cx.fillStyle = input.value;
//             cx.strokeStyle = input.value;

//         });
//     return elt("span", null, "Color: ", input);
// };

// controls.brushSize = function (cx) {
//     var select = elt("select");
//     var sizes = [1, 2, 3, 5, 8, 12, 25];
//     sizes.forEach(function (size) {
//             select.appendChild(elt("option", { value: size }, size +
//                 "pixels"));
//         });

//     select.addEventListener("change", function () {
//             cx.lineWidth = select.value;
//         });
//     return elt("span", null, "Brush size: ", select);
// };


// controls.save = function (cx) {
//     var link = elt("a", { href: "/" }, "Save");
//     update = function () {
//         try {
//             link.href = cx.canvas.toDataURL();

//         } catch (e) {
//             if (e instanceof SecurityError)
//                 link.href = "javascript:alert(" + JSON.stringify("Can't save: " + e.toString()) + ")";


//             else
//                 throw e;
//         }
//     };
//     link.addEventListener("mouseover", update);
//     link.addEventListener("focus", update);
//     return link;
// };


// loadImageURL =function (cx, url) {
//     var image = document.createElement("img");
//     image.addEventListener("load", function () {
//             var color = cx.fillStyle, size = cx.lineWidth;
//             cx.canvas.width = image.width;
//             cx.canvas.height = image.height;
//             cx.drawImage(image, 0, 0);
//             cx.fillStyle = color;
//             cx.strokeStyle = color;
//             cx.lineWidth = size;
//         });
//     image.src = url;
// }

// controls.openFile = function (cx) {
//     var input = elt("input", { type: "file" });
//     input.addEventListener("change", function () {
//             if (input.files.length == 0)
//                 return;
//             var reader = new FileReader();
//             reader.addEventListener("load", function () {
//                     loadImageURL(cx, reader.result);

//                 });
//             reader.readAsDataURL(input.files[0]);
//         });
//     return elt("div", null, "Open file :", input);
// };

// controls.openURL = function (cx) {
//     var input = elt("input", { type: "text" });
//     var form = elt("form", null, "Open URL:", input, elt("button", { type: "submit" }, "load"));
//     form.addEventListener("submit", function (event) {
//             event.preventDefault();
//             loadImageURL(cx, input.value);
//         });
//     return form;
// }

// tools.Text = function (event, cx) {
//     var text = prompt("Text:", "");
//     if (text) {
//         var pos = relativePos(event, cx.canvas);
//         cx.font = Math.max(7, cx.lineWidth) + "px sans-serif";
//         cx.fillText(text, pos.x, pos.y);
//     }
// };

// tools.Spray = function (event, cx) {
//     var radius = cx.lineWidth / 2;
//     var area = radius * radius * Math.PI;
//     var dotsPerTick = Math.ceil(area / 30);
//     var currentPos = relativePos(event, cx.canvas);
//     var spray = setInterval(function () {
//             for (var i = 0; i < dotsPerTick; i++) {
//                 var offset = randomPointInRadius(radius);
//                 cx.fillRect(currentPos.x + offset.x, currentPos.y + offset.y, 1, 1);

//             }
//         }, 25);
//     trackDrag(function (event) {
//             currentPos = relativePos(event, cx.canvas);
//         }, function () {
//             clearInterval(spray);
//         });
// };

// randomPointInRadius = function (radius) {
//     for (; ;) {
//         var x = Math.random() * 2 - 1;
//         var y = Math.random() * 2 - 1;
//         if (x * x + y * y <= 1)
//             return {
//                 x: x * radius,
//                 y: y * radius
//             };
//     }
// }


///  ??? animation ??? ///


let simpleLevelPlan = `
......................
..#................#..
..#............=...#..
..#.......O.O......#..
..#.@....#####.....#..
..#####............#..
......#++++++++++++#..
......##############..
......................
`;


class Level {
    constructor(plan){
        let rows = plan.trim().split("\n").map(l =>[...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.startActors = [];

        this.rows = rows.map((row, y)=>{
            return row.map((ch,x)=>{
                let type = levelChars[ch];
                // console.log(type)
                if(typeof type == "string") return type;
                this.startActors.push(
                    type.create(new Vec(x,y),ch)
                );
                return "empty";
            });
        });
    }
}

class State {
    constructor(level,actors,status){
        this.level = level;
        this.actors = actors;
        this.status = status;

    }

    static start(level){
        return new State(level,level.startActors,"playing");

    }

    get player(){
        return this.actors.find(a => a.type == "player");
    }
}


class Vec {
    constructor(x,y){
        this.x = x; this.y = y;
    }
    plus(other){
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor){
        return new Vec(this.x * factor, this.y * factor);
    }
}

class Player {
    constructor(pos,speed){
        this.pos = pos;
        this.speed = speed;
    }
    get type() {
        return "player";
    }
    static create(pos) {
        return new Player(pos.plus(new Vec(0,-0.5)),new Vec(0,0));
    }   
}
Player.prototype.size = new Vec(0.8,1.5);

class Lava {
    constructor(pos,speed,reset){
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;

    }

    get type() {
        return "lava";
    }

    static create(pos,ch){
        if(ch == "="){
            return new Lava(pos, new Vec(2,0));
        } else if(ch == "|"){
            return new Lava(pos,new Vec(0,2));
        } else if(ch == "v"){
            return new Lava(pos, new Vec(0,3),pos);
        }
    }
}

Lava.prototype.size = new Vec(1, 1);

class Coin{
    constructor(pos,basePos,wobble){
        this.pos = pos;
        this.basePos = basePos;
        this.wobble = wobble;
    }
    get type(){return "coin";}
    static create(pos){
        let basePos = pos.plus(new Vec(0.2,0.1));
        return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
    }
}

Coin.prototype.size = new Vec(0.6,0.6);


const levelChars ={
    ".":"empty","#":"wall","+":"lava",
    "@":Player , "O": Coin,
    "=":Lava, "|":Lava, "v": Lava
}

let simpleLevel = new Level(simpleLevelPlan);
// console.log(simpleLevel)


function elt(name,attrs,...children){
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr,attrs[attr]);
    }
    for (let child of children){
        dom.appendChild(child);
    }
    return dom;
}

class DOMDisplay {
    constructor(parent, level) {
        this.dom = elt("div",{class: "game"}, drawGrid(level));
        this.actorLayer = null;
        parent.appendChild(this.dom);
    }
    clear() {this.dom.remove();}
}



const scale = 20;

function drawGrid(level){
    return elt("table",{
        class:"background",
        style: `width: ${level.width * scale}px`
    },
    ...level.rows.map(row => elt("tr",{style: `height ${scale}px`}, ...row.map(type => elt("td",{class: type}))))
    );
}




function drawActors(actors){
    // if(actors){
    //     console.log(actors)
    // } else {
    return elt("div",{}, ...actors.map(actor =>{
        let rect = elt("div",{class: `actor ${actor.type}px`});
        rect.style.width = `${actor.size.x * scale}px`;
        rect.style.height = `${actor.size.y * scale}px`;
        rect.style.left  = `${actor.pos.x * scale}px`;
        rect.style.top = `${actor.pos.y * scale}px`;
        return rect;
    }))
    // } 
};

DOMDisplay.prototype.syncState = function(state) {
    if(this.actorLayer) this.actorLayer.remove();
    this.actorLayer = drawActors(state.actors);

    this.dom.appendChild(this.actorLayer);
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
    console.log(this.dom)

};


DOMDisplay.prototype.scrollPlayerIntoView = function(state){
    let width = this.dom.clientWidth;
    let height = this.dom.clientHeight;
    let margin = width /3;

    let left = this.dom.scrollLeft, right = left + width;
    let top = this.dom.scrollTop, bottom = top + height;
    let player = state.player;
    let center = player.pos.plus(player.size.times(0.5)).times(scale);
    if(center.x < left + margin){
        this.dom.scrollLeft = center.x - margin;
    } else if(center.x > right - margin){
        this.dom.scrollLeft = center.x + margin -width;
    }
    if( center.y < top + margin){
        this.dom.scrollTop = center.y - margin;
    } else if(center.y > bottom - margin){
        this.dom.scrollTop = center.y + margin - height;
    }
};


let display = new DOMDisplay(document.body, simpleLevel);
display.syncState(State.start(simpleLevel));

Level.prototype.touches = function(pos,size,type){
    let xStart = Math.floor(pos.x);
    let xEnd = Math.ceil(pos.x + size.x);
    let yStart = Math.floor(pos.y);
    let yEnd = math.ceil(pos.y + size.y);

    for(let y = yStart; y< yEnd; y++){
        for(let x = xStart; x < xEnd; x++){
            let isOutside = x < 0 || x >= this.width ||
                            y < 0 || y >= this.height;
            let here = isOutside ? "wall" : this.rows[y][x];
            if(here == type) return true;
        }
    }
    return false;
}


State.prototype.update = function(time, keys){
    let actors = this.actors.map(actor => actor.update(time,this,keys));
    let newState = new State(this.level, actors, this.status);

    if(newState.status != "playing") return newState;


    let player = newState.player;
    if(this.level.touches(player.pos, player.size, "lava")){
        return new State(this.level,actors, "lost");
    }   
    for(let actor of actors){
        if(actor != player && overlap(actor,player)){
            newState = actor.collide(newState);
        }
    }
    return newState;
}

function overlap(actor1,actor2){
    return actor1.pos.x + actor1.size.x > actor2.pos.x &&
           actor1.pos.x < actor2.pos.x + actor2.size.x &&
           actor1.pos.y + actor1.size.y > actor2.pos.y &&
           actor1.pos.y < actor2.pos.y + actor2.size.y;
}

Lava.prototype.collide = function(state){
    return new State(state.level, state.actors, "lost");
};
Coin.prototype.collide = function(state){
    let filterred = state.actors.filter(a => A !=this);
    let status = state.status;
    if(!filterred.some(a => a.type == "coin")) status = "won";
    return new State(state.level,filtered ,status)
}

Lava.prototype.update = function(time,state){
    let newPos = this.pos.plus(this.speed.times(time));
    if(!state.level.touches(newPos,this.size,"wall")) {
        return new Lava(newPos, this.speed, this.reset);

    } else if(this.reset){
        return new Lava(this.reset,this.speed,this.reset);
    } else {
        return new Lava(this.pos, this.speed.times(-1));
    }
};

const wobbleSpeed = 8, wobbleDist = 0.07;
Coin.prototype.update = function(time){
    let wobble = this.wobble + time * wobbleSpeed;
    let wobblePos = Math.sin(wobble) * wobbleDist;
    return new Coin(this.basePos.plus(new Vec(0, wobblePos)),this.basePos,wobble);
};

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function(time,state,keys){
    let xSpeed = 0;
    if(keys.ArrowLeft) xSpeed -= playerXSpeed;
    if(keys.ArrowRight) xSpeed += playerXSpeed;
    let pos = this.pos;
    let movedX = pos.plus(new Vec(xSpeed * time,0));
    if(!state.level.touches(movedX,this.size,"wall")){
        pos = movedX;
    }
        let ySpeed = this.speed.y + time * gravity;
        let movedY = pos.plus(new Vec(0, ySpeed * time));
        if(!state.level.touches(movedY,this.size,"wall")){
            pos = movedY;
        
    } else if( keys.ArrowUp && ySpeed > 0){
        ySpeed = -jumpSpeed;

    } else {
        ySpeed = 0;
    }
    return new Player(pos,new Vec(xSpeed,ySpeed));
};

function trackKeys(keys){
    let down = Object.create(null);
    function track(event){
        if(keys.includes(event.key)){
            down[event.key] = event.type == "keydown";
            event.preventDefault();
        }
    }
    window.addEventListener("keydown",track);
    window.addEventListener("keyup",track);
    return down;
}

const arrowKeys = trackKeys(["ArrowLeft","Arrowright","ArrowUp"]);

function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if(lastTime != null){
            let timeStep = Math.min(time - lastTime, 100) /1000;
            if(frameFunc(timeStep)===false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}


function runLevel(level,Display){
    let display = new Display(document.body,level);
    let state = State.start(level);
    let ending = 1;

    return new Promise(resolve =>{
        runAnimation(time => {
            state = state.update(time, arrowKeys);
            display.syncState(state);
            if(state.status == "playing"){
                return true;
            } else if (ending > 0){
                ending -= time;
                return true;
            } else {
                display.clear();
                resolve(state.status);
                return false;
            }
        });
    });
}

async function runGame(plans,Display){
    console.log(plans)

    for(let level = 0; level < plans.length;){
        let status = await runLevel(new Level(plans[level]),Display);
        if(status == "won") level++;
    }
    console.log("You've won!");
}
// runGame(GAME_LEVELS,DOMDisplay);
