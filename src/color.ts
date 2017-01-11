export class Color {
    red: ColorComp = new ColorComp();
    green: ColorComp = new ColorComp();
    blue: ColorComp = new ColorComp();

    toHexa(): number {
        return this.red.value * 0x10000 + this.green.value * 0x100 + this.blue.value;
    }

    update() {
        this.red.update();
        this.green.update();
        this.blue.update();
    }
}

class ColorComp {
    value: number;
    increment: number = 0;
    constructor() {
        this.value = Math.round(Math.random() * 255);
        while(this.increment == 0)
            this.increment = Math.round(Math.random() * 10) - 5;
    }

    update() {
        this.value += this.increment;
        if (this.value > 255) {
            this.value = 255;
            this.increment = Math.round(Math.random() * -5) - 1;
        } else if (this.value < 0) {
            this.value = 0;
            this.increment = Math.round(Math.random() * 5) + 1;
        }
    }
}