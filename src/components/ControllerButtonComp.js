
// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "../../phaserjs_editor_scripts_base/UserComponent.js";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class ControllerButtonComp extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__ControllerButtonComp"] = this;

		/* START-USER-CTR-CODE */

		this.gameObject.setInteractive();

		/* END-USER-CTR-CODE */
	}

	/** @returns {ControllerButtonComp} */
	static getComponent(gameObject) {
		return gameObject["__ControllerButtonComp"];
	}

	/** @type {Phaser.GameObjects.Image} */
	gameObject;

	/* START-USER-CODE */

	isDown = false;

	update() {

		this.isDown = false;

		for (const pointer of this.scene.game.input.pointers) {

			if (pointer.isDown) {

				const [obj] = this.scene.input.hitTestPointer(pointer);

				if (obj === this.gameObject) {

					this.isDown = true;

					return;
				}
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
