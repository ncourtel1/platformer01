export default class CollisionSystem {
  update(entities) {
     for(let i = 0; i < entities.length; i++){
        for(let j = i + 1; j < entities.length; j++){
           const entityA = entities[i];
           const entityB = entities[j];

           if(this.checkOverlap(entityA, entityB)){
              this.handleCollision(entityA, entityB);
           }
        }
     }
  }

  checkOverlap(entityA, entityB){
     const visualA = entityA.getComponent('visual');
     const visualB = entityB.getComponent('visual');
     const posA = entityA.getComponent('position');
     const posB = entityB.getComponent('position');
     const stateA = entityA.getComponent('state');
     const stateB = entityB.getComponent('state');
     if (
        posA.x < posB.x + visualB.width &&
        posA.x + visualA.width > posB.x &&
        posA.y < posB.y + visualB.height &&
        posA.y + visualA.height > posB.y
     ) {
        return true; // Les entités se chevauchent
     }
     return false;
  }

  handleCollision(entityA, entityB){
     const stateA = entityA.getComponent('state');
     const stateB = entityB.getComponent('state');
     stateA.isColliding = true;
     stateB.isColliding = true;
     console.log("Collision Detected");
  }
}