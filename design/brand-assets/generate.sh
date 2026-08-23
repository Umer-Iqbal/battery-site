#!/usr/bin/env bash
# Regenerates every Enersol brand asset from the mark geometry below.
# Requires: rsvg-convert, magick (ImageMagick).
#
# Mark geometry is the single source of truth and mirrors
# src/components/brand/logo-paths.ts — keep the two in sync.
set -euo pipefail
cd "$(dirname "$0")"

BODY='M14.21 5.54 L6.04 10.25 L6.04 21.75 L16 27.5 L25.96 21.75 L25.96 10.25'
TERM='M25.96 10.25 L19.78 6.69'
BLUE='#009DFF'; GREEN='#7AC92C'; INK='#0A0A0A'; WHITE='#FFFFFF'
# Wordmark face: Outfit is the brand font. If it is not installed this falls
# back to the next name in the list — see README.
WORD_FONT='Outfit, Avenir Next, Helvetica Neue, sans-serif'

mark_svg() { # $1 body colour  $2 terminal colour
  cat <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="$BODY" stroke="$1" stroke-width="3" stroke-linejoin="miter"/>
  <path d="$TERM" stroke="$2" stroke-width="3"/>
</svg>
EOF
}

# Mark inside a rounded square, scaled to ~56% so it breathes as an app icon.
appicon_svg() { # $1 bg  $2 body  $3 terminal
  cat <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="none">
  <rect width="1024" height="1024" rx="228" fill="$1"/>
  <g transform="translate(224,224) scale(18)">
    <path d="$BODY" stroke="$2" stroke-width="3" stroke-linejoin="miter"/>
    <path d="$TERM" stroke="$3" stroke-width="3"/>
  </g>
</svg>
EOF
}

lockup_svg() { # $1 bg (or "none")  $2 body  $3 terminal  $4 text colour
  cat <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" fill="none">
  <rect width="900" height="240" fill="$1"/>
  <g transform="translate(96,84) scale(2.6)">
    <path d="$BODY" stroke="$2" stroke-width="3" stroke-linejoin="miter"/>
    <path d="$TERM" stroke="$3" stroke-width="3"/>
  </g>
  <text x="212" y="141" font-family="$WORD_FONT" font-weight="500"
        font-size="62" letter-spacing="9.9" fill="$4">ENERSOL</text>
</svg>
EOF
}

echo "mark/ (transparent, icon only)"
mark_svg "$BLUE" "$GREEN" > mark/enersol-mark.svg
mark_svg "$INK"  "$INK"   > mark/enersol-mark-black.svg
mark_svg "$WHITE" "$WHITE" > mark/enersol-mark-white.svg
for px in 16 32 64 180 512 1024; do
  rsvg-convert -w $px -h $px -o "mark/enersol-mark-${px}.png" mark/enersol-mark.svg
done
rsvg-convert -w 1024 -h 1024 -o mark/enersol-mark-black-1024.png mark/enersol-mark-black.svg
rsvg-convert -w 1024 -h 1024 -o mark/enersol-mark-white-1024.png mark/enersol-mark-white.svg

echo "app-icon/ (square, solid background — social profile pictures)"
appicon_svg "$INK"   "$WHITE" "$GREEN" > app-icon/_dark.svg
appicon_svg "$WHITE" "$BLUE"  "$GREEN" > app-icon/_light.svg
appicon_svg "$BLUE"  "$WHITE" "$WHITE" > app-icon/_blue.svg
for v in dark light blue; do
  for px in 400 512 1024; do
    rsvg-convert -w $px -h $px -o "app-icon/enersol-appicon-${v}-${px}.png" "app-icon/_${v}.svg"
  done
  mv "app-icon/_${v}.svg" "app-icon/enersol-appicon-${v}.svg"
done

echo "lockup/ (mark + ENERSOL)"
lockup_svg "none"  "$BLUE" "$GREEN" "$INK"   > lockup/enersol-lockup.svg
lockup_svg "$WHITE" "$BLUE" "$GREEN" "$INK"  > lockup/enersol-lockup-white.svg
lockup_svg "$INK"  "$BLUE" "$GREEN" "$WHITE" > lockup/enersol-lockup-dark.svg
for v in "" "-white" "-dark"; do
  rsvg-convert -w 1800 -o "lockup/enersol-lockup${v}-1800.png" "lockup/enersol-lockup${v}.svg"
  rsvg-convert -w 900  -o "lockup/enersol-lockup${v}-900.png"  "lockup/enersol-lockup${v}.svg"
done

echo "social/ (link preview card)"
cat > social/_og.svg <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <rect width="1200" height="630" fill="$WHITE"/>
  <g transform="translate(96,232) scale(4.2)">
    <path d="$BODY" stroke="$BLUE" stroke-width="3" stroke-linejoin="miter"/>
    <path d="$TERM" stroke="$GREEN" stroke-width="3"/>
  </g>
  <text x="268" y="326" font-family="$WORD_FONT" font-weight="500"
        font-size="76" letter-spacing="12.2" fill="$INK">ENERSOL</text>
  <text x="272" y="392" font-family="$WORD_FONT" font-weight="400"
        font-size="30" fill="#737373">PowerPacks &amp; Electric Bikes</text>
  <rect x="0" y="614" width="1200" height="16" fill="$BLUE"/>
  <rect x="720" y="614" width="480" height="16" fill="$GREEN"/>
</svg>
EOF
rsvg-convert -w 1200 -h 630 -o social/og-image-1200x630.png social/_og.svg
mv social/_og.svg social/og-image.svg

echo "favicon .ico (16+32+64)"
magick mark/enersol-mark-16.png mark/enersol-mark-32.png mark/enersol-mark-64.png mark/favicon.ico
mv mark/favicon.ico ./favicon.ico

echo
echo "done. files:"
find . -type f \( -name '*.png' -o -name '*.svg' -o -name '*.ico' \) | sort
