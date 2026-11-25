# Joya Timer Max

日本の四季と除夜の鐘を描く、Amigaデモのリアルタイム3Dオマージュです。
A real-time 3D homage to the Amiga demo, following Japan’s four seasons through the ringing of the New Year’s Eve bell.

The home page offers mobile and highest-quality WebGPU playback and a filmed comparison. The film shows the Amiga original above the 3D version and uses the Amiga soundtrack. Credits and third-party attributions are available on both viewing pages.

## GitHub Pages

This public distribution is prepared for the project path `/JoyaTimerMax-Demo/`. It contains a prebuilt site and needs no Node dependencies or Git LFS. Run `python3 verify.py` to verify the package and reconstruct the MP4 checksum in memory. To publish, select GitHub Actions under Settings → Pages, then run **Deploy Joya Timer Max** manually for the release commit. The workflow verifies the repository path and file checksums before uploading `site/`.

To preview locally, mount `site/` at `/JoyaTimerMax-Demo/` on a localhost HTTP server. Use HTTPS when hosting elsewhere so WebGPU can run.
