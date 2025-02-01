import { backgroundPalmTrees, backgroundWaterReflects } from "./spriteLoader.js";
import createObject from "./entities/createObject.js";
import { ecs } from "./main.js";

export default function generateBackground() {
    const waterReflections = createObject(200, 700, "", 1500, 50, backgroundWaterReflects, undefined, 0, 0.1, undefined, undefined, false);
    ecs.addEntity(waterReflections);

    const forestYOffset = 100;
    // BACK PALMS START
    const obj3 = createObject(350, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 0, 0.2, undefined, undefined, false);
    ecs.addEntity(obj3);
    const obj1 = createObject(200, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 1, 0.1, undefined, undefined, false);
    ecs.addEntity(obj1);
    const obj2 = createObject(100, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 2, 0.09, undefined, undefined, false);
    ecs.addEntity(obj2);
    const obj4 = createObject(600, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 3, 0.08, undefined, undefined, false);
    ecs.addEntity(obj4);
    const obj5 = createObject(350 + 500, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 4, 0.07, undefined, undefined, false);
    ecs.addEntity(obj5);
    const obj6 = createObject(200 + 500, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 5, 0.11, undefined, undefined, false);
    ecs.addEntity(obj6);
    const obj7 = createObject(100 + 500, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 6, 0.12, undefined, undefined, false);
    ecs.addEntity(obj7);
    const obj8 = createObject(600 + 500, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 7, 0.13, undefined, undefined, false);
    ecs.addEntity(obj8);
    const obj9 = createObject(350 + 800, 500 + forestYOffset, "", 180, 180, backgroundPalmTrees, undefined, 8, 0.14, undefined, undefined, false);
    ecs.addEntity(obj9);
    const obj10 = createObject(200 + 1200, 400 + forestYOffset, "", 320, 320, backgroundPalmTrees, undefined, 9, 0.15, undefined, undefined, false);
    ecs.addEntity(obj10);
    const obj11 = createObject(100 + 1000, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 10, 0.16, undefined, undefined, false);
    ecs.addEntity(obj11);
    const obj12 = createObject(600 + 1000, 550 + forestYOffset, "", 160, 160, backgroundPalmTrees, undefined, 11, 0.17, undefined, undefined, false);
    ecs.addEntity(obj12);
    // BACK PALMS END
}