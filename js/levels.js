// configuracao global de fases 

let currentLevel = 0;
let levels = [];
let gameState = "playing";
let playerProgress = {
    unlockedLevel: 0,
    stars: {},
};

// inicializacao

function initLevels() {
    loadProgress();
    levels = [
        level1,
        level2
    ]
    loadLevel(currentLevel);
}

// carregamento de fase

function loadLevel(index) {
    clearWorld();
    currentLevel = index;
    gameState = "playing";
    levels[index]();
}

// limpar mundo

function clearWorld() {
    if(world) {
        Composite.clear(world, false);
        Engine.clear(engine);
    }
}

// fase 1

function level1() {
    console.log("Fase 1 carregada!");

    engine = Engine.create();
    world = engine.world;
    
    ground = new ground(200, 690, 600, 20);

    rope = new rope(6, {x: 245, y:30});

    let fruitOptions = {
        density: 0.001
    };

    fruit = Bodies.circle(300, 300, 15, fruitOptions);
    Composite.add(rope.body, fruit);
    
    fruitCon = new Link(rope, fruit);

    createUI();
}

//fase 2

let bubble = { x: 290, y: 460};

function level2() {
    console.log("Fase 2 carregada!");

    engine = Engine.create();
    world = engine.world;

    ground = new ground(200, 690, 600, 20);
    higherground = new ground(300, 170, 100, 10);

    rope = new Rope(4, {x:230, y:330});
    rope2 = new Rope(4, {x:60, y:450});

    fruit = Bodies.circle(100, 400, 15);
    Composite.add(rope.body, fruit);

    fruitCon = new Link(rope, fruit);
    fruitCon2 = new Link(rope2, fruit);

    createUI();
}

//UI

function createUI() {
    //botao cortar
    button = createImg("assets/cut-btn.png");
    button.position(930, 30);
    button.size(50, 50);
    button.mouseClicked(() => {
        if(rope) rope.break();
        if(fruitCon) fruitCon.detach();
    });

    //blower
    blower = createImg("assets/balloon.png");
    blower.position(600, 400);
    blower.size(100, 100);
    blower.mouseClicked(airblow);
}

//sistema de resultado

function checkGameState() {
    if(fruit != null) {
        //come
        if(collide(fruit, ground.body, 80)) {
            bgSound.stop();
            sadSound.play();
            currentAnimation = "crying";
            frameIndex = 0;
            isGameOver = true;
            World.remove(world, fruit);
            fruit = null;
            
            loseLevel();
        }

        else if(collide(fruit, bunny, 80)) {
            eatingSound.play();
            currentAnimation = "eating";
            frameIndex = 0;
            World.remove(world, fruit);
            fruit = null;

            winLevel();
        }
    }
}

//win / lose

