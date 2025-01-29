export default class CameraSystem{
   // constructor(gameContainer, player, cameraWidth, cameraHeight){
   //    this.gameContainer = gameContainer;
   //    this.player = player;
   //    this.cameraWidth = cameraWidth;
   //    this.cameraHeight = cameraHeight;

   //    this.camera = document.querySelector('.camera');
   //    this.camera.style.width = `${this.cameraWidth}px`;
   //    this.camera.style.height = `${this.cameraHeight}px`;
   // }

   // update(){
   //    const playerPosition = this.player.getComponent('position');
   //    const playerVisual = this.player.getComponent('visual');

   //    if(playerPosition){
   //       let offsetX = playerPosition.x - this.cameraWidth/2 + ((playerPosition.x + playerVisual.width)/2);
   //       let offsetY = playerPosition.y - this.cameraHeight/2 + ((playerPosition.y + playerVisual.height)/2) 
   //       let offsetYMax = 200;

   //       // Empêcher la caméra de sortir des limites de la carte
   //       offsetX = Math.max(0, Math.min(offsetX, this.gameContainer.offsetWidth - this.cameraWidth));
   //       offsetY = Math.max(0, Math.min(offsetY, this.gameContainer.offsetHeight - this.cameraHeight));

   //       offsetY = Math.min(offsetYMax, offsetY);
   //       // Déplacer la game-container pour simuler le déplacement de la caméra
   //       this.gameContainer.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
   //    }
   // }
}