let x1 = Math.floor(Math.random() * 10);
let y1 = Math.floor(Math.random() * 10) - (x1%2)/2;
let s1 = Math.floor(Math.random() * 10+4);
let x2 = Math.floor(Math.random() * (x1+s1));
let y2 = Math.floor(Math.random() * (y1+s1)) - (x2%2)/2;
let s2 = Math.floor(Math.random() * 10+4);
let x3 = Math.floor(Math.random() * (x2+s2));
let y3 = Math.floor(Math.random() * (y2+s2)) - (x3%2)/2;
let s3 = Math.floor(Math.random() * 10+4);
let x4 = Math.floor(Math.random() * (x3+s3));
let y4 = Math.floor(Math.random() * (y3+s3)) - (x4%2)/2;
let s4 = Math.floor(Math.random() * 10+4);
let dx = Math.floor(Math.random() * (x1+s1-3) +x1+2);
let dy = y1-2;
class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;

    // Animation timing variables
    this.lastAnimationTime = 0;
    this.animationFrameDelay = 1000; // Delay between frames in milliseconds
    this.currentAnimationFrame = 0; // Track the current frame
  }

  

  startGameLoop() {
    const step = (timestamp) => {
      // Clear off the canvas
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
      
      this.map.drawLowerImage(this.ctx, cameraPerson,10,-10);
        
      this.map.drawwall(this.ctx, cameraPerson,-30,10);
      
      

      if (timestamp - this.lastAnimationTime > this.animationFrameDelay) {
        this.currentAnimationFrame = (this.currentAnimationFrame + 1) % 12; // Cycle through 12 frames
        this.lastAnimationTime = timestamp;
      }
      this.map.drawAnimation(this.ctx, cameraPerson, 10, 20, this.currentAnimationFrame);
      this.map.hooii(this.ctx, cameraPerson,-6,0);
      this.map.f1f(this.ctx, cameraPerson,10,4);


      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson,dx,dy);


      // Draw Animation (with frame delay)

      // Request the next frame
      requestAnimationFrame((timestamp) => {
        step(timestamp);
      });
    };

    // Start the game loop
    step(0);
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
  }
}