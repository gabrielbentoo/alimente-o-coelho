const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let ground;
let rope;
let fruit;
let fruitCon;
let bg;
let fruitImg;
let bunnyImg;
let bunny = {
    x: 270,
    y: 600,
    scale: 1.5
}
let animations = {
    blinking: [],
    eating: [],
    crying: []
}
let currentAnimation = "blinking";
let frameIndex = 0;
let frameDelay = 10;
let button;

function preload() {

    bg = loadImage("assets/background.png");
    fruitImg = loadImage("assets/melon.png");
    bunnyImg = loadImage("assets/Rabbit-01.png");

    //blinking
    animations.blinking.push(loadImage("assets/blink-1.png"));
    animations.blinking.push(loadImage("assets/blink-2.png"));
    animations.blinking.push(loadImage("assets/blink-3.png"));

    //eating
    animations.eating.push(loadImage("assets/eat-0.png"));
    animations.eating.push(loadImage("assets/eat-1.png"));
    animations.eating.push(loadImage("assets/eat-2.png"));
    animations.eating.push(loadImage("assets/eat-3.png"));
    animations.eating.push(loadImage("assets/eat-4.png"));

    //crying
    animations.crying.push(loadImage("assets/sad-1.png"));
    animations.crying.push(loadImage("assets/sad-2.png"));
    animations.crying.push(loadImage("assets/sad-3.png"));
}


function setup() {
    createCanvas(500, 700);
    

    engine = Engine.create();
    world = engine.world;
    ground = new Ground(200, 690, 600, 20);

    rope = new Rope(6, {x: 245, y:30});

    let fruitOptions = {
        density: 0.001
    } 
    fruit = Bodies.circle(300, 300, 15, fruitOptions);
    Matter.Composite.add(rope.body, fruit);

    fruitCon = new Link(rope, fruit);

    
    button = createImg("assets/cut-btn.png");
    button.position(230, 30);
    button.size(50,50);
    button.mouseClicked(drop);

    ellipseMode(RADIUS);
    rectMode(CENTER);
    imageMode(CENTER);
}

function draw() {
    background(51);
    image(bg, width /2, height /2, 490, 690);
    image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);


    Engine.update(engine);
    ground.display();
    rope.display();
    
    drawBunny();
   

   // ellipse(fruit.position.x, fruit.position.y, 15);
}

function drawBunny() {
    let frames = animations[currentAnimation];
    
    if(!frames || frames.length === 0) return;

    if(frameCount % frameDelay === 0 ) {
        frameIndex++;
        if(frameIndex >= frames.length) {
            frameIndex = 0;
            if(currentAnimation === "eating" || currentAnimation === "crying") {
            currentAnimation = "blinking";
            }
        }
        
    }


    let img = frames[frameIndex];
    if(!img) return;
    imageMode(CENTER);
    image(img, bunny.x, bunny.y, 100 * bunny.scale, 100 * bunny.scale);
}

function drop() {
    rope.break();
    fruitCon.detach();
    fruitCon = null;
}