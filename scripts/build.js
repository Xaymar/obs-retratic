// Usage: node build.js [build|distrib|install]
const fs = require('fs');
const sass = require('sass');
const path = require('path');

// Each entry becomes one file. The first is the base theme listed under "Theme",
// the rest are listed under "Style" (OBS requires a variant for the base itself too).
// Light styles: bright background layers, dark text, and dark icons.
const LIGHT = {
    "theme-dark": false,
    "theme-images": "theme:Retratic/light",
    "obs-icons": "theme:Light",
    // Background layer brightness and saturation, relative to the base color.
    "theme-layer0-bg-lum": 1.56, "theme-layer0-bg-sat": 0.13,
    "theme-layer1-bg-lum": 1.49, "theme-layer1-bg-sat": 0.2,
    "theme-layer2-bg-lum": 1.43, "theme-layer2-bg-sat": 0.25,
    "theme-layer3-bg-lum": 1.31, "theme-layer3-bg-sat": 0.3,
    "theme-layer4-bg-lum": 1.23, "theme-layer4-bg-sat": 0.4,
    "theme-layer5-bg-lum": 1.45, "theme-layer5-bg-sat": 0.45,
    "theme-layer6-bg-lum": 1.17, "theme-layer6-bg-sat": 0.8,
    "theme-layer9-bg-lum": 1.28, "theme-layer9-bg-sat": 0.7,
    // Text stays at the (dark) text color everywhere.
    "theme-layer4-fg-lum": 1, "theme-layer5-fg-lum": 1, "theme-layer6-fg-lum": 1, "theme-layer9-fg-lum": 1, "theme-layer9-fg-sat": 1,
    // Disabled controls wash out instead of darkening; disabled text fades towards the background.
    "theme-disabled-lum": 1.25, "theme-disabled-sat": 0.4,
    "theme-disabled-fg-lum": 3.2, "theme-disabled-fg-sat": 0.5,
};

