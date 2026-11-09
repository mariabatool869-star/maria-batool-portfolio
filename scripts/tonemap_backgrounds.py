"""
Tone-map the section background artwork so it reads at 6-12% opacity.

    pip install pillow numpy
    python3 scripts/tonemap_backgrounds.py path/to/originals

Expects the originals named bg-<name>.jpg (global, awards, projects,
capabilities, skills, experience, patents, contact, footer). Writes
public/images/backgrounds/bg-<name>.webp (1280 px) and bg-<name>-sm.webp (720 px).

Method: brightness only, so hues are preserved. The darkest 35% of the image
maps to black (it would only darken the page), the brightest 0.3% to near
white, with a slight mid-tone lift. R, G and B are scaled by the same factor.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

NAMES = ["global", "awards", "projects", "capabilities", "skills", "experience", "patents", "contact", "footer"]
src = Path(sys.argv[1] if len(sys.argv) > 1 else "assets-src/backgrounds")
out = Path(__file__).resolve().parent.parent / "public/images/backgrounds"
out.mkdir(parents=True, exist_ok=True)

for n in NAMES:
    f = next(src.glob(f"bg-{n}.*"))
    a = np.asarray(Image.open(f).convert("RGB")).astype(float)
    L = a.mean(axis=2)
    black, white = np.percentile(L, 35), np.percentile(L, 99.7)
    Lo = np.clip((L - black) / max(white - black, 1), 0, 1) ** 0.9 * 235
    ratio = np.where(L > 0.5, Lo / np.maximum(L, 0.5), 0)[..., None]
    img = Image.fromarray(np.clip(a * ratio, 0, 255).astype(np.uint8))
    for suffix, width, q in [("", 1280, 50), ("-sm", 720, 48)]:
        img.resize((width, round(img.height * width / img.width)), Image.LANCZOS).save(out / f"bg-{n}{suffix}.webp", quality=q, method=6)
    print("done", n)
