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

    // Load the animation sprite sheet
    this.animationImage = new Image();
    this.animationImage.src = config.animationSrc;

    this.hooi = new Image();
    this.hooi.src = config.h1src;

    this.f1i = new Image();
    this.f1i.src = config.f1src;
  }

  // Helper method to generate a random grid position

  // Draw the lower image
  drawLowerImage(ctx, cameraPerson, k, l) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(k - 0.5) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l - 0.5) - cameraPerson.y
    );
  }

  hooii(ctx, cameraPerson, k, l) {
    ctx.drawImage(
      this.hooi,
      utils.withGrid(k - 0.5) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l - 0.5) - cameraPerson.y
    );
  }

  f1f(ctx, cameraPerson, k, l) {
    ctx.drawImage(
      this.f1i,
      utils.withGrid(k - 0.5) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l - 0.5) - cameraPerson.y
    );
  }

  drawwall(ctx, cameraPerson, k, l) {
    ctx.drawImage(
      this.wallim,
      utils.withGrid(k) - cameraPerson.x, // Use the pre-generated randomX
      utils.withGrid(l) - cameraPerson.y
    );
  }

  // Draw the upper image
  drawUpperImage(ctx, cameraPerson, k, l) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(k + 0.5) - cameraPerson.x,
      utils.withGrid(l) - cameraPerson.y
    );
  }

  // Draw the animation
  drawAnimation(ctx, cameraPerson, k, l, frame) {
    ctx.drawImage(
      this.animationImage,
      0, // Source y
      frame * 240, // Source x
      96, // Source width
      240, // Source height
      utils.withGrid(k) - cameraPerson.x, // Destination x
      utils.withGrid(l) - cameraPerson.y, // Destination y
      96, // Destination width
      240 // Destination height
    );
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "./images/maps/redr.png",
    wallsr: "./images/maps/sun.webp",
    upperSrc: "./images/maps/door.png",
    animationSrc: "./images/maps/borj-sat.png", // Path to your animation sprite she
    h1src: "./images/maps/h1.png",
    f1src: "./images/maps/f1.png",
  gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
    }
  },
}