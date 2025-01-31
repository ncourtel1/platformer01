export default class CollisionSystem {
  update(entities) {
    // Réinitialisation des états
    entities.forEach(entity => {
      const state = entity.getComponent('state');
      if (state) {
        state.isColliding = false;
        state.isGrounded = false;
      }
    });

    // Vérification des collisions
    for (let i = 0; i < entities.length; i++) {
      const entityA = entities[i];
      const inputA = entityA.getComponent('input');
      const stateA = entityA.getComponent("state");
      //if (!inputA) continue;
      for (let j = 0; j < entities.length; j++) {
        if (i === j) continue;
        const entityB = entities[j];
        if (this.checkOverlap(entityA, entityB)) {
          this.handleCollision(entityA, entityB);
        }
      }
    }
  }

  checkOverlap(entityA, entityB) {
    const visualA = entityA.getComponent('visual');
    const visualB = entityB.getComponent('visual');
    const posA = entityA.getComponent('position');
    const posB = entityB.getComponent('position');
    

    return (
      posA.x < posB.x + visualB.width &&
      posA.x + visualA.width > posB.x &&
      posA.y < posB.y + visualB.height &&
      posA.y + visualA.height > posB.y
    );
  }

  handleCollision(entityA, entityB) {
    const visualA = entityA.getComponent('visual');
    const visualB = entityB.getComponent('visual');
    const posA = entityA.getComponent('position');
    const posB = entityB.getComponent('position');
    const velA = entityA.getComponent('velocity');
    const velB = entityB.getComponent('velocity');
    const stateA = entityA.getComponent('state');
    const stateB = entityB.getComponent('state');
    const dataA = entityA.getComponent('data');
    const projectileA = entityA.getComponent('projectile');
    const projectileB = entityB.getComponent('projectile');
    if (!stateA.canCollide || !stateB.canCollide || projectileA && stateB.isProjectile || projectileB && stateA.isProjectile) return;
    // Calculer le centre des entités
    const centerA = {
      x: posA.x + visualA.width / 2,
      y: posA.y + visualA.height / 2
    };
    const centerB = {
      x: posB.x + visualB.width / 2,
      y: posB.y + visualB.height / 2
    };

    // Calculer les chevauchements
    const overlapX = Math.min(
      posA.x + visualA.width - posB.x,
      posB.x + visualB.width - posA.x
    );
    const overlapY = Math.min(
      posA.y + visualA.height - posB.y,
      posB.y + visualB.height - posA.y
    );

    if (overlapX >= overlapY){
      // Collision verticale
      if (centerA.y < centerB.y) {
        // Collision par le haut
        posA.y = posB.y - visualA.height;
        velA.vy = 0;
        stateA.isGrounded = true;
      } else {
        //stateA.isGrounded = false;
        // Collision par le bas
        posA.y = posB.y + visualB.height;
        velA.vy = 0;
        // Seulement annuler la vélocité verticale si l'entité monte
        if (velA.vy < 0) {
          velA.vy = 0;
        }
      }
    }

    // Déterminer la direction de la collision
    if (overlapX < overlapY) {
      // Collision horizontale
      if (centerA.x < centerB.x) {
        posA.x = posB.x - visualA.width;
        velA.vx = 0;
      } else {
        posA.x = posB.x + visualB.width;
        velA.vx = 0;
      }
    } 
    
    stateA.isColliding = true;
    stateB.isColliding = true;

  }
}