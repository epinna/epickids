
// You can write more code here

/* START OF COMPILED CODE */

import Cherry from "../prefabs/Cherry.js";
import Gem from "../prefabs/Gem.js";
import Frog from "../prefabs/Frog.js";
import Eagle from "../prefabs/Eagle.js";
import CharacterMoveComp from "../components/CharacterMoveComp.js";
import Opossum from "../prefabs/Opossum.js";
import Player from "../prefabs/Player.js";
import FixedToCameraComp from "../components/FixedToCameraComp.js";
import ControllerButtonComp from "../components/ControllerButtonComp.js";
/* START-USER-IMPORTS */
import EnemyDeath from "../prefabs/EnemyDeath.js";
import FeedbackItem from "../prefabs/FeedbackItem.js";
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// map
		const map = this.add.tilemap("map");
		map.addTilesetImage("tileset", "tileset");

		// spaceKey
		const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		// leftKey
		const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKey
		const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// upKey
		const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// downKey
		const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

		// back3
		const back3 = this.add.image(0, 0, "back");
		back3.setOrigin(0, 0);

		// back2
		const back2 = this.add.image(768, 0, "back");
		back2.setOrigin(0, 0);

		// back1
		const back1 = this.add.image(384, 0, "back");
		back1.setOrigin(0, 0);

		// middle5
		const middle5 = this.add.image(528, 80, "middle");
		middle5.setOrigin(0, 0);

		// middle4
		const middle4 = this.add.image(704, 80, "middle");
		middle4.setOrigin(0, 0);

		// middle3
		const middle3 = this.add.image(880, 80, "middle");
		middle3.setOrigin(0, 0);

		// middle2
		const middle2 = this.add.image(176, 80, "middle");
		middle2.setOrigin(0, 0);

		// middle1
		const middle1 = this.add.image(352, 80, "middle");
		middle1.setOrigin(0, 0);

		// middle
		const middle = this.add.image(0, 80, "middle");
		middle.setOrigin(0, 0);

		// layer
		const layer = map.createLayer("Tile Layer 1", ["tileset"], 0, 0);

		// tree
		const tree = this.add.image(496, 67, "atlas-props", "tree");
		tree.setOrigin(0, 0);

		// bush
		const bush = this.add.image(160, 132, "atlas-props", "bush");
		bush.setOrigin(0, 0);

		// sign
		const sign = this.add.image(176, 300, "atlas-props", "sign");
		sign.setOrigin(0, 0);

		// skulls
		const skulls = this.add.image(240, 310, "atlas-props", "skulls");
		skulls.setOrigin(0, 0);

		// face_block
		const face_block = this.add.image(368, 304, "atlas-props", "face-block");
		face_block.setOrigin(0, 0);

		// shrooms
		const shrooms = this.add.image(448, 320, "atlas-props", "shrooms");
		shrooms.setOrigin(0, 0);

		// house
		const house = this.add.image(768, 53, "atlas-props", "house");
		house.setOrigin(0, 0);

		// cherry
		const cherry = new Cherry(this, 480, 80);
		this.add.existing(cherry);

		// cherry_1
		const cherry_1 = new Cherry(this, 496, 80);
		this.add.existing(cherry_1);

		// cherry_2
		const cherry_2 = new Cherry(this, 512, 80);
		this.add.existing(cherry_2);

		// cherry_3
		const cherry_3 = new Cherry(this, 368, 273);
		this.add.existing(cherry_3);

		// cherry_4
		const cherry_4 = new Cherry(this, 400, 272);
		this.add.existing(cherry_4);

		// cherry_5
		const cherry_5 = new Cherry(this, 384, 272);
		this.add.existing(cherry_5);

		// gem
		const gem = new Gem(this, 64, 96);
		this.add.existing(gem);

		// gem_1
		const gem_1 = new Gem(this, 48, 96);
		this.add.existing(gem_1);

		// gem_2
		const gem_2 = new Gem(this, 80, 96);
		this.add.existing(gem_2);

		// gem_3
		const gem_3 = new Gem(this, 672, 256);
		this.add.existing(gem_3);

		// gem_1_1
		const gem_1_1 = new Gem(this, 672, 208);
		this.add.existing(gem_1_1);

		// gem_2_1
		const gem_2_1 = new Gem(this, 704, 192);
		this.add.existing(gem_2_1);

		// frog
		const frog = new Frog(this, 240, 144);
		this.add.existing(frog);

		// frog_1
		const frog_1 = new Frog(this, 553, 324);
		this.add.existing(frog_1);

		// eagle
		const eagle = new Eagle(this, 528, 96);
		this.add.existing(eagle);

		// eagle_2
		const eagle_2 = new Eagle(this, 96, 96);
		this.add.existing(eagle_2);

		// opossum
		const opossum = new Opossum(this, 678, 147);
		this.add.existing(opossum);

		// opossum_1
		const opossum_1 = new Opossum(this, 368, 320);
		this.add.existing(opossum_1);

		// player
		const player = new Player(this, 738, 121);
		this.add.existing(player);
		player.flipX = true;
		player.flipY = false;

		// left_button
		const left_button = this.add.image(26, 170, "left-button");
		left_button.scaleX = 0.39899614692006335;
		left_button.scaleY = 0.39899614692006335;
		left_button.tintTopLeft = 16627125;

		// right_button
		const right_button = this.add.image(70, 170, "right-button");
		right_button.scaleX = 0.39899614692006335;
		right_button.scaleY = 0.39899614692006335;
		right_button.tintTopLeft = 16627125;

		// jump_button
		const jump_button = this.add.image(262, 170, "jump-button");
		jump_button.scaleX = 0.39899614692006335;
		jump_button.scaleY = 0.39899614692006335;
		jump_button.tintTopLeft = 16627125;

		// lists
		const items = [cherry, cherry_1, cherry_2, cherry_3, cherry_4, cherry_5, gem, gem_1, gem_2, gem_3, gem_1_1, gem_2_1];
		const enemies = [frog_1, frog, opossum_1, opossum, eagle, eagle_2];

		// colliderPlayerVsLayer
		const colliderPlayerVsLayer = this.physics.add.collider(player, layer);

		// colliderEnemiesVsLayer
		const colliderEnemiesVsLayer = this.physics.add.collider(enemies, layer);

		// overlapPlayerVsItems
		const overlapPlayerVsItems = this.physics.add.overlap(player, items, this.pickItem, undefined, this);

		// overlapPlayerVsEnemies
		const overlapPlayerVsEnemies = this.physics.add.overlap(player, enemies, undefined, this.checkAgainstEnemies, this);

		// eagle (components)
		const eagleCharacterMoveComp = new CharacterMoveComp(eagle);
		eagleCharacterMoveComp.deltaY = 50;
		eagleCharacterMoveComp.duration = 1000;

		// eagle_2 (components)
		const eagle_2CharacterMoveComp = new CharacterMoveComp(eagle_2);
		eagle_2CharacterMoveComp.deltaY = 50;
		eagle_2CharacterMoveComp.duration = 1000;

		// left_button (components)
		new FixedToCameraComp(left_button);
		new ControllerButtonComp(left_button);

		// right_button (components)
		new FixedToCameraComp(right_button);
		new ControllerButtonComp(right_button);

		// jump_button (components)
		new FixedToCameraComp(jump_button);
		new ControllerButtonComp(jump_button);

		this.layer = layer;
		this.player = player;
		this.left_button = left_button;
		this.right_button = right_button;
		this.jump_button = jump_button;
		this.map = map;
		this.spaceKey = spaceKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.upKey = upKey;
		this.downKey = downKey;
		this.items = items;
		this.enemies = enemies;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layer;
	/** @type {Player} */
	player;
	/** @type {Phaser.GameObjects.Image} */
	left_button;
	/** @type {Phaser.GameObjects.Image} */
	right_button;
	/** @type {Phaser.GameObjects.Image} */
	jump_button;
	/** @type {Phaser.Tilemaps.Tilemap} */
	map;
	/** @type {Phaser.Input.Keyboard.Key} */
	spaceKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	leftKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	rightKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	upKey;
	/** @type {Phaser.Input.Keyboard.Key} */
	downKey;
	/** @type {Array<Cherry|Gem>} */
	items;
	/** @type {Array<Frog|Opossum|Eagle>} */
	enemies;

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		this.initColliders();

		this.initCamera();
	}

	initCamera() {

		const camera = this.cameras.main;
		camera.setBounds(0, 0, this.layer.width, this.layer.height);
		camera.startFollow(this.player, true);
	}


	update() {

		if (this.player.hurtFlag) {

			return;
		}

		const body = this.player.getBody();

		const controllerLeft = ControllerButtonComp.getComponent(this.left_button);
		const controllerRight = ControllerButtonComp.getComponent(this.right_button);
		const controllerJump = ControllerButtonComp.getComponent(this.jump_button);

		const jumpDown = this.upKey.isDown || this.spaceKey.isDown || controllerJump.isDown;
		const leftDown = this.leftKey.isDown || controllerLeft.isDown;
		const rightDown = this.rightKey.isDown || controllerRight.isDown;

		if (jumpDown && body.onFloor()) {

			this.player.body.velocity.y = -170;
		}

		var vel = 150;

		if (leftDown) {

			this.player.body.velocity.x = -vel;
			this.player.play("player/run/player-run", true);
			this.player.flipX = true;

		} else if (rightDown) {

			this.player.body.velocity.x = vel;
			this.player.play("player/run/player-run", true);
			this.player.flipX = false;

		} else {

			this.player.body.velocity.x = 0;

			if (this.downKey.isDown) {

				this.player.play("player/crouch/player-crouch", true);

			} else {

				this.player.play("player/idle/player-idle", true);
			}
		}

		// jump animation

		if (this.player.body.velocity.y < 0) {

			this.player.play("player/jump/player-jump-1", true);

		} else if (this.player.body.velocity.y > 0) {

			this.player.play("player/jump/player-jump-2", true);
		}
	}

	initColliders() {

		this.map.setCollision([27, 29, 31, 33, 35, 37, 77, 81, 86, 87, 127, 129, 131, 133, 134, 135, 83, 84, 502, 504, 505, 529, 530, 333, 335, 337, 339, 366, 368, 262, 191, 193, 195, 241, 245, 291, 293, 295]);
		this.setTopCollisionTiles([35, 36, 84, 86, 134, 135, 366, 367, 368, 262]);
	}

	/**
	 * @param {Player} player
	 * @param {Phaser.GameObjects.Sprite} enemy
	 */
	checkAgainstEnemies(player, enemy) {

		if ((player.y + player.body.height * 0.5 < enemy.y) && player.body.velocity.y > 0) {

			this.add.existing(new EnemyDeath(this, enemy.x, enemy.y));

			enemy.destroy();

			player.body.velocity.y = -200;

		} else {

			this.player.hurtPlayer();
		}
	}	

	/**
	 * @param {Player} player
	 * @param {Phaser.GameObjects.Sprite} item
	 */
	pickItem(player, item) {

		this.add.existing(new FeedbackItem(this, item.x, item.y));

		item.destroy();
	}

	/**
	 * @param {number[]} tiles
	 */
	setTopCollisionTiles(tiles) {

		const tileSet = new Set(tiles);

		for (let x = 0; x < this.map.width; x++) {

			for (let y = 0; y < this.map.height; y++) {

				const tile = this.layer.getTileAt(x, y);

				if (tile && tileSet.has(tile.index)) {

					tile.setCollision(false, false, true, false);
				}
			}
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
