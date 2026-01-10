export const CHARACTER_OPTIONS = [
	{ name: "Matteo", tint: 0xffd166, spriteKey: "matteo" },
	{ name: "Fede", tint: 0x6c5ce7, spriteKey: "fede" },
	{ name: "Stanis", tint: 0x4ecdc4, spriteKey: "stanis" },
	{ name: "Noa", tint: 0xff6b6b, spriteKey: "noa" }
];

export function getCharacterConfig(name) {
	return CHARACTER_OPTIONS.find((option) => option.name === name);
}

export function getCharacterTint(name) {
	const config = getCharacterConfig(name);
	return config ? config.tint : undefined;
}

export function getCharacterSpriteKey(name) {
	const config = getCharacterConfig(name);
	return config ? config.spriteKey : undefined;
}
