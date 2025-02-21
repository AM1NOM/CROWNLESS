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
      "up-left": ["x", -1, "y", -0.5],  // Diagonal
      "up-right": ["x", 1, "y", -0.5],  // Diagonal
      "down-left": ["x", -1, "y", 0.5], // Diagonal
      "down-right": ["x", 1, "y", 0.5], // Diagonal
    };

    this.activeKeys = new Set(); // Track multiple keys at once

    if (this.isPlayerControlled) {
      this.addTouchControls();
      this.addKeyboardControls();
    }
  }

  update(state) {
    this.updatePosition();
    this.updateSprite(state);

    if (this.isPlayerControlled && this.movingProgressRemaining === 0) {
      const inputDirection = window.playerInput || state.arrow;
      if (inputDirection) {
        this.direction = inputDirection;
        this.movingProgressRemaining = 8; // Faster movement
      }
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const update = this.directionUpdate[this.direction];

      if (update.length === 2) {
        this[update[0]] += update[1] * 2; // Normal movement
      } else {
        this[update[0]] += update[1] * 2; // X movement
        this[update[2]] += update[3] * 2; // Y movement
      }

      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state) {
    if (this.isPlayerControlled && this.movingProgressRemaining === 0 && !window.playerInput && !state.arrow) {
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
    controls.style.touchAction = "none";

    const directions = {
      "up-left": [1, 1],
      "up": [1, 2],
      "up-right": [1, 3],
      "left": [2, 1],
      "right": [2, 3],
      "down-left": [3, 1],
      "down": [3, 2],
      "down-right": [3, 3]
    };

    Object.keys(directions).forEach(direction => {
      const button = document.createElement("button");
      const icon = document.createElement("img");
      icon.src = `./images/icons/${direction}.png`;
      icon.style.width = "100%";
      icon.style.height = "100%";
      icon.style.objectFit = "contain";

      button.appendChild(icon);
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.background = "rgba(0, 0, 0, 0.7)";
      button.style.border = "2px solid white";
      button.style.borderRadius = "10px";
      button.style.gridColumn = directions[direction][1];
      button.style.gridRow = directions[direction][0];
      button.style.userSelect = "none";
      button.style.touchAction = "none";

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

  addKeyboardControls() {
    document.addEventListener("keydown", (e) => {
      this.activeKeys.add(e.key);

      const diagonalCombinations = {
        "ArrowUpArrowLeft": "up-left",
        "ArrowUpArrowRight": "up-right",
        "ArrowDownArrowLeft": "down-left",
        "ArrowDownArrowRight": "down-right",
      };

      const keys = Array.from(this.activeKeys).sort().join("");
      if (diagonalCombinations[keys]) {
        window.playerInput = diagonalCombinations[keys];
      } else {
        const keyMap = {
          "ArrowUp": "up",
          "ArrowDown": "down",
          "ArrowLeft": "left",
          "ArrowRight": "right",
          "w": "up",
          "s": "down",
          "a": "left",
          "d": "right",
        };
        if (keyMap[e.key]) {
          window.playerInput = keyMap[e.key];
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      this.activeKeys.delete(e.key);
      window.playerInput = null;
    });
  }
}
