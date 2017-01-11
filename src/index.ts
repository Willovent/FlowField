import settings from './settings';
import 'pixi.js';
import { Noise } from 'noisejs';
import { Particle } from './particle';
import { Vector } from './vector';

var renderer = PIXI.autoDetectRenderer(settings.width, settings.height, { backgroundColor: 0xffffff });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
stage.interactive = true;
if (settings.blur) {
    stage.filters = [new PIXI.filters.BlurFilter(8, 8)]
}
stage.hitArea = new PIXI.Rectangle(0, 0, settings.width, settings.height);
let pOffset = .01;

let cols = Math.floor(settings.width / settings.scale);
let rows = Math.floor(settings.height / settings.scale);
let flowField: Vector[][] = [];
const noiseGen = new Noise(Math.random());
for (var i = 0; i <= cols; i++) {
    flowField.push([])
    for (var j = 0; j <= rows; j++) {
        var angle = noiseGen.perlin2(j * settings.perlinFactor, i * settings.perlinFactor) * Math.PI * 2 * 4;
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

(<any>stage).mousedown = (event) => {
    var coordinates = event.data.getLocalPosition(stage);
    let mouseVector = new Vector(coordinates.x, coordinates.y);
    for (var i = 0; i < settings.particulePerClick; i++) {
        let offSetVector = Vector.random(20, 20).add(-10);
        let particuleVector = mouseVector.clone().add(offSetVector);
        particules.push(new Particle(stage, particuleVector));
    }
};

requestAnimationFrame(animate);
function animate() {
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
