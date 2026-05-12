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
    
    ground = new Ground(200, 690, 600, 20);

    rope = new Rope(6, {x: 245, y:30});

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

function winLevel() {
    gameState = "win";

    let stars = calculateStars();
    saveProgress(currentLevel, stars);

    setTimeout(() => {
        nextLevel();
    }, 1500);
}

function loseLevel() {
    gameState = "lose";

}

//proxima fase

function nextLevel() {
    if(currentLevel + 1 < levels.length) {
        loadLevel(currentLevel + 1);
    } else {
        console.log("Voce zerou o jogo!");
    }
}

//sistema de estrelas

function calculateStars() {
    let stars = 3;

    if(frameCount > 600) stars = 2;
    if(frameCount > 1000) stars = 1;

    return stars;
}

//salvar progresso

function saveProgress(level, stars) {
    if(level >= playerProgress.unlockedLevel) {
        playerProgress.unlockedLevel = level +1;
    }

    playerProgress.stars[level] = stars;

    localStorage.setItem("gameProgress", JSON.stringify(playerProgress));
}

//carregar progresso

function loadProgress() {
    let saved = localStorage.getItem("gameProgress");

    if(saved) {
        playerProgress = JSON.parse(saved);
    }
}

//hud

function drawHud() {
    fill(255);
    textSize(18);
    textAlign(LEFT);

    text("Fase: " + (currentLevel + 1), 20, 30);

    if(playerProgress.stars[currentLevel]) {
        text("⭐: " + playerProgress.stars[currentLevel], 20, 60);

    }

    if(gameState === "win") {
        textSize(32);
        text("YOU WIN!", width/2 - 80, height/2);

    }

    if(gameState === "lose") {
        textSize(32);
        text("TRY AGAIN!", width/2 -100, height/2);
    }
}

//transicao


let fading = false;

function startFade() {
    fading = true;
    fadeAlpha = 0;
}

function drawFade() {
    if(fading) {
        fadeAlpha += 10;

        fill(0, fadeAlpha);
        Reflect(0, 0, width, height);

        if(fadeAlpha >= 255) {
            fading = false;
        }
    }
}