const themes = [
    { file: "Retratic.obt", vars: {} },
    { file: "Retratic_OceanBlue.ovt", vars: { "theme-name": "Ocean Blue", "theme-id": "com.xaymar.Retratic.OceanBlue" } },
    { file: "Retratic_PumpkinPatch.ovt", vars: { "theme-name": "Pumpkin Patch", "theme-id": "com.xaymar.Retratic.PumpkinPatch", "theme-color-bg": "hsl(25, 100%, 50%)", "theme-color-fg": "rgb(255, 240, 225)" } },
    { file: "Retratic_NightSky.ovt", vars: { "theme-name": "Night Sky", "theme-id": "com.xaymar.Retratic.NightSky", "theme-color-bg": "hsl(250, 100%, 60%)", "theme-color-fg": "rgb(235, 230, 255)" } },
    { file: "Retratic_VampiresCastle.ovt", vars: { "theme-name": "Vampire's Castle", "theme-id": "com.xaymar.Retratic.VampiresCastle", "theme-color-bg": "hsl(225, 22%, 50%)", "theme-color-accent": "hsl(355, 90%, 45%)", "theme-color-fg": "rgb(235, 228, 232)" } },
    { file: "Retratic_SakuraSeason.ovt", vars: { ...LIGHT, "theme-name": "Sakura Season", "theme-id": "com.xaymar.Retratic.SakuraSeason", "theme-color-bg": "hsl(340, 75%, 72%)", "theme-color-accent": "hsl(335, 80%, 62%)", "theme-color-fg": "rgb(70, 30, 50)" } },
    { file: "Retratic_DruidsCamp.ovt", vars: { "theme-name": "Druid's Camp", "theme-id": "com.xaymar.Retratic.DruidsCamp", "theme-color-bg": "hsl(135, 55%, 38%)", "theme-color-accent": "hsl(105, 75%, 42%)", "theme-color-fg": "rgb(228, 245, 228)" } },
    { file: "Retratic_TropicalLagoon.ovt", vars: { "theme-name": "Tropical Lagoon", "theme-id": "com.xaymar.Retratic.TropicalLagoon", "theme-color-bg": "hsl(172, 70%, 36%)", "theme-color-accent": "hsl(168, 90%, 40%)", "theme-color-fg": "rgb(220, 250, 245)" } },
    { file: "Retratic_EmberForge.ovt", vars: { "theme-name": "Ember Forge", "theme-id": "com.xaymar.Retratic.EmberForge", "theme-color-bg": "hsl(20, 8%, 50%)", "theme-color-accent": "hsl(18, 100%, 50%)", "theme-color-fg": "rgb(245, 230, 220)" } },
    { file: "Retratic_RoyalCourt.ovt", vars: { "theme-name": "Royal Court", "theme-id": "com.xaymar.Retratic.RoyalCourt", "theme-color-bg": "hsl(225, 60%, 40%)", "theme-color-accent": "hsl(48, 100%, 46%)", "theme-color-accent-fg": "rgb(20, 22, 40)", "theme-color-fg": "rgb(245, 238, 220)" } },
    { file: "Retratic_WitchsBrew.ovt", vars: { "theme-name": "Witch's Brew", "theme-id": "com.xaymar.Retratic.WitchsBrew", "theme-color-bg": "hsl(275, 45%, 40%)", "theme-color-accent": "hsl(95, 85%, 40%)", "theme-color-fg": "rgb(235, 225, 245)" } },
    { file: "Retratic_Synthwave.ovt", vars: { "theme-name": "Synthwave", "theme-id": "com.xaymar.Retratic.Synthwave", "theme-color-bg": "hsl(265, 70%, 45%)", "theme-color-accent": "hsl(320, 100%, 50%)", "theme-color-fg": "rgb(250, 230, 250)" } },
    { file: "Retratic_AutumnWoods.ovt", vars: { "theme-name": "Autumn Woods", "theme-id": "com.xaymar.Retratic.AutumnWoods", "theme-color-bg": "hsl(352, 55%, 40%)", "theme-color-accent": "hsl(40, 100%, 45%)", "theme-color-fg": "rgb(250, 238, 225)" } },
    { file: "Retratic_Frostbite.ovt", vars: { ...LIGHT, "theme-name": "Frostbite", "theme-id": "com.xaymar.Retratic.Frostbite", "theme-color-bg": "hsl(205, 55%, 62%)", "theme-color-accent": "hsl(210, 55%, 50%)", "theme-color-fg": "rgb(25, 40, 60)" } },
    { file: "Retratic_DesertDunes.ovt", vars: { ...LIGHT, "theme-name": "Desert Dunes", "theme-id": "com.xaymar.Retratic.DesertDunes", "theme-layer0-bg-sat": 0.3, "theme-layer1-bg-sat": 0.4, "theme-layer2-bg-sat": 0.45, "theme-layer3-bg-sat": 0.5, "theme-layer4-bg-sat": 0.6, "theme-color-bg": "hsl(44, 75%, 45%)", "theme-color-accent": "hsl(15, 65%, 50%)", "theme-color-fg": "rgb(60, 40, 25)" } },
];

const mode = process.argv[2] || "build";
let targetPath = path.join(process.cwd(), mode);
if (mode === "install") {
    if (process.platform === "win32") {
        targetPath = path.join(process.env.APPDATA, "obs-studio", "themes");
    } else if (process.platform === "darwin") {
        targetPath = path.join(process.env.HOME, "Library", "Application Support", "obs-studio", "themes");
    } else {
        targetPath = path.join(process.env.HOME, ".config", "obs-studio", "themes");
    }
}
fs.mkdirSync(targetPath, { recursive: true });

const source = path.join(process.cwd(), "source");

// Density support. Qt style sheets can't calculate, so every px value that depends on
// $theme-size-controls becomes an OBS theme variable computed from --size_controls (which follows
// the Density setting). The sheet is compiled at three control sizes; values that change must be
// linear in the control size, and are rewritten to var(--size_<factor>x_<offset>).
const SIZE_BASE = 22, SIZE_ALT = 30, SIZE_CHECK = 26;
const DENSITY_SIZES = [16.375, 19, 22, 25]; // 16px + 1.5 * obsPadding for Classic/Compact/Normal/Comfortable
const PX = /-?\d*\.?\d+px/g;

