export default class InputComponent{
   constructor(){
      this.x = 0;
      this.y = 0;
      this.keys = new Set();
      this.jumpPressed = false;
      this.facingRight = false;
      this.facingLeft = false;

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
      if(this.keys.has("d") && this.keys.has("a")){
         this.x = 0;
         this.facingRight = false;
         this.facingLeft = false; 
      } 
      else if(this.keys.has("d")){
         this.x = 1;
         this.facingRight = true;
         this.facingLeft = false;
      } 
      else if(this.keys.has("a")){
         this.x = -1;
         this.facingLeft = true;
         this.facingRight = false;
      } 
      
      if(this.keys.has(" ")){
         this.jumpPressed = true;
      } else this.jumpPressed = false;
   }
}