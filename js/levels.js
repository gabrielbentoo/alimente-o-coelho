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
    levelFinished = false;
    levels[index]();
}

// limpar mundo

function clearWorld() {
    clearUI();
    clearUIElements();

    if(world) {
        Matter.Composite.clear(world, false);
        Matter.Engine.clear(engine);
    }

    ground = null;
    higherground = null;
    rope = null;
    rope2 = null;
    rope3 = null;
    fruit = null;
    fruitCon = null;
    fruitCon2 = null;
    blower = null; 
    button = null;
    button2 = null;

    bubbleAttached = false;

    /* if(button) button.remove();
    if(button2) button2.remove();
    if(blower) blower.remove(); */
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
    //World.add(world, fruit);
    
    fruitCon = new Link(rope, fruit);

    createUI();
}

//fase 2


function level2() {
    console.log("Fase 2 carregada!");

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(200, 690, 600, 20);
    higherground = new Ground(300, 170, 100, 10);

    bunny.x = 300;
    bunny.y = 110;

    rope2 = new Rope(4, {x:250, y:300});
    rope3 = new Rope(4, {x:60, y:350});

    let fruitOptions = {
        density: 0.001,

    }

    fruit = Bodies.circle(150, 300, 15, fruitOptions);
    // Composite.add(rope.body, fruit);
    //World.add(world, fruit);
    Composite.add(rope2.body, fruit);
    Composite.add(rope3.body, fruit);

    fruitCon = new Link(rope2, fruit);
    fruitCon2 = new Link(rope3, fruit);

    createUI2();
}

//UI

function createUI() {
    clearUIElements();
    //botao cortar
    button = createImg("assets/cut-btn.png");
    button.position(843, 30);
    button.size(50, 50);
    button.mouseClicked(() => {
        //if(rope) rope.break();
        if(fruitCon){
            fruitCon.detach();
            fruitCon = null;
        } 
    });

    //blower
    blower = createImg("assets/balloon.png");
    blower.position(617, 400);
    blower.size(100, 100);
    blower.mouseClicked(airblow);
}

function createUI2() {
     clearUIElements();
    //botao cortar
    button = createImg("assets/cut-btn.png");
    button.position(835,290);
    button.size(50, 50);
    button.mouseClicked(() => {
       // if(rope2) rope2.break();
        if(fruitCon) {
            fruitCon.detach();
            fruitCon = null;
        }
    });

    //botao 2 
    button2 = createImg("assets/cut-btn.png");
    button2.position(670, 340);
    button2.size(50, 50);
    button2.mouseClicked(() => {
        if(rope3) rope3.break();
        if(fruitCon2) {
            fruitCon2.detach();
            fruitCon2 = null;
        }
    });


    //blower
    blower = createImg("assets/balloon.png");
    blower.position(617, 400);
    blower.size(100, 100);
    blower.mouseClicked(airblow);
}

//sistema de resultado

function checkGameState() {
    if(levelFinished) return;
    if(!fruit) return;
    if(fruit.position.y < -50 || fruit.position.x < -50 || fruit.position.x > width +50) {
        levelFinished = true;
        gameState = "lose";
        currentAnimation = "crying";
        frameIndex = 0;
        isGameOver = true;

        if(bgSound) bgSound.stop();
        if(sadSound) sadSound.play();

        Matter.World.remove(world, fruit);
        fruit = null;
        bubbleAttached = false;

        if(blower) {
            blower.remove();
            blower = null;
        }
        return; 
    }

    if(currentLevel === 1 && !bubbleAttached && collide(fruit, bubble, 60)) {
            bubbleAttached = true;
        }

    if(fruit.position.y >= height -40) {
        levelFinished = true;
        gameState = "lose";
        currentAnimation = "crying";
        frameIndex = 0;
        isGameOver = true;

        if(bgSound) bgSound.stop();
        if(sadSound) sadSound.play();
        
        Matter.World.remove(world, fruit);
        fruit = null;

        if(blower) {
            blower.remove();
            blower = null;
        }
        return;
    }
        
   if(collide(fruit, bunny, 60)) {
    levelFinished = true;
    gameState = "win";
    currentAnimation = "eating";
    frameIndex = 0;

    if(eatingSound) eatingSound.play();
    Matter.World.remove(world,fruit);
    fruit = null;

    if(blower) {
        blower.remove();
        blower = null;
    }

    let stars = calculateStars();
    saveProgress(currentLevel, stars);
    setTimeout(() => {
        nextLevel();

    },  1500)
   }

}


//win / lose

function winLevel() {
    if(levelFinished) return;
    levelFinished = true;
    gameState = "win";

    let stars = calculateStars();
    saveProgress(currentLevel, stars);

    setTimeout(() => {
        nextLevel();
    }, 1500);
}

function loseLevel() {
    if(levelFinished) return;
    levelFinished = true;
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


function createLevel2UI() {
    button = createImg("assets/cut-btn.png");
    button.position(210,300);
    button.size(50,50);
    button.mouseClicked(() => {
        //if(rope) rope.break();
        if(fruitCon) {
            fruitCon.detach();
            fruitCon = null;
        }
    });

    button2 = createImg("assets/cut-btn.png");
    button2.position(40,420);
    button2.size(50,50);
    button2.mouseClicked(() => {
        //if(rope2) rope2.break();
        if(fruitCon2) {
            fruitCon2.detach();
            fruitCon2 = null;
        }
    });
    blower = createImg("assets/balloon.png");
    blower.position(10, 250);
    blower.size(120, 80);
    blower.mouseClicked(airblow);
}

function clearUIElements() {
    if(button) button.remove();
    if(button2) button2.remove();
    if(blower) blower.remove();
}