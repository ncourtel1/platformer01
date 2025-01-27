export default class CollisionSystem {
   update(entities) {
     // Réinitialise l'état des entités (collisions, grounded)
     entities.forEach(entity => {
       const state = entity.getComponent('state');
       if (state) {
         state.isColliding = false;
         //state.isGrounded = false;
       }
     });
 
     // Parcours les entités pour vérifier les collisions
     for (let i = 0; i < entities.length; i++) {
       const entityA = entities[i];
       const inputA = entityA.getComponent('input');
 
       if (!inputA) continue; // Ignore les entités sans input (joueur contrôlé)
 
       for (let j = 0; j < entities.length; j++) {
         if (i === j) continue; // Évite les comparaisons avec soi-même
 
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
 
     // Vérifie si les boîtes des deux entités se chevauchent
     if (
       posA.x < posB.x + visualB.width &&
       posA.x + visualA.width > posB.x &&
       posA.y < posB.y + visualB.height &&
       posA.y + visualA.height > posB.y
     ) {
       return true;
     }
     return false;
   }
 
   handleCollision(entityA, entityB) {
     const visualA = entityA.getComponent('visual');
     const visualB = entityB.getComponent('visual');
     const posA = entityA.getComponent('position');
     const posB = entityB.getComponent('position');
     const stateA = entityA.getComponent('state');
 
     // Calcul du chevauchement horizontal et vertical
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
         posA.x = posB.x - visualA.width; // Collision sur la gauche
         console.log("Collision horizontale (gauche)");
       } else {
         posA.x = posB.x + visualB.width; // Collision sur la droite
         console.log("Collision horizontale (droite)");
       }
     } else {
       // Collision verticale
       if (posA.y < posB.y) {
         // Collision avec le haut de l'objet B (plateforme ou sol)
         posA.y = posB.y - visualA.height;
         stateA.isGrounded = true; // L'entité est sur le sol
         console.log("Collision verticale (sol)");
       } else {
            // Collision avec le bas de l'objet B (plafond)
            posA.y = posB.y + visualB.height;
            console.log("Collision verticale (plafond)");
         }
     }
 
     // Marque l'entité comme étant en collision
     stateA.isColliding = true;
   }
 }