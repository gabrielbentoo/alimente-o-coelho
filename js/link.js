class Link {
    constructor(rope, body) {
        this.rope = rope;
        this.body = body;
        let lastLink = this.rope.body.bodies.length -2;
        this.link = Matter.Constraint.create(
            {
                bodyA: this.rope.body.bodies[lastLink],
                pointA: {x: 0, y:0},
                bodyB: this.body,
                pointB: {x:0, y:0},
                length: 2,
                stiffness: 0.04
            }
        );
        Matter.World.add(engine.world, this.link);
    }
    detach() {
        if(this.link) {
            Matter.World.remove(world, this.link);
            this.link  = null;
        }
        
    }
}