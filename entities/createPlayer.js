import InputComponent from "../components/inputComponent.js"
import { PlayerDataComponent } from "../components/playerDataComponent.js"
import PositionComponent from "../components/positionComponent.js"
import VelocityComponent from "../components/velocityComponent.js"
import VisualComponent from "../components/visualComponent.js"
import CollisionComponent from "../components/collisionComponent.js"
import StateComponent from "../components/stateComponent.js"
import Entity from "./entity.js"
import HealthComponent from "../components/healthComponent.js"

// Create an Entity player with components attached to it
export default function createPlayer(x, y, vx, vy, color, width, height){
   const player = new Entity();
   player.addComponent('input', new InputComponent());
   player.addComponent('data', PlayerDataComponent);
   player.addComponent('position', new PositionComponent(x, y));
   player.addComponent('velocity', new VelocityComponent(vx, vy));
   player.addComponent('visual', new VisualComponent(color, width, height))
   player.addComponent('state', new StateComponent());
   player.addComponent('health', new HealthComponent(3))
   //player.addComponent('collision', new CollisionComponent("box", {width:32, height: 32}));
   return player;
}