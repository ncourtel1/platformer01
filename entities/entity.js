// Entity class for object of the game
// it have unique ID, you can and get ccompenents of this Entity
export default class Entity{
   constructor() {
      this.components = {};
      this.id = crypto.randomUUID();
   }

   addComponent(name, component){
      this.components[name] = component;
   }

   getComponent(name){
      return this.components[name];
   }
}