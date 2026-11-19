# Retratic, a custom Theme for OBS® Studio
`Retratic` is a "retro quadratic" theme with a focus on being clean and unified in how it looks. Visual elements have all had their size unified, and have a clearly distinguished color from other elements, providing better visual guidance with simple UI elements. It comes in 14 color Styles, listed below, and follows OBS Studio's *Font Size* and *Density* settings.

## Styles
Retratic offers several color styles which target different users and situations. 

### Autumn Woods
Relax in the park and watch the leaves fall off the trees. A dark mode theme with the brownish red and orange look common to fall.

<table>
<tr>
<td><img src="media/autumn-woods/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/autumn-woods/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Desert Dunes
The sun is unforgiving. A light mode theme with sandy desert colors.

<table>
<tr>
<td><img src="media/desert-dunes/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/desert-dunes/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Druid's Camp
Disappear into the woods never to be seen again. A grassy/leafy green dark mode theme for those who like nature a bit more than the rest.

<table>
<tr>
<td><img src="media/druids-camp/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/druids-camp/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Ember Forge
The hammers are swinging and the metal is flowing. A dark mode theme for the dwarves under us. Bright orange-red highlights with a warm grey background.

<table>
<tr>
<td><img src="media/ember-forge/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/ember-forge/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Frostbite
It's a blizzard out here. A light mode theme with white-ish blue background and icy highlights.

<table>
<tr>
<td><img src="media/frostbite/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/frostbite/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Night Sky
Sit down and watch the sky for a bit. A dark mode theme centered entirely around deep-blueish purple.

<table>
<tr>
<td><img src="media/night-sky/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/night-sky/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Ocean Blue
Just watch the waves come and go. The original dark mode deep blue theme that you know and love.

<table>
<tr>
<td><img src="media/ocean-blue/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/ocean-blue/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Pumpkin Patch
Carve a face and light a candle. A dark mode theme glowing in warm pumpkin orange.

<table>
<tr>
<td><img src="media/pumpkin-patch/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/pumpkin-patch/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Royal Court
Looks expensive but you know it's not real. A dark mode theme that emits a feeling of being in a high class hall.

<table>
<tr>
<td><img src="media/royal-court/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/royal-court/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Sakura Season
Watch the leaves fall in peace. A light mode theme with white-pink-ish colors similar to Sakura leaves.

<table>
<tr>
<td><img src="media/sakura-season/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/sakura-season/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Synthwave
Go back to the 80s and relive the age when technology was cool. A neon purple dark mode theme.

<table>
<tr>
<td><img src="media/synthwave/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/synthwave/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Tropical Lagoon
Chill out with a drink and relax. A teal dark mode theme that reminds you of clear waters at the beach.

<table>
<tr>
<td><img src="media/tropical-lagoon/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/tropical-lagoon/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Vampire's Castle
Stay calm and roll initiative - you've been spotted. A dark mode theme with gray background and strong blood red highlights.

<table>
<tr>
<td><img src="media/vampires-castle/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/vampires-castle/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>

### Witch's Brew
You really wish you didn't go wandering in the forest. A dark mode theme with sickly green highlights and purple background.

<table>
<tr>
<td><img src="media/witchs-brew/main.webp?raw=true" style="width: 400px;"/>
</td><td><img src="media/witchs-brew/settings.webp?raw=true" style="width: 400px;"/></td></tr>
</table>


## Guides
<details><summary>Installing</summary>

Requires OBS Studio 30 or newer (tested against the 33.0 theme format). Download the file for your system from the [releases](https://github.com/Xaymar/obs-retratic/releases), then:

- **Windows**: run `retratic-<version>-windows.exe`. It installs for your user only, no administrator rights needed.
- **MacOS**: open `retratic-<version>-macos.pkg`; it installs for your user only. The package isn't signed yet, so if macOS refuses to open it, right-click it and choose *Open*.
- **Linux**: extract `retratic-<version>-linux.tar.gz` and run `./retratic/install.sh`. For the OBS Studio Flatpak, run `./retratic/install.sh --flatpak` instead.

Afterwards:
1. Restart OBS Studio.
2. In *Settings > Appearance*, pick *Retratic* as the Theme and one of its colors as the Style.
3. Profit!
</details>

<details><summary>Uninstalling</summary>

1. Stop OBS Studio.
2. Remove the theme:
    - On *Windows*: uninstall *Retratic for OBS Studio* from *Settings > Apps*.
    - On *MacOS*: remove `Retratic.obt`, the `Retratic_*.ovt` files and the `Retratic` folder from `~/Library/Application Support/obs-studio/themes/`.
    - On *Linux*: run `./retratic/install.sh --uninstall` (add `--flatpak` for the Flatpak).
3. Start OBS Studio.
4. ???
5. Profit.
</details>
