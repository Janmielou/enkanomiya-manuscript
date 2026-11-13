# Audio attribution

Tracks in this folder (played via the `TRACKS` playlist in `script.js`):

- `drift-along-the-lethe.flac`
- `hope-or-nostalgia.flac`
- `now-and-forevermore.flac`
- `tearless-souls-of-byakuyakoku.flac`

**Fill in for each track:** author, source/URL, and license (e.g. "own composition —
all rights reserved", CC0, CC BY 3.0, etc.). Only ship music you have the rights to —
never copyrighted game OST on a public site.

⚠️ FLAC plays in Chrome/Edge/Firefox but **not in Safari**. For universal playback,
convert to MP3 and update the `src` paths in `script.js`:

```bash
ffmpeg -i "audio/my-track.flac" -codec:a libmp3lame -b:a 128k "audio/my-track.mp3"
```