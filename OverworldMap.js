class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    // Load lower and upper images
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.wallim = new Image();
    this.wallim.src = config.wallsr;


    // Generate a random number once at the start
    
  }

  // Helper method to generate a random grid position
  

  // Draw the lower image
  drawLowerImage(ctx, cameraPerson,k,l) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(k-0.5) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l-0.5) - cameraPerson.y
    );
  }

  drawwall(ctx, cameraPerson,k,l) {
    ctx.drawImage(
      this.wallim,
      utils.withGrid(k) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l) - cameraPerson.y
    );
  }

  // Draw the upper image
  drawUpperImage(ctx, cameraPerson,k,l) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(k+0.5) - cameraPerson.x,
      utils.withGrid(l) - cameraPerson.y
    );
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "./images/maps/redr.png",
    wallsr: "./images/maps/wallr.png",
    upperSrc: "./images/maps/door.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      
    }
  },
}