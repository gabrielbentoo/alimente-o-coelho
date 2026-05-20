const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composite = Matter.Composite;

let engine;
let world;
let ground;
let higherground;
let rope;
let rope2;
let rope3;
let fruit;
let fruitCon;
let fruitCon2;
let bg;
let fruitImg;
let bunnyImg;
let bunny = {
    x: 420,
    y: 620,
    scale: 1.5
};

let animations = {
    blinking: [],
    eating: [],
    crying: []
};

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
let button2;
let bubbleImg;
let bubble = {
    x: 280,
    y: 420,
    size: 60
};
let bubbleAttached = false;

function preload() {

    bg = loadImage("assets/background.png");
    fruitImg = loadImage("assets/melon.png");
    bunnyImg = loadImage("assets/Rabbit-01.png");
    bubbleImg = loadImage("assets/bubble.png");

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


function setup() {
    createCanvas(500, 700);
    
    

    engine = Engine.create();
    world = engine.world;

    initLevels();

    /*
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

    blower = createImg("assets/balloon.png");
    blower.position(10, 200);
    blower.size(150, 100);
    blower.mouseClicked(airblow);

    bgSound.play();
    bgSound.setVolume(0.15);

    muteBtn = createImg("assets/mute.png");
    muteBtn.position(450, 20);
    muteBtn.size(50,50);
    muteBtn.mouseClicked(mute);
*/
    ellipseMode(RADIUS);
    rectMode(CENTER);
    imageMode(CENTER);
}

function draw() {
    background(51);

    if(bg) {
        image(bg, width /2, height /2, 490, 690);
    }
    
    if(engine) {
        Engine.update(engine);
    }

    if(ground) ground.display();
    if(higherground) higherground.display();
    if(rope) rope.display();
    if(rope2) rope2.display();
    if(rope3) rope3.display();

    if(fruit != null ) {
        image(fruitImg, fruit.position.x, fruit.position.y, 70, 70);
    }

    if(bubbleAttached && fruit != null) {
        image(bubbleImg, fruit.position.x, fruit.position.y, 100, 100);
        Matter.Body.applyForce(fruit, fruit.position, {x: 0, y: -0.0009});
    }

    if(currentLevel === 1 && !bubbleAttached) {
        image(bubbleImg, bubble.x, bubble.y, bubble.size, bubble.size);
    }
   

    checkGameState();
    drawBunny();
    drawHud();
    drawFade();

    /*
    if(fruit != null) {

        if(collide(fruit, ground.body, 80)) {
            bgSound.stop();
            sadSound.play();
            currentAnimation = "crying";
            frameIndex = 0;
            isGameOver = true;
            World.remove(world, fruit);
            fruit = null;
        }

        else if(collide(fruit, bunny, 80)) {
            eatingSound.play();
            currentAnimation = "eating";
            frameIndex = 0;
            World.remove(world, fruit);
            fruit = null;
        }

    }
    
    drawBunny();
   */

   // ellipse(fruit.position.x, fruit.position.y, 15);
} 

function drawBunny() {
    let frames = animations[currentAnimation];
    
    if(!frames || frames.length === 0) return;

    if(isGameOver && currentAnimation === "crying") {
        let img = frames[frames.length -1];
        imageMode(CENTER);
        image(img, bunny.x, bunny.y, 100 * bunny.scale, 100 * bunny.scale);
        return;
    }

    if(frameCount % frameDelay === 0 ) {
        frameIndex++;
        if(frameIndex >= frames.length) {
            frameIndex = 0;
            if(currentAnimation === "eating") {
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
    if(rope) {
        rope.break();
        if(cutSound && !cutSound.isPlaying()) cutSound.play();
    }
    if(fruitCon) {
        fruitCon.detach();
        fruitCon = null;
    }
   
}

function collide(body, target, distance) {
    if(body != null) {
        let tx = target.x || target.position?.x;
        let ty = target.y || target.position?.y;
        let d = dist(body.position.x, body.position.y, tx, ty);
        return d <= distance;
    }
    return false;
}

function airblow() {
    if(fruit && gameState ===  "playing") {
        Matter.Body.applyForce(fruit, fruit.position, { x: 0.01, y: 0});
        if(airSound && !airSound.isPlaying()) {
            airSound.play();
        }
    }
    
    
}

function mute() {
    if(bgSound.isPlaying()) {
        bgSound.stop();
    }
    else{
        bgSound.play();
    }
}

function mousePressed() {
    userStartAudio();
    if(bgSound && !bgSound.isPlaying()) {
        bgSound.loop();
    }
}