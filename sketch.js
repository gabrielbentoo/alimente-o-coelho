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


function setup() {
    createCanvas(500, 700);

    engine = Engine.create();
    world = engine.world;
    ground = new Ground(200, 690, 600, 20);


    ellipseMode(RADIUS);
    rectMode(CENTER);
}

function draw() {
    background(51);


    Engine.update(engine);
    ground.display();
}