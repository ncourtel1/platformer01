export default class InputComponent{
   constructor(){
      this.x = 0;
      this.y = 0;
      this.keys = new Set();
      this.jumpPressed = false;

      window.addEventListener("keydown", (e) =>{
         console.log(e.keyCode);
         this.keys.add(e.key);
      })
      window.addEventListener("keyup", (e) =>{
         this.keys.delete(e.key);
         console.log("key up")
      })
   }

   update(){
      this.x = 0;
      this.y = 0;
      if(this.keys.has("d") && this.keys.has("a")) this.x = 0;
      else if(this.keys.has("d")) this.x = 1;
      else if(this.keys.has("a")) this.x = -1;
      
      if(this.keys.has(" ")){
         this.jumpPressed = true;
         console.log("jump pressed");
      } 
   }
}