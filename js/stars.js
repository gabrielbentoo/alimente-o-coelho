class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.collected = false;
        this.size = 40;
    }

    display() {
        if(this.collected) return;
        image(starImg, this.x, this.y, this.size, this.size);
    }

    collect() {
        if(this.collected) return;
        this.collected = true;
        collectedStars++;
    }
}