export default class InputComponent{
   constructor(){
      this.x = 0;
      this.y = 0;
      this.keys = new Set();
      this.jumpPressed = false;

      window.addEventListener("keydown", (e) =>{
         this.keys.add(e.key);
      })
      window.addEventListener("keyup", (e) =>{
         this.keys.delete(e.key);
      })
   }

   update(){
      this.x = 0;
      this.y = 0;
      if(this.keys.has("d") && this.keys.has("a")) this.x = 0;
      else if(this.keys.has("d")) this.x = 1;
      else if(this.keys.has("a")) this.x = -1;
      
      if(this.keys.has(" ")) this.jumpPressed = true;
   }
}