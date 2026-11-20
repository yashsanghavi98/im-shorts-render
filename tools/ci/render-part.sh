#!/bin/bash
# usage: render-part.sh <comp> <index> <parts> <totalFrames> <releaseTag>  (picture only; skips pieces already uploaded)
set -euo pipefail
comp=$1; i=$2; n=$3; total=$4; tag=$5
a=$(( i * total / n )); b=$(( (i + 1) * total / n - 1 ))
name=part-$(printf '%02d' "$i").mp4
if gh release view "$tag" --json assets --jq '.assets[].name' | grep -qx "$name"; then echo "$name already rendered"; exit 0; fi
mkdir -p out; start=$(date +%s)
echo "Rendering frames $a-$b of $comp on $(nproc) cores"
npx remotion render src/index.ts "$comp" "out/$name" --frames="$a-$b" --muted --props='{"pictureOnly":true}' \
  --concurrency=100% --timeout=240000 --crf=16 --image-format=jpeg --jpeg-quality=95 --log=warn
secs=$(( $(date +%s) - start )); frames=$(( b - a + 1 ))
echo "Piece $i: $frames frames in ${secs}s ($(python3 -c "print(round($secs/$frames,2))") s/frame)" | tee -a "$GITHUB_STEP_SUMMARY"
gh release upload "$tag" "out/$name" --clobber
