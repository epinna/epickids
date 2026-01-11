#!/usr/bin/env python3
"""Utility script to extract individual sprites from a TexturePacker atlas
and rebuild an atlas image from edited sprites.

Usage examples
--------------
Extract every sprite once:
    python sprit.py extract --atlas assets/atlas/atlas.png \
        --data assets/atlas/atlas.json --out sprites_export

Extract Matteo's dedicated atlas using the built-in paths:
    python sprit.py extract --character matteo

Re-apply edits back into a single atlas:
    python sprit.py apply --data assets/atlas/atlas.json \
        --sprites sprites_export --out assets/atlas/atlas.png

Rebuild Noa's atlas from her sprite folder using defaults:
    python sprit.py apply --character noa

Requires Pillow (``pip install pillow``).
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterable, Tuple, Optional

from PIL import Image


FrameEntry = dict

CHARACTER_TARGETS = {
    "matteo": {
        "atlas_png": "assets/atlas/matteo-atlas.png",
        "atlas_json": "assets/atlas/matteo-atlas.json",
        "sprites_dir": "sprites_export/matteo",
    },
    "fede": {
        "atlas_png": "assets/atlas/fede-atlas.png",
        "atlas_json": "assets/atlas/fede-atlas.json",
        "sprites_dir": "sprites_export/fede",
    },
    "stanis": {
        "atlas_png": "assets/atlas/stanis-atlas.png",
        "atlas_json": "assets/atlas/stanis-atlas.json",
        "sprites_dir": "sprites_export/stanis",
    },
    "noa": {
        "atlas_png": "assets/atlas/noa-atlas.png",
        "atlas_json": "assets/atlas/noa-atlas.json",
        "sprites_dir": "sprites_export/noa",
    },
}


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Split or rebuild a sprite atlas")
    subparsers = parser.add_subparsers(dest="command", required=True)

    extract_parser = subparsers.add_parser("extract", help="Create PNG files for each frame")
    extract_parser.add_argument("--atlas", help="Path to the atlas PNG image (defaults to the selected character)")
    extract_parser.add_argument("--data", help="Path to the atlas JSON metadata (defaults to the selected character)")
    extract_parser.add_argument("--out", help="Output directory for exported sprites (defaults to sprites_export/<character>)")
    extract_parser.add_argument("--character", choices=sorted(CHARACTER_TARGETS.keys()), help="Character name to use for preset paths")

    apply_parser = subparsers.add_parser("apply", help="Rebuild an atlas from edited sprite PNGs")
    apply_parser.add_argument("--data", help="Path to the atlas JSON metadata (defaults to the selected character)")
    apply_parser.add_argument("--sprites", help="Directory holding edited sprite PNGs (defaults to sprites_export/<character>)")
    apply_parser.add_argument("--out", help="Destination path for the rebuilt atlas PNG (defaults to the selected character path)")
    apply_parser.add_argument(
        "--base",
        help="Optional base atlas PNG to start from; otherwise a transparent canvas is used",
    )
    apply_parser.add_argument("--character", choices=sorted(CHARACTER_TARGETS.keys()), help="Character name to use for preset paths")

    return parser.parse_args()


def load_metadata(json_path: Path) -> Tuple[Iterable[FrameEntry], Tuple[int, int]]:
    with json_path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)

    frames = data.get("frames", [])
    meta_size = data.get("meta", {}).get("size", {})
    width = int(meta_size.get("w", 0))
    height = int(meta_size.get("h", 0))
    return frames, (width, height)


def build_sprite_path(base_dir: Path, frame_name: str) -> Path:
    rel = Path(frame_name)
    if rel.suffix:
        target = rel
    else:
        target = Path(f"{rel}.png")
    return base_dir / target


def extract_sprites(atlas_path: Path, json_path: Path, output_dir: Path) -> None:
    frames, _ = load_metadata(json_path)
    atlas = Image.open(atlas_path).convert("RGBA")
    output_dir.mkdir(parents=True, exist_ok=True)

    for entry in frames:
        frame_name = entry["filename"]
        frame = entry["frame"]
        x, y, w, h = frame["x"], frame["y"], frame["w"], frame["h"]
        sprite = atlas.crop((x, y, x + w, y + h))
        sprite_path = build_sprite_path(output_dir, frame_name)
        sprite_path.parent.mkdir(parents=True, exist_ok=True)
        sprite.save(sprite_path, format="PNG")
        print(f"Extracted {frame_name} -> {sprite_path}")


def apply_sprites(json_path: Path, sprites_dir: Path, output_path: Path, base_path: Path | None) -> None:
    frames, (width, height) = load_metadata(json_path)

    if base_path:
        canvas = Image.open(base_path).convert("RGBA")
    else:
        canvas = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))

    for entry in frames:
        frame_name = entry["filename"]
        sprite_path = build_sprite_path(sprites_dir, frame_name)
        if not sprite_path.is_file():
            raise FileNotFoundError(f"Missing sprite file: {sprite_path}")

        sprite = Image.open(sprite_path).convert("RGBA")
        frame = entry["frame"]
        x, y, w, h = frame["x"], frame["y"], frame["w"], frame["h"]

        if sprite.size != (w, h):
            print(
                f"Warning: sprite {sprite_path} size {sprite.size} does not match frame {(w, h)}."
                " It will be resized to fit."
            )
            sprite = sprite.resize((w, h), Image.Resampling.NEAREST)

        canvas.paste(sprite, box=(x, y))
        print(f"Applied {sprite_path} -> ({x}, {y})")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path, format="PNG")
    print(f"Rebuilt atlas saved to {output_path}")


def prompt_character() -> str:
    choices = ", ".join(sorted(CHARACTER_TARGETS.keys()))
    while True:
        value = input(f"Character name [{choices}]: ").strip().lower()
        if value in CHARACTER_TARGETS:
            return value
        print("Invalid character. Please choose one of:", choices)


def resolve_character(specified: Optional[str], require: bool) -> Optional[str]:
    if specified:
        return specified.lower()
    if require:
        return prompt_character()
    return None


def resolve_path(arg_value: Optional[str], *, character: Optional[str], key: str, label: str) -> Path:
    if arg_value:
        return Path(arg_value)
    if character:
        info = CHARACTER_TARGETS.get(character)
        if info and key in info:
            return Path(info[key])
        raise ValueError(f"No default path for {label} with character '{character}'.")
    raise ValueError(f"Missing required argument for {label}. Provide a path or specify --character.")


def main() -> None:
    args = parse_arguments()
    command = args.command

    if command == "extract":
        need_defaults = not (args.atlas and args.data and args.out)
        character = resolve_character(args.character, require=need_defaults)
        atlas_path = resolve_path(args.atlas, character=character, key="atlas_png", label="--atlas")
        data_path = resolve_path(args.data, character=character, key="atlas_json", label="--data")
        out_path = resolve_path(args.out, character=character, key="sprites_dir", label="--out")
        extract_sprites(atlas_path, data_path, out_path)
    elif command == "apply":
        need_defaults = not (args.data and args.sprites and args.out)
        character = resolve_character(args.character, require=need_defaults)
        data_path = resolve_path(args.data, character=character, key="atlas_json", label="--data")
        sprites_path = resolve_path(args.sprites, character=character, key="sprites_dir", label="--sprites")
        out_path = resolve_path(args.out, character=character, key="atlas_png", label="--out")
        if args.base:
            base_path = Path(args.base)
        elif character:
            base_path = Path(CHARACTER_TARGETS[character]["atlas_png"])
        else:
            base_path = None
        apply_sprites(data_path, sprites_path, out_path, base_path)
    else:
        raise ValueError(f"Unknown command: {command}")


if __name__ == "__main__":
    main()
