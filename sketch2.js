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
let plank;
let ground;
let hiperground;
let con;
let con2;
let rope;
let bubble;
let bubbleimg;
let fruit;
let fruitCon;
let bg;
let fruitImg;
let bunnyImg;
let bunny = {
    x: 420,
    y: 620,
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
let isGameOver = false;
let bgSound;
let cutSound;
let sadSound;
let eatingSound;
let airSound;
let blower;
let muteBtn;
let starImg;


function preload() {

    bg = loadImage("assets/background.png");
    fruitImg = loadImage("assets/melon.png");
    bunnyImg = loadImage("assets/Rabbit-01.png");
    bubbleImg = loadImage("assets/bubble.png");
    starImg = loadImage("star.png");

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

    bgSound = loadSound("assets/sound1.mp3");
    sadSound = loadSound("assets/sad.wav");
    cutSound = loadSound("assets/rope_cut.mp3");
    eatingSound = loadSound("assets/eating_sound.mp3");
    airSound = loadSound("assets/air.wav");


}

