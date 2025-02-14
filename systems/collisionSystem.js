import { ecs, loadNextLevel } from "../main.js";
import createObject from "../entities/createObject.js";
import { mapSprite } from "../spriteLoader.js";
import MenuSystem from "./menuSystem.js";
import { getMenuSys, getTimerSys } from "../initializeSystems.js";

export default class CollisionSystem {
  constructor(timerSys) {
    this.timerSys = timerSys;
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
        const audio = entityB.getComponent("audio");
        audio.sounds.get("key").play();
        ecs.removeEntity(entityA);
        console.log("key");
      } else if (stateB.tag == "keyChess") {
        stateA.canFinish = true;
        const audio = entityA.getComponent("audio");
        audio.sounds.get("key").play();
        ecs.removeEntity(entityB);
        console.log("key");
      }
    }

    // Handle Health Bonus
    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateA.tag == "healthBonus") {
        healthB.addHealth(1);
        const audio = entityB.getComponent("audio");
        audio.sounds.get("plop").play();
        audio.sounds.get("drink").play();
        ecs.removeEntity(entityA);
      } else if (stateB.tag == "healthBonus") {
        healthA.addHealth(1);
        const audio = entityA.getComponent("audio");
        audio.sounds.get("plop").play();
        audio.sounds.get("drink").play();
        ecs.removeEntity(entityB);
      }
    }

    // Handle Time Bonus
    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateA.tag == "timeBonus") {
        this.timerSys.addTime();
      } else if (stateB.tag == "timeBonus") {
        this.timerSys.addTime();
      }
    }
  }

  trapCollision(entityA, entityB) {
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const inputA = entityA.getComponent("input");
    const inputB = entityB.getComponent("input");
    const healthA = entityA.getComponent("health");
    const healthB = entityB.getComponent("health");

    if ((inputA && stateB) || (stateA && inputB)) {
      if (stateB.tag == "trap" && !stateA.levelFinish) {
        const audio = entityA.getComponent("audio");
        audio.sounds.get("hurt").play();
        healthA.removeHealth(1);
      } else if (stateA.tag == "trap" && !stateB.levelFinish) {
        const audio = entityB.getComponent("audio");
        audio.sounds.get("hurt").play();
        healthB.removeHealth(1);
      }
    }
  }
  // Handle chess collision for new level
  checkEndLevel(entityA, entityB) {
    const stateA = entityA.getComponent("state");
    const stateB = entityB.getComponent("state");
    const positionA = entityA.getComponent("position");
    const positionB = entityB.getComponent("position");
    const visualA = entityA.getComponent("visual");
    const visualB = entityB.getComponent("visual");
    const spriteA = entityA.getComponent("sprite");
    const spriteB = entityB.getComponent("sprite");
    const inputA = entityA.getComponent("input");
    const inputB = entityB.getComponent("input");
    if ((inputA && stateB) || (stateA && inputB)) {
      if (
        stateA.tag == "chess" &&
        stateB.canFinish &&
        spriteA.currentState == "locked"
      ) {
        stateB.levelFinish = true;
        const audio = entityB.getComponent("audio");
        audio.sounds.get("loot").play();
        audio.sounds.get("wood").play();
        spriteA.setState("unlocked");
        spriteA.setState("unlocked");
        getTimerSys().pauseTimer();
        let velocity = entityB.getComponent("velocity");
        velocity.vx = 0;
        velocity.vy = 0;
        ecs.removeEventListeners(["blur", "focus"]);
        setTimeout(() => {
          spriteA.setState("opened");
          spriteA.setState("opened");
          const map = createObject(
            positionA.x + 21,
            positionA.y - 70,
            "",
            visualA.width / 1.5,
            visualA.height / 1,
            mapSprite,
            undefined,
            undefined,
            0.2,
            undefined,
            undefined,
            false,
            false,
            "map"
          );
          ecs.addEntity(map);
        }, 500);
      } else if (
        stateB.tag == "chess" &&
        stateA.canFinish &&
        spriteB.currentState == "locked"
      ) {
        stateA.levelFinish = true;
        const audio = entityA.getComponent("audio");
        audio.sounds.get("loot").play();
        audio.sounds.get("wood").play();
        spriteB.setState("unlocked");
        spriteB.setState("unlocked");
        getTimerSys().pauseTimer();
        let velocity = entityA.getComponent("velocity");
        velocity.vx = 0;
        velocity.vy = 0;
        ecs.removeEventListeners(["blur", "focus"]);
        setTimeout(() => {
          spriteB.setState("opened");
          spriteB.setState("opened");
          const map = createObject(
            positionB.x + 21,
            positionB.y - 70,
            "",
            visualB.width / 1.5,
            visualB.height / 1,
            mapSprite,
            undefined,
            undefined,
            0.2,
            undefined,
            undefined,
            false,
            false,
            "map"
          );
          ecs.addEntity(map);
        }, 500);
      }
    }
    if (
      stateA.tag == "map" &&
      spriteA.currentState == "unfold" &&
      spriteA.currentFrame >= spriteA.currentState.length + 1
    ) {
      spriteA.setState("map");
      spriteA.setState("map");

      setTimeout(() => {
        ecs.removeEventListeners(["keydown", "keyup", "keypress"]);
        getMenuSys().isIntermezzo = true;
        getMenuSys().togglePause(true);
      }, 1500);
    } else if (
      stateB.tag == "map" &&
      spriteB.currentState == "unfold" &&
      spriteB.currentFrame >= spriteB.currentState.length + 1
    ) {
      spriteB.setState("map");
      spriteB.setState("map");
      setTimeout(() => {
        ecs.removeEventListeners(["keydown", "keyup", "keypress"]);
        getMenuSys().isIntermezzo = true;
        getMenuSys().togglePause(true);
      }, 1500);
    }
  }
}
