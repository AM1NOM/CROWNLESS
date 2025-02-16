let x1 = Math.floor(Math.random() * 10);
let y1 = Math.floor(Math.random() * 10);
let s1 = Math.floor(Math.random() * 10+4);
let x2 = Math.floor(Math.random() * (x1+s1));
let y2 = Math.floor(Math.random() * (y1+s1));
let s2 = Math.floor(Math.random() * 10+4);
let x3 = Math.floor(Math.random() * (x2+s2));
let y3 = Math.floor(Math.random() * (y2+s2));
let s3 = Math.floor(Math.random() * 10+4);
let x4 = Math.floor(Math.random() * (x3+s3));
let y4 = Math.floor(Math.random() * (y3+s3));
let s4 = Math.floor(Math.random() * 10+4);
let dx = Math.floor(Math.random() * (x1+s1-3) +2);
let dy = y1-2;
class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
   
 }
 

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction
        })
      })

      //Draw Lower layer
      for (let i = 0; i < s1; i++) {
        for (let j = 0; j < s1; j++) {
          this.map.drawLowerImage(this.ctx, cameraPerson,x1+i+0.5,y1+j);
        }
      }
      for (let i = 0; i < s2; i++) {
        for (let j = 0; j < s2; j++) {
          this.map.drawLowerImage(this.ctx, cameraPerson,x2+i+0.5,y2+j);
        }
      }
      for (let i = 0; i < s3; i++) {
        for (let j = 0; j < s3; j++) {
          this.map.drawLowerImage(this.ctx, cameraPerson,x3+i+0.5,y3+j);
        }
      }
      for (let i = 0; i < s4; i++) {
        for (let j = 0; j < s4; j++) {
          this.map.drawLowerImage(this.ctx, cameraPerson,x4+i+0.5,y4+j);
        }
      }

      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson,dx,dy);
      
      requestAnimationFrame(() => {
        step();   
      })
    }
    step();
 }

 init() {
  this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();
 }
}