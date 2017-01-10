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