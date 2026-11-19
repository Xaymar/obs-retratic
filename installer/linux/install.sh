#!/bin/sh
# Retratic theme installer for OBS Studio on Linux (per user, no root needed).
#
#   ./install.sh               install for the normal OBS Studio package
#   ./install.sh --flatpak     install for the OBS Studio Flatpak (com.obsproject.Studio)
#   ./install.sh --uninstall   remove the theme (combine with --flatpak for the Flatpak)
set -eu

here=$(cd "$(dirname "$0")" && pwd)
config="${XDG_CONFIG_HOME:-$HOME/.config}"
uninstall=0

for arg in "$@"; do
	case "$arg" in
		--flatpak) config="$HOME/.var/app/com.obsproject.Studio/config" ;;
		--uninstall) uninstall=1 ;;
		-h|--help) sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
		*) echo "Unknown option: $arg" >&2; exit 1 ;;
	esac
done

themes="$config/obs-studio/themes"

# Remove what a previous version installed, so renamed or dropped styles don't linger.
rm -f "$themes/Retratic.obt" "$themes"/Retratic_*.ovt
rm -rf "$themes/Retratic"

if [ "$uninstall" -eq 1 ]; then
	echo "Retratic removed from $themes"
	exit 0
fi

if [ ! -f "$here/themes/Retratic.obt" ]; then
	echo "Theme files not found next to this script (expected $here/themes)." >&2
	exit 1
fi

mkdir -p "$themes"
cp -R "$here/themes/." "$themes/"
echo "Retratic installed to $themes"
echo "Restart OBS Studio, then pick Retratic under Settings > Appearance."
