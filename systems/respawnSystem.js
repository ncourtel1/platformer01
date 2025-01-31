export default class RespawnSystem{
   update(entities){
      for(const entity of entities){
         const health = entity.getComponent("health");
         const position = entity.getComponent("position")
         const input = entity.getComponent("input");     
         const data = entity.getComponent("data");
         if(input && health){
            if(health.currentHealth != health.oldCurrent){
               position.x = data.xStart
               position.y = data.yStart
            }
         }
      }
   }
}