const num = (n) => +n.toFixed(6);
const ident = (n) => String(num(n)).replace("-", "m").replace(".", "p");

function densify(compileAt) {
    const [base, alt, check] = [SIZE_BASE, SIZE_ALT, SIZE_CHECK].map(compileAt);
    const skeleton = (css) => css.replace(PX, "#");
    if (skeleton(base) !== skeleton(alt) || skeleton(base) !== skeleton(check))
        throw new Error("Stylesheet structure changes with $theme-size-controls.");
    const [b, a, c] = [base, alt, check].map((css) => css.match(PX).map(parseFloat));

    const defs = new Map();
    let i = 0;
    const css = base.replace(PX, (token, offset) => {
        // Selector and property, for error messages.
        const where = base.slice(base.lastIndexOf("\n", base.lastIndexOf("{", offset)) + 1, offset + token.length).replace(/\s+/g, " ");
        const k = num((a[i] - b[i]) / (SIZE_ALT - SIZE_BASE)), o = num(b[i] - SIZE_BASE * k), at = c[i];
        i++;
        if (k === 0) return token;
        if (Math.abs(SIZE_CHECK * k + o - at) > 1e-4)
            throw new Error(`"${where}" is not linear in $theme-size-controls.`);
        // OBS rejects calc() results of exactly 0, so such a value stays fixed at its Normal size.
        const zeroAt = DENSITY_SIZES.find((s) => Math.abs(s * k + o) < 1e-6);
        if (zeroAt !== undefined) {
            console.warn(`Not density-scaled (0px at control size ${zeroAt}px): ${where}`);
            return token;
        }
        const name = `size_${ident(k)}x_${ident(o)}`;
        // OBS's calc() takes no negative literals, so signs become the operator.
        const scaled = Math.abs(k) === 1 ? "var(--size_controls)" : `calc(var(--size_controls) * ${Math.abs(k)})`;
        let value;
        if (k > 0) value = o === 0 ? scaled : `calc(${scaled} ${o < 0 ? "-" : "+"} ${Math.abs(o)}px)`;
        else if (o >= 0) value = `calc(${o}px - ${scaled})`;
        else throw new Error(`"${where}" is negative at every control size.`);
        defs.set(name, value);
        return `var(--${name})`;
    });

    // OBS only reads the first @OBSThemeVars block, so the definitions go there.
    const start = css.indexOf("@OBSThemeVars");
    const end = css.indexOf("}", start);
    const lines = [...defs].map(([name, value]) => `  --${name}: ${value};\n`).join("");
    return css.slice(0, end) + lines + css.slice(end);
}

for (const theme of themes) {
    const vars = { ...theme.vars };
    if (theme !== themes[0]) vars["theme-extends"] = "com.xaymar.Retratic";
    // Colors, numbers and booleans are Sass values, everything else is a string.
    const prefix = Object.entries(vars).map(([k, v]) => `$${k}: ${k.startsWith("theme-color") || typeof v !== "string" ? v : JSON.stringify(v)};\n`).join("");
    // Not compressed: OBS's @OBSThemeMeta parser expects every value to end in ";".
    const css = densify((size) => sass.compileString(`${prefix}$theme-size-controls: ${size}px;\n@import "main";`, { loadPaths: [source] }).css);
    fs.writeFileSync(path.join(targetPath, theme.file), css, { flag: "w+" });
}
const images = path.join(targetPath, "Retratic");
fs.cpSync(path.join(process.cwd(), "data"), images, { force: true, recursive: true, preserveTimestamps: true });
// Dark icons for light styles: the icons are grayscale, so inverting every hex color is enough.
fs.mkdirSync(path.join(images, "light"), { recursive: true });
for (const file of fs.readdirSync(path.join(process.cwd(), "data")).filter((f) => f.endsWith(".svg"))) {
    const svg = fs.readFileSync(path.join(process.cwd(), "data", file), "utf8").replace(/#([0-9a-fA-F]{6})\b/g, (_, hex) =>
        "#" + (0xffffff ^ parseInt(hex, 16)).toString(16).padStart(6, "0"));
    fs.writeFileSync(path.join(images, "light", file), svg);
}
