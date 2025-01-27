export default class CollisionComponent{
   constructor(bodyComponent, collisionTag){
      this.bodyComponent = bodyComponent;
      this.collisionTag = collisionTag;
      this.collisionCallbacks = [];
   }

   // setCollisionCallback(targetCollisionTag, callback){
   //    this.collisionCallbacks[targetCollisionTag] = callback;
   // }
}