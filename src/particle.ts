import settings from './settings';

export class Particle {
    position: Vector = Vector.random(settings.width, settings.height);
    velocity: Vector = new Vector(0, 0);
    accleration: Vector = new Vector(0, 0);
    maxspeed: number = 4;
    previousPosition: Vector = this.position.clone();
    graphics: PIXI.Graphics;

    constructor(public stage: PIXI.Container, x?: number, y?: number) {
        if (x && y) {
            this.position.x = x;
            this.position.y = y;
        }
        this.graphics = new PIXI.Graphics().lineStyle(2, settings.color, settings.particuleAlpha);
        this.graphics.moveTo(this.previousPosition.x, this.previousPosition.y);
        stage.addChild(this.graphics);
    }

    follow(vectors: Vector[][]) {
        var x = Math.floor((this.position.x) / settings.scale);
        var y = Math.floor((this.position.y) / settings.scale);
        var force = vectors[x][y];
        this.applyForce(force);
    }

    update() {
        this.velocity.add(this.accleration.mult(settings.acclerationFactor));
        // this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.accleration.mult(0);
        this.velocity.mult(settings.velocityFactor);
    }

    applyForce(force: Vector) {
        this.accleration.add(force).add(Vector.random(200,200).add(new Vector(-100,-100)).mult(settings.randomFactor));
    }

    show() {
        // this.graphics.lineStyle(1,settings.color,.1);
        this.graphics.moveTo(this.previousPosition.x, this.previousPosition.y);
        this.graphics.lineTo(this.position.x, this.position.y);
        this.updatePrevious();
    }

    updatePrevious() {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    edges() {
        if (this.position.x > settings.width) {
            this.position.x = 0;
            this.updatePrevious();
        }
        if (this.position.x < 0) {
            this.position.x = settings.width;
            this.updatePrevious();
        }
        if (this.position.y > settings.height) {
            this.position.y = 0;
            this.updatePrevious();
        }
        if (this.position.y < 0) {
            this.position.y = settings.height;
            this.updatePrevious();
        }
    }

}


export class Vector {

    constructor(public x: number, public y: number) { }

    static random(maxX: number, maxY: number): Vector {
        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);
        return new Vector(x, y);
    }

    add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    mult(fact: number): Vector {
        this.x *= fact;
        this.y *= fact;
        return this;
    }

    limit(max: number) {
        this.x = (Math.abs(this.x) > max) ? (this.x * 0.9) : this.x;
        this.y = (Math.abs(this.y) > max) ? (this.y * 0.9) : this.y;
    }

    clone = (): Vector => new Vector(this.x, this.y);

    static fromAngle(angle: number): Vector {
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new Vector(x, y);
    }
}