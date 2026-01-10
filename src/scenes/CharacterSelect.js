import { CHARACTER_OPTIONS } from "../data/characters.js";

export default class CharacterSelect extends Phaser.Scene {

	constructor() {
		super("CharacterSelect");

		/** @type {{ container: Phaser.GameObjects.Container, panel: Phaser.GameObjects.Rectangle, label: Phaser.GameObjects.Text, data: { name: string, tint: number } }[]} */
		this.characterOptions = [];
		this.selectedIndex = 0;
	}

	create() {

		this.createBackground();

		const previouslySelected = this.registry.get("selectedCharacter");
		const previousIndex = CHARACTER_OPTIONS.findIndex((option) => option.name === previouslySelected);
		this.selectedIndex = previousIndex >= 0 ? previousIndex : 0;

		this.add.text(144, 40, "Choose your hero", {
			fontSize: "14px",
			fontFamily: "PressStart2P, 'Press Start 2P', monospace",
			color: "#ffe066",
			align: "center",
			wordWrap: { width: 260 }
		}).setOrigin(0.5);

		this.add.text(144, 60, "Use arrows or tap", {
			fontSize: "10px",
			fontFamily: "PressStart2P, 'Press Start 2P', monospace",
			color: "#fdfae2",
			align: "center"
		}).setOrigin(0.5);

		this.createPreviewArea();
		this.createOptionList();
		this.registerInput();
		this.updateHighlight();
	}

	update() {

		if (this.background && this.middle) {
			this.background.tilePositionX += 0.2;
			this.middle.tilePositionX += 0.4;
		}
	}

	createBackground() {

		this.background = this.add.tileSprite(0, 0, 384, 240, "back").setOrigin(0, 0);
		this.middle = this.add.tileSprite(0, 80, 384, 368, "middle").setOrigin(0, 0);
		this.add.rectangle(144, 110, 260, 160, 0x000000, 0.2);
	}

		createPreviewArea() {

			this.previewFrame = this.add.rectangle(235, 140, 140, 170, 0xffffff, 0.04);

			this.previewSprite = this.add.image(235, 105, "matteo");
			this.previewSprite.setVisible(false);

			this.previewAvatar = this.add.rectangle(235, 110, 90, 90, 0xffffff, 0.15);

			this.previewCaption = this.add.text(235, 50, "Selected hero", {
				fontSize: "10px",
				fontFamily: "PressStart2P, 'Press Start 2P', monospace",
				color: "#ffe066",
				align: "center",
				wordWrap: { width: 140 }
			}).setOrigin(0.5);

			this.previewLabel = this.add.text(235, 170, "", {
				fontSize: "12px",
				fontFamily: "PressStart2P, 'Press Start 2P', monospace",
				color: "#fdfae2",
				align: "center",
				wordWrap: { width: 120 }
			});
			this.previewLabel.setOrigin(0.5, 0);
		}

	createOptionList() {

			const listX = 60;
			const baseY = 105;
			const rowSpacing = 34;

			this.characterOptions = CHARACTER_OPTIONS.map((option, index) => {

				const y = baseY + index * rowSpacing;
				const container = this.add.container(listX, y);
				container.setSize(120, 26);

				const panel = this.add.rectangle(0, 0, 120, 26, 0xffffff, 0.08);

				const label = this.add.text(0, 0, option.name, {
					fontSize: "10px",
				fontFamily: "PressStart2P, 'Press Start 2P', monospace",
				color: "#ffffff",
					align: "center"
			});
				label.setOrigin(0.5);

			container.add(panel);
			container.add(label);

			container.setInteractive({ useHandCursor: true });
			container.on("pointerover", () => {
				this.selectedIndex = index;
				this.updateHighlight();
			});
			container.on("pointerdown", () => {
				this.selectedIndex = index;
				this.confirmSelection();
			});

			return { container, panel, label, data: option };
		});
	}

	registerInput() {

		this.input.keyboard.on("keydown-UP", () => this.changeSelection(-1));
		this.input.keyboard.on("keydown-DOWN", () => this.changeSelection(1));
		this.input.keyboard.on("keydown-W", () => this.changeSelection(-1));
		this.input.keyboard.on("keydown-S", () => this.changeSelection(1));
		this.input.keyboard.on("keydown-ENTER", () => this.confirmSelection());
		this.input.keyboard.on("keydown-SPACE", () => this.confirmSelection());
		this.input.keyboard.on("keydown-ESC", () => this.scene.start("TitleScreen"));
	}

	changeSelection(delta) {

		const total = this.characterOptions.length;
		this.selectedIndex = (this.selectedIndex + delta + total) % total;
		this.updateHighlight();
	}

	updateHighlight() {

		this.characterOptions.forEach((option, index) => {
			const isActive = index === this.selectedIndex;
			option.panel.setFillStyle(0xffffff, isActive ? 0.2 : 0.08);
			option.label.setColor(isActive ? "#ffe066" : "#9fa5b1");
			option.container.setScale(isActive ? 1.07 : 1);
		});

			const activeOption = this.characterOptions[this.selectedIndex];
			if (activeOption) {
			const { tint, spriteKey, name } = activeOption.data;
			if (spriteKey) {
				this.previewSprite.setTexture(spriteKey);
				this.scalePreviewSprite();
				this.previewSprite.setVisible(true);
				this.previewAvatar.setVisible(false);
			} else {
				this.previewSprite.setVisible(false);
				this.previewAvatar.setVisible(true);
				this.previewAvatar.setFillStyle(tint ?? 0xffffff, 1);
			}

			this.previewLabel.setText(name);
			}
	}

	scalePreviewSprite() {

		const maxWidth = 120;
		const maxHeight = 110;
		const width = this.previewSprite.width;
		const height = this.previewSprite.height;

		if (!width || !height) {
			return;
		}

		const scale = Math.min(maxWidth / width, maxHeight / height);
		this.previewSprite.setScale(scale);
	}

	confirmSelection() {

		const option = this.characterOptions[this.selectedIndex];

		if (!option) {
			return;
		}

		this.registry.set("selectedCharacter", option.data.name);
		this.scene.start("Level");
	}
}
