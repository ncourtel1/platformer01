export default class RespawnSystem{
   update(entities){
      for(const entity of entities){
         const health = entity.getComponent("health");
         const position = entity.getComponent("position")
         const input = entity.getComponent("input");     
         const data = entity.getComponent("data");
         const sprite = entity.getComponent('sprite');
         const state = entity.getComponent('state');

         if(input && health){
            if(health.currentHealth != health.oldCurrent && health.loseLife){
               sprite.setState('dead');
               sprite.setState('dead');
               health.dead = true;
               //console.log("respawn")
               //position.x = position.startX
               //position.y = position.startY
               health.loseLife = false;
            } else if (health.dead)
            {
               sprite.setState('idle');
               sprite.setState('idle');
               health.dead = false;
               position.x = position.startX
               position.y = position.startY
               
            }
         }
      }
   }
}

 