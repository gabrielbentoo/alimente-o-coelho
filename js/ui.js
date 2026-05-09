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
        text("⭐: " + stars, 20, 60);

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
    text("YOU WIN!", width/2, height/2 -40);

    let stars = calculateStars();

    textSize(24);
    fill(255);
    text("Estrelas: " + "⭐".repeat(stars), width/2, height/2);

    createUiButton("Next", width/2 - 60, height/2 + 40, () => {
        nextLevel();
        clearUI();
    });
}