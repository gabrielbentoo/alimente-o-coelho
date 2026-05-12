//chave do local storage

const SAVE_KEY = "bunny_game_progress";

//estrutura padrao

function getDefaultProgress() {
    return {
        unlockedLevel: 0,
        stars: {} //exemplo: {0:3, 1:2}
    };
}

//salvar progresso

function saveGame(progress) {
    try{
        localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
        console.log("Progresso salvo!");
    } catch (e) {
        console.error("Erro ao salvar:", e);
    }
}

//carregar progresso

function loadGame() {
    try {
        let data = localStorage.getItem(SAVE_KEY);

        if(!data) {
            console.log("Nenhum save encontrado, criando novo...");
            return getDefaultProgress();
        }

        let parsed = JSON.parse(data);

        //seguranca
        return {
            unlockedLevel: parsed.unlockedLevel ?? 0,
            stars: parsed.stars ?? {}
        };
   }
    catch (e) {
        console.error("Erro ao carregar save:", e);
        return getDefaultProgress()
    }
}

//atualizar progresso

function updateProgress(level, stars) {
    
    let progress = loadGame();

    //desbloqueia proxima fase  
    if(level >= progress.unlockedLevel) {
        progress.unlockedLevel = level +1;
    }

    //salva estrelas
    if(!progress.stars[level] || stars > progress.stars[level]) {
        progress.stars[level] = stars;
    }

    saveGame(progress);
}

//resetar progresso

function resetProgress() {
    localStorage.removeItem(SAVE_KEY);
    console.log("Progresso resetado!");
}

//pegar estrelas de uma fase

function getStars(level) {
    let progress = loadGame();
    return progress.stars[level] || 0;
}

//verificar fase desbloqueada

function isLevelUnlocked(level) {
    let progress = loadGame();
    return level <= progress.unlockedLevel;
}