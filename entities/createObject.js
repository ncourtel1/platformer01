import PositionComponent from "../components/positionComponent.js"
import VisualComponent from "../components/visualComponent.js"
import CollisionComponent from "../components/collisionComponent.js"
import StateComponent from "../components/stateComponent.js"
import SpriteComponent from "../components/spriteComponent.js"
import VelocityComponent from "../components/velocityComponent.js"
import Entity from "./entity.js"

// Create Entity object with components attached to it 
export default function createObject(x, y, color , width, height, states, particles, offset, speed, sx, sy, canCollide, isProjectile, tag){
   const object = new Entity();
   object.addComponent('position', new PositionComponent(x, y));
   object.addComponent('visual', new VisualComponent(color, width, height))
   object.addComponent('state', new StateComponent(canCollide, isProjectile, tag));
   object.addComponent('sprite', new SpriteComponent(states, particles, offset, speed, sx, sy))
   object.addComponent('velocity', new VelocityComponent())
   //object.addComponent('collision', new CollisionComponent("box", {width:32, height: 32}));
   return object;
} 