import PositionComponent from "../components/positionComponent.js"
import VisualComponent from "../components/visualComponent.js"
import StateComponent from "../components/stateComponent.js"
import SpriteComponent from "../components/spriteComponent.js"
import ProjectileComponent from "../components/projectileComponent.js"
import audioComponent from "../components/audioComponent.js"
import Entity from "./entity.js"

// Create Entity object with components attached to it 
export default function createShooter(x, y, color , width, height, states, particles, offset, speed, canCollide, projectile, fireRate, flip, sounds){
   const object = new Entity();
   object.addComponent('position', new PositionComponent(x, y));
   object.addComponent('visual', new VisualComponent(color, width, height))
   object.addComponent('state', new StateComponent(canCollide));
   object.addComponent('sprite', new SpriteComponent(states, particles, offset, speed, undefined, undefined, flip))
   object.addComponent('projectile', new ProjectileComponent(projectile, fireRate));
   object.addComponent('audio', new audioComponent(sounds));
   //object.addComponent('collision', new CollisionComponent("box", {width:32, height: 32}));
   return object;
} 