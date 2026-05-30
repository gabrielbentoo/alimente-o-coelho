//estado de ui

let uiButtons = [];
let fadeAlpha = 0;
let isFading = false;
let fadeDirection = "in";

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
        drawWinScreen();

    } 

    if(gameState === "lose") {
        drawLoseScreen();
    }
}

//tela de vitoria

function drawWinScreen() {

    drawOverlay();

    textAlign(CENTER);
    textSize(36);
    fill("#00FFAA");
    text("VOCE GANHOU!", width/2, height/2 -40);

    let stars = calculateStars();

    textSize(24);
    fill(255);
    text("Estrelas: " + "⭐".repeat(stars), width/2, height/2);

    if(currentLevel +1 < levels.length) {
        createUiButton("Proximo", width/2  +100, height/2 +40, () => {
        nextLevel();
        clearUI();
        });
    }
    else{
        createUiButton("Fim!", width/2 -60, height/2 +30, () => {
            clearUI();
        });
        textSize(20);
        fill(255);
        text("Voce zerou o jogo", width/2, height/2 + 90);
    }
}

function drawLoseScreen() {
    drawOverlay();

    textAlign(CENTER);
    textSize(36);
    fill("#FF4C4C");
    text("VOCE PERDEU!", width/2, height/2 -40);
    
    createUiButton("Tente novamente!", width/2 +550 , height/2 + 40, () => {
        loadLevel(currentLevel);
        clearUI();
    });
}

function drawOverlay() {
    push();
    rectMode(CORNER);
    noStroke();
    fill(0, 180);
    rect(0, 0, width, height);
    pop();
}

function createUiButton(label, x, y, onClick) {
    if(uiButtons.find(btn => btn.label === label)) return;

    let btn = createButton(label);
    btn.position(x, y,);
    btn.size(120, 40);
    btn.style("font-size", "16px");
    btn.style("background", "#222");
    btn.style("color", "#FFF");
    btn.style("border", "none");
    btn.style("border-radius", "8px");
    btn.style("cursor", "pointer");
    btn.mousePressed(onClick);

    uiButtons.push(btn);
}

function clearUI() {
    uiButtons.forEach(btn => btn.remove());
    uiButtons = [];

}

function startFade(type = "out") {
    isFading = true;
    fadeDirection = type;
    fadeAlpha = (type === "in") ? 255 : 0;
}

function drawFade() {
    if(!isFading) return;
    
    if(fadeDirection === "out") {
        fadeAlpha += 10;
        if(fadeAlpha >= 255) {
            fadeAlpha = 255;
            isFading = false;
        }
        
    }
    if(fadeDirection === "in") {
        fadeAlpha -=10;

        if(fadeAlpha <= 0) {
            fadeAlpha = 0;
            isFading = false;
        }
    }

    push();
    rectMode(CORNER);
    noStroke();
    fill(0, fadeAlpha);
    rect(0, 0, width, height);
    pop();

}
 

function drawLoading(texto = "carregando...") {
    background(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255);
    text(texto, width/2, height/2);
}