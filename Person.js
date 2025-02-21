class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      "up": ["y", -0.5],
      "down": ["y", 0.5],
      "left": ["x", -0.5],
      "right": ["x", 0.5],
    };

    if (this.isPlayerControlled) {
      this.addTouchControls();
    }
  }

  update(state) {
    this.updatePosition();
    this.updateSprite(state);

    if (this.isPlayerControlled && this.movingProgressRemaining === 0) {
      if (window.playerInput) {
        this.direction = window.playerInput;
        this.movingProgressRemaining = 8; // Faster movement
      }
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change * 2; // Move faster
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !window.playerInput) {
      this.sprite.setAnimation("idle-" + this.direction);
      return;
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }

  addTouchControls() {
    const controls = document.createElement("div");
    controls.style.position = "absolute";
    controls.style.bottom = "20px";
    controls.style.left = "20px";
    controls.style.display = "grid";
    controls.style.gridTemplateColumns = "60px 60px 60px";
    controls.style.gridTemplateRows = "60px 60px 60px";
    controls.style.gap = "5px";
    controls.style.touchAction = "none"; // Prevent scrolling issues

    const directions = {
      "up": [1, 2],
      "left": [2, 1],
      "right": [2, 3],
      "down": [3, 2],
    };

    Object.keys(directions).forEach(direction => {
      const button = document.createElement("button");
      button.innerText = direction.toUpperCase();
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.fontSize = "14px";
      button.style.background = "rgba(0, 0, 0, 0.7)";
      button.style.color = "white";
      button.style.border = "2px solid white";
      button.style.borderRadius = "10px";
      button.style.gridColumn = directions[direction][1];
      button.style.gridRow = directions[direction][0];
      button.style.userSelect = "none"; // Prevent selection issues
      button.style.touchAction = "none"; // Prevent scrolling interference

      button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        window.playerInput = direction;
      });

      button.addEventListener("mousedown", (e) => {
        e.preventDefault();
        window.playerInput = direction;
      });

      button.addEventListener("touchend", () => {
        window.playerInput = null;
      });

      button.addEventListener("mouseup", () => {
        window.playerInput = null;
      });

      controls.appendChild(button);
    });

    document.body.appendChild(controls);
  }
}
