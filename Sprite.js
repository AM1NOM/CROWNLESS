class Sprite {
  constructor(config) {

    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = "./images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-jump" : [[0,0]],
      "idle-down" : [ [0,0] ],
      "idle-right": [ [0,1] ],
      "idle-up"   : [ [0,2] ],
      "idle-left" : [ [0,3] ],
      "walk-jump" : [[0,0]],
      "walk-down" : [ [1,0],[0,0],[2,0],[0,0] ],
      "walk-right": [ [1,1],[0,1],[2,1],[0,1] ],
      "walk-up"   : [ [1,2],[0,2],[2,2],[0,2] ],
      "walk-left" : [ [1,3],[0,3],[2,3],[0,3] ],
    
      // 🔥 Add diagonal animations
      "idle-up-right": [ [0,4] ],  
      "idle-up-left": [ [0,3] ],   
      "idle-down-right": [ [0,1] ], 
      "idle-down-left": [ [0,3] ],  
    
      "walk-up-right": [ [1,4],[0,4],[2,4],[0,4] ],
      "walk-up-left": [ [1,3],[0,3],[2,3],[0,3] ],
      "walk-down-right": [ [1,1],[0,1],[2,1],[0,1] ],
      "walk-down-left": [ [1,3],[0,3],[2,3],[0,3] ]
    };
    
    this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    const anim = this.animations[this.currentAnimation];
    if (!anim) {
      console.warn(`Missing animation: "${this.currentAnimation}"`);
      return [0, 0]; // fallback frame
    }
    return anim[this.currentAnimationFrame] || anim[0]; // fallback to first frame
  }
  

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }


  }
  

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);


    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32, frameY * 64,
      32,64,
      x,y,
      32,64
    )

    this.updateAnimationProgress();
  }

}