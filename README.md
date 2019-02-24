# Material design icons: Revisited
Unofficial update of Google Material Design Icons based fonts - for ease of use as ligatures and additionaly support of
icons by css-classes (thanks to icomoon app). In short:
* More intuitive and productiveness oriented [demo page](https://orcwarrior.github.com/material-design-icons-revisited).
* Icons themes (Filled, Outlined, Rounded, Two-Tone & Sharp) can be used easily now.
* Two color icons can be used now: battery indicators, most of Two-Tone theme icons - thanks to css-classes for each of icon.
* Font's was imported into IcoMoon APP, and they can be easily re-customized using files at `icomoon-fonts/(theme)/MaterialIcons-(theme).icomoon.json`
* Some utility scripts in `scripts` folder hopefully helps to keep this package updated with orginal icons.
### How to start
Package can be installed as NPM repository, you can simply install it by command:
```
npm i material-design-icons-revisited
```
Icon themes are written in way, they can be used at once. Simply add stylesheet to your index.html, or
                import it. Make sure corresponding font file could be resolved too.
If you looking for how to use certain icon open [demo page](https://orcwarrior.github.com/material-design-icons-revisited) and just click it - proper code will add to your clipboard
                automatically.
                
The `iconfont` folder contains pre-generated font files that can be included in a project. This is especially convenient for the web; however, it is generally better to link to the web font hosted on Google Fonts:

You can read original Google Developer guide here: [font portion](https://google.github.io/material-design-icons/#icon-font-for-the-web).
### Known issues
* Some of the icons still uses clip path, which make font glyphs rendered as filled rectangles instead actual icon. I don't have proper tools to change these icons by now.
* Multicolored (by now Material Desing fonts max. 2 colored) font's cannot use ligatures, but with this package you can fallback to css-class.

## License

We have made these icons available for you to incorporate into your products under the [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). Feel free to remix and re-share these icons and documentation in your products.
We'd love attribution in your app's *about* screen, but it's not required. The only thing we ask is that you not re-sell these icons.
