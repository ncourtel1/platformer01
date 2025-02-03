export default class CollisionSystem {
  constructor(timerSys){
    this.timerSys = timerSys
  }
  update(entities) {
    // Réinitialisation des états
    entities.forEach((entity) => {
      const state = entity.getComponent("state");
      if (state) {
        state.isColliding = false;
        state.isGrounded = false;
      }
    });

    // Vérification des collisions
    for (let i = 0; i < entities.length; i++) {
      const entityA = entities[i];
      const inputA = entityA.getComponent("input");
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
    const visualA = entityA.getComponent("visual");
    const visualB = entityB.getComponent("visual");
    const posA = entityA.getComponent("position");
    const posB = entityB.getComponent("position");

    return (
      posA.x < posB.x + visualB.width &&
      posA.x + visualA.width > posB.x &&
      posA.y < posB.y + visualB.height &&
      posA.y + visualA.height > posB.y
    );
  }

  handleCollision(entityA, entityB) {
    const visualA = entityA.getComponent("visual");
    const visualB = entityB.getComponent("visual");
    const posA = entityA.getComponent("position");
    const posB = entityB.getComponent("position");
    const velA = entityA.getComponent("velocity");
    const velB = entityB.getComponent("velocity");
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const dataA = entityA.getComponent("data");
    const projectileA = entityA.getComponent("projectile");
    const projectileB = entityB.getComponent("projectile");

    this.checkItem(entityA, entityB);
    this.trapCollision(entityA, entityB);
    this.checkEndLevel(entityA, entityB);

    if (
      !stateA.canCollide ||
      !stateB.canCollide ||
      (projectileA && stateB.isProjectile) ||
      (projectileB && stateA.isProjectile)
    )
      return;

    if (!stateA.canCollide || !stateB.canCollide) return;
    // Calculer le centre des entités
    const centerA = {
      x: posA.x + visualA.width / 2,
      y: posA.y + visualA.height / 2,
    };
    const centerB = {
      x: posB.x + visualB.width / 2,
      y: posB.y + visualB.height / 2,
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

    if (overlapX >= overlapY) {
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

  checkItem(entityA, entityB) {
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const inputA = entityA.getComponent("input");
    const inputB = entityB.getComponent("input");
    const healthA = entityA.getComponent("health");
    const healthB = entityB.getComponent("health");

    // Handle Key for Opening Chess
    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateA.tag == "keyChess") {
        stateB.canFinish = true;
      } else if (stateB.tag == "keyChess") {
        stateA.canFinish = true;
      }
    }

    // Handle Health Bonus
    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateA.tag == "healthBonus") {
        healthB.addHealth(1);
      } else if (stateB.tag == "healthBonus") {
        healthA.addHealth(1);
      }
    }

    // Handle Time Bonus
    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateA.tag == "timeBonus") {
        this.timerSys.addTime()
      } else if (stateB.tag == "timeBonus") {
        this.timerSys.addTime()
      }
    }
  }

  trapCollision(entityA, entityB){
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const inputA = entityA.getComponent("input");
    const inputB = entityB.getComponent("input");
    const healthA = entityA.getComponent("health");
    const healthB = entityB.getComponent("health");

    if((inputA && stateB) || (stateA && inputB)){
      if(stateB.tag == "trap"){
        healthA.removeHealth(1);
      }else if(stateA.tag == "trap"){
        healthB.removeHealth(1);
      }
    }
  }
  // Handle chess collision for new level
  checkEndLevel(entityA, entityB){
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const inputA = entityA.getComponent("input");
    const inputB = entityB.getComponent("input");
  
    if((inputA && stateB) || (stateA && inputB)){
      if(stateA.tag == "chess" && stateB.canFinish){
        stateB.levelFinish = true;
      }else if(stateB.tag == "chess" && stateB.canFinish){
        stateA.levelFinish = true;
      }
    }
  }
}
