# Epic Kids Agent Handbook

## Purpose
This project is a Phaser 3 port of Sunny Land that we will evolve into Epic Kids. Core gameplay already works; our near-term tasks focus on rebranding (title, characters, map swaps) while preserving platformer mechanics.

## How to Run
- No build tooling is configured; the repo is plain JS/Phaser. Serve the root folder with any static server (for example `npx http-server .`), then open the served URL.
- Type definitions live under [types/](types) to keep VS Code hints accurate.

## Scene & Gameplay Flow
1. **Boot scene** in [src/main.js](src/main.js) loads `assets/preload-pack.json`, then hands off to **Preloader**.
2. **Preloader** in [src/scenes/Preloader.js](src/scenes/Preloader.js) draws a loading bar (`loading` sprite), streams `assets/asset-pack.json`, and jumps to **TitleScreen**.
3. **TitleScreen** in [src/scenes/TitleScreen.js](src/scenes/TitleScreen.js) scrolls background layers, blinks the "press enter" prompt, and alternates between title art and instruction card before launching **CharacterSelect**.
4. **CharacterSelect** in [src/scenes/CharacterSelect.js](src/scenes/CharacterSelect.js) lets players choose between Matteo, Fede, Stanis, or Noa (tints applied as placeholders) before gameplay.
5. **Level** in [src/scenes/Level.js](src/scenes/Level.js) builds the tilemap, spawns collectibles/enemies via prefabs, wires keyboard + touch controls, and maintains the camera follow + collision logic.

## Prefabs & Components
- Prefabs under [src/prefabs/](src/prefabs) (e.g., Player, Frog, Eagle, collectibles, FX) encapsulate sprite setup plus any unique behavior.
- Shared behaviors live in [src/components/](src/components):
  - `CharacterMoveComp` handles hovering flyers.
  - `ControllerButtonComp` maps HUD buttons to pseudo-input.
  - `FixedToCameraComp` pins UI elements to the camera.
- FX helpers such as `EnemyDeath` and `FeedbackItem` get instantiated from Level when stomping enemies or picking items.

## Assets & Data
- Asset packs: `assets/preload-pack.json` only loads the loading bar; `assets/asset-pack.json` lists backgrounds, buttons, atlases, tilemap JSON, etc. Update these when swapping art.
- World layout: `assets/maps/map.json` (Tiled JSON) backed by `assets/environment/tileset.png`. Collision tiles are set explicitly in `Level.initColliders()`.
- Atlases: environment props (`atlas-props`) and character/enemy sprites (`atlas`). Animation JSON lives in `assets/animations.json`.

## Controls & Inputs
- Keyboard: arrows for movement/crouch, SPACE/UP for jump.
- Touch: three HUD buttons (`left-button`, `right-button`, `jump-button`) drive the same logic via `ControllerButtonComp`.
- Player hurt logic and stomp detection happen in `Level.checkAgainstEnemies()`; collectibles trigger `FeedbackItem` popups in `pickItem()`.

## Known Gaps / Questions
- No documented npm/phaser dependency workflow; confirm whether to add a package.json or rely on globally served Phaser build.
- Scoring/HUD is limited to pickup FX—decide if Epic Kids needs UI counters or win states beyond clearing enemies.
- Character selection feature does not exist yet; determine UI scene/location plus asset requirements.
- Map variety is single `map.json`; clarify if Epic Kids needs multiple maps or dynamic loading.
