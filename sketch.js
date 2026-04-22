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
let fruit_con;
let bg;
let fruitImg;
let bunnyImg;
let bunny;

function preload() {

    bg = loadImage("assets/background.png");
    fruitImg = loadImage("assets/melon.png");
    bunnyImg = loadImage("assets/Rabbit-01.png");
}


function setup() {
    createCanvas(500, 700);
    console.log(typeof createSprite);

    engine = Engine.create();
    world = engine.world;
    ground = new Ground(200, 690, 600, 20);

    rope = new Rope(6, {x: 245, y:30});

    let fruitOptions = {
        density: 0.001
    } 
    fruit = Bodies.circle(300, 300, 15, fruitOptions);
    Matter.Composite.add(rope.body, fruit);

    fruit_con = new Link(rope, fruit);

    bunny = createSprite(200, 620, 100, 100);
    bunny.addImage(bunnyImg);

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

    drawSprites();

   // ellipse(fruit.position.x, fruit.position.y, 15);
}

