
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FeedbackItem extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 154, y ?? 80, texture || "atlas", frame ?? "item-feedback/item-feedback-1");

		this.play("item-feedback/item-feedback");

		/* START-USER-CTR-CODE */
		this.once("animationcomplete", () => {

			this.destroy();
		});
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
