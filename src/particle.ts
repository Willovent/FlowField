import settings from './settings';
import { Vector } from './vector';

export class Particle {
    position: Vector;
    velocity: Vector = new Vector(0, 0);
    accleration: Vector = new Vector(0, 0);
    maxspeed: number = 4;
    previousPosition: Vector;
    graphics: PIXI.Graphics;
    hasEnded: boolean = false;

    constructor(public stage: PIXI.Container, initialPosition?: Vector) {

        if (initialPosition) {
            this.position = initialPosition;
        } else {
            this.position = Vector.random(settings.width, settings.height);
        }

        this.previousPosition = this.position.clone();
        setTimeout(() => this.hasEnded = true, settings.particuleLifeTime * 1e3);

        this.graphics = new PIXI.Graphics().lineStyle(2, settings.color, settings.particuleAlpha);
        this.graphics.moveTo(this.previousPosition.x, this.previousPosition.y);
        stage.addChild(this.graphics);
    }

    follow(vectors: Vector[][]) {
        if (this.hasEnded) return;
        var x = Math.floor((this.position.x) / settings.scale);
        var y = Math.floor((this.position.y) / settings.scale);
        var force = vectors[x][y];
        this.applyForce(force);
    }

    update() {
        if (this.hasEnded) return;
        this.velocity.add(this.accleration.mult(settings.acclerationFactor));
        // this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.accleration.mult(0);
        this.velocity.mult(settings.velocityFactor);
    }

    applyForce(force: Vector) {
        this.accleration.add(force).add(Vector.random(200, 200).add(new Vector(-100, -100)).mult(settings.randomFactor));
    }

    show() {
        if (this.hasEnded) return;
        this.graphics.lineStyle(settings.particuleSize,settings.color,settings.particuleAlpha);
        this.graphics.moveTo(this.previousPosition.x, this.previousPosition.y);
        this.graphics.lineTo(this.position.x, this.position.y);
        this.updatePrevious();
    }

    updatePrevious() {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    edges() {
        if (this.hasEnded) return;
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