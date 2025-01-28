export default class CollisionSystem {
  update(entities) {
    // Réinitialisation des états (collisions, grounded)
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

      if (!inputA) continue; // Ignore les entités sans input

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
    const VelA = entityA.getComponent('velocity');
    const stateA = entityA.getComponent('state');

    const overlapX = Math.min(
      posA.x + visualA.width - posB.x,
      posB.x + visualB.width - posA.x
    );
    const overlapY = Math.min(
      posA.y + visualA.height - posB.y,
      posB.y + visualB.height - posA.y
    );

    if (overlapX < overlapY) {
      // Collision horizontale
      if (posA.x < posB.x) {
        posA.x = posB.x - visualA.width;
        VelA.vx = 0;
      } else {
        posA.x = posB.x + visualB.width;
        VelA.vx = 0;
      }
    } else {
      // Collision verticale
      if (posA.y < posB.y) {
        // Collision avec le haut de l'objet B (sol)
        posA.y = posB.y - visualA.height;
        VelA.vy = 0;
        stateA.isGrounded = true;
      } else{
        // Collision avec le bas de l'objet B (plafond)
        posA.y = posB.y + visualB.height;
        VelA.vy = 0;
      }
    }

    stateA.isColliding = true;
  }
}