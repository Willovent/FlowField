import settings from './settings';
import { Particle } from './particle';
import { Vector } from './vector';

let Noise = (<any>window).Noise;
var renderer = PIXI.autoDetectRenderer(settings.width, settings.height, { backgroundColor: 0xffffff });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.interactive = true;
stage.filters = [new PIXI.filters.BlurFilter(8, 8)]
stage.hitArea = new PIXI.Rectangle(0, 0, settings.width, settings.height);
let pOffset = .01;

let cols = Math.floor(settings.width / settings.scale);
let rows = Math.floor(settings.height / settings.scale);
let flowField: Vector[][] = [];
const noiseGen = new Noise(Math.random());
for (var i = 0; i <= cols; i++) {
    flowField.push([])
    for (var j = 0; j <= rows; j++) {
        var angle = noiseGen.perlin3(j * settings.perlinFactor, i * settings.perlinFactor, pOffset) * Math.PI * 2 * 4;
        var vector = Vector.fromAngle(angle)
        flowField[i].push(vector);
        if (settings.displayVector) {
            var graphic = new PIXI.Graphics().lineStyle(2, 0xff, 0.2);
            var position = new Vector(i * settings.scale, j * settings.scale);
            graphic.moveTo(position.x, position.y);
            position.add(vector.clone().mult(settings.scale));
            graphic.lineTo(position.x, position.y);
            stage.addChild(graphic);
        }
    }
}

let particules: Particle[] = [];

for (var i = 0; i < settings.particulesNumber; i++) {
    particules.push(new Particle(stage));
}

setInterval(() => {
    for (let particule of particules) {
        particule.position = Vector.random(settings.width, settings.height);
        particule.updatePrevious();
    }
}, 10e3);

(<any>stage).mousedown = (event) => {
    var coordinates = event.data.getLocalPosition(stage);
    for (var i = -10; i < 10; i++)
        for (var j = -10; j < 10; j++) {
            particules.push(new Particle(stage, i + coordinates.x, j + coordinates.y));
        }
};

requestAnimationFrame(animate);
function animate() {
    // for (var i = 0; i <= cols; i++) {
    //     flowField.push([])
    //     for (var j = 0; j <= rows; j++) {
    //         var angle = noiseGen.perlin2(j * settings.perlinFactor, i * settings.perlinFactor, pOffset) * Math.PI * 2 * 4;
    //         var vector = Vector.fromAngle(angle)
    //         flowField[i][j] = vector;
    //     }
    // }

    for (let particule of particules) {
        particule.follow(flowField);
        particule.update();
        particule.edges();
        particule.show();
    }
    pOffset += .005;

    renderer.render(stage);
    requestAnimationFrame(animate);
}
