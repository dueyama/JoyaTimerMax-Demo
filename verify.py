"""Check the standalone release before uploading it to GitHub Pages."""
import argparse
import hashlib
import json
from pathlib import Path
import re


def digest(data):
    return hashlib.sha256(data).hexdigest()


def verify(repo, expected_base=None):
    site = repo / "site"
    manifest = json.loads((repo / "release.json").read_text())
    if expected_base is not None and expected_base.strip("/") != manifest["base"].strip("/"):
        raise ValueError("Pages base path does not match the prepared repository name")
    files = {p.relative_to(site).as_posix(): p for p in site.rglob("*") if p.is_file()}
    if set(files) != set(manifest["files"]):
        raise ValueError("Unexpected or missing files in site/")
    total = 0
    for name, path in files.items():
        size = path.stat().st_size
        total += size
        if path.is_symlink() or size >= 100_000_000 or digest(path.read_bytes()) != manifest["files"][name]:
            raise ValueError(f"Invalid release file: {name}")
    if total >= 1_000_000_000:
        raise ValueError("Site exceeds Pages size budget")
    movie = json.loads(files["film/delivery-assets.json"].read_text())["/joya-timer-max.mp4"]
    complete = hashlib.sha256()
    size = 0
    for part in movie["parts"]:
        data = files["film/" + part["url"]].read_bytes()
        if len(data) != part["bytes"] or digest(data) != part["sha256"]:
            raise ValueError("Damaged MP4 part")
        complete.update(data)
        size += len(data)
    if size != movie["bytes"] or complete.hexdigest() != movie["sha256"]:
        raise ValueError("Assembled comparison MP4 differs from original")
    playlist = files["film/media/film/film.m3u8"].read_text()
    segments = re.findall(r'^([^#\s][^\n]*)$', playlist, re.M)
    init = re.search(r'#EXT-X-MAP:URI="([^"]+)"', playlist)
    if not init or not segments or "#EXT-X-ENDLIST" not in playlist:
        raise ValueError("Incomplete film playlist")
    for segment in [init[1], *segments]:
        if "film/media/film/" + segment.strip() not in files:
            raise ValueError(f"Missing HLS segment: {segment}")
    print(f"{len(files)} files, {total:,} bytes, {len(segments)} HLS segments, MP4 SHA-256 {complete.hexdigest()}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base")
    verify(Path(__file__).resolve().parent, parser.parse_args().base)
