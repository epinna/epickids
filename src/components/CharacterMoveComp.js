
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "../../phaserjs_editor_scripts_base/UserComponent.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class CharacterMoveComp extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__CharacterMoveComp"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {CharacterMoveComp} */
	static getComponent(gameObject) {
		return gameObject["__CharacterMoveComp"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;
	/** @type {number} */
	deltaX = 0;
	/** @type {number} */
	deltaY = 0;
	/** @type {number} */
	duration = 0;

	/* START-USER-CODE */

	awake() {

		this.scene.tweens.add({
			targets: this.gameObject,
			duration: this.duration,
			x: this.gameObject.x + this.deltaX,
			y: this.gameObject.y + this.deltaY,
			yoyo: true,
			repeat: -1
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
