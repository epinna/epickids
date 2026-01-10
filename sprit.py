#!/usr/bin/env python3
"""Utility script to extract individual sprites from a TexturePacker atlas
and rebuild an atlas image from edited sprites.

Usage examples
--------------
Extract sprites:
    python sprit.py extract --atlas assets/atlas/atlas.png \
        --data assets/atlas/atlas.json --out sprites_export

Re-apply edits back into a single atlas:
    python sprit.py apply --data assets/atlas/atlas.json \
        --sprites sprites_export --out assets/atlas/atlas.png

Requires Pillow (``pip install pillow``).
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterable, Tuple

from PIL import Image


FrameEntry = dict


def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Split or rebuild a sprite atlas")
    subparsers = parser.add_subparsers(dest="command", required=True)

    extract_parser = subparsers.add_parser("extract", help="Create PNG files for each frame")
    extract_parser.add_argument("--atlas", required=True, help="Path to the atlas PNG image")
    extract_parser.add_argument("--data", required=True, help="Path to the atlas JSON metadata")
    extract_parser.add_argument("--out", required=True, help="Output directory for exported sprites")

    apply_parser = subparsers.add_parser("apply", help="Rebuild an atlas from edited sprite PNGs")
    apply_parser.add_argument("--data", required=True, help="Path to the atlas JSON metadata")
    apply_parser.add_argument("--sprites", required=True, help="Directory holding edited sprite PNGs")
    apply_parser.add_argument("--out", required=True, help="Destination path for the rebuilt atlas PNG")
    apply_parser.add_argument(
        "--base",
        help="Optional base atlas PNG to start from; otherwise a transparent canvas is used",
    )

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


def main() -> None:
    args = parse_arguments()
    command = args.command

    if command == "extract":
        extract_sprites(Path(args.atlas), Path(args.data), Path(args.out))
    elif command == "apply":
        base = Path(args.base) if args.base else None
        apply_sprites(Path(args.data), Path(args.sprites), Path(args.out), base)
    else:
        raise ValueError(f"Unknown command: {command}")


if __name__ == "__main__":
    main()
