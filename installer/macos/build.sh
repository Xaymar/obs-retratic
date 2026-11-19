#!/bin/sh
# Builds the macOS installer package (per user, no admin needed). Runs on macOS only.
# Build after "npm run distrib":
#   installer/macos/build.sh 1.2.3
set -eu

version="${1:?usage: build.sh <version>}"
here=$(cd "$(dirname "$0")" && pwd)
root="$here/../.."
work="$root/installers/macos-work"
mkdir -p "$root/installers"
rm -rf "$work"
mkdir -p "$work/payload"
cp -R "$root/distrib/." "$work/payload/"
# pkgbuild needs executable scripts; git on Windows may not keep the bit.
chmod +x "$here/scripts/preinstall"

# Installed into the user's home ("currentUserHome" domain in distribution.xml), so this path
# ends up as ~/Library/Application Support/obs-studio/themes.
pkgbuild \
	--root "$work/payload" \
	--install-location "/Library/Application Support/obs-studio/themes" \
	--scripts "$here/scripts" \
	--identifier com.xaymar.retratic \
	--version "$version" \
	"$work/retratic.pkg"

productbuild \
	--distribution "$here/distribution.xml" \
	--package-path "$work" \
	--version "$version" \
	"$root/installers/retratic-$version-macos.pkg"

rm -rf "$work"
