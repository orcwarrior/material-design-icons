(function (global) {
    global.currentThemeKey = "baseline";
    const themes = {
        baseline: "",
        outlined: " outlined",
        rounded: " rounded",
        "two-tone": " two-tone",
        sharp: " sharp",
    };
    global.__themes = themes;

    const sources = {
        ligatures: "ligatures",
        "css-class": "css-class",
    };
    let currentSourceType = sources.ligatures;

    const iconClassExceptions = {
        "3d_rotation": "threed_rotation",
        "4k": "fourk",
        "360": "three-sixty",
    };
    global.getIconEl = (iconName) => {
        const iconClass = " " + ((iconClassExceptions[iconName]) ? iconClassExceptions[iconName] : iconName);
        if (currentSourceType === sources.ligatures)
            return <i className={`material-icons${getCurrentTheme()}`}>{iconName}</i>;
        else /*sources.css-class*/
            return <i className={`material-icons${getCurrentTheme()}${iconClass}`}> </i>;
    };
    global.getIconElStr = (iconName) => {
        console.log(`iconName: `, iconName);
        const iconClass = " " + ((iconClassExceptions[iconName]) ? iconClassExceptions[iconName] : iconName);
        if (currentSourceType === sources.ligatures)
            return `<i className="material-icons${getCurrentTheme()}">${iconName}</i>`;
        else /*sources.css-class*/
            return `<i className="material-icons${getCurrentTheme()}${iconClass}"></i>`;
    };

    const setSourceType = (srcType) => {
        console.log("setSourceType: ", srcType)
        currentSourceType = srcType;
        rerenderRegistredReactRenders(); // Ugh
    };

    const SourceStylePicker = ({srcType: currentSrc}) => {
        return <div className="src-picker">
            <span>source-type:</span>{Object.values(sources).map(src => <div onClick={() => setSourceType(src)}
                                                                             className={`src ${src} ${(currentSrc === src) ? "active" : ""}`}>{src}</div>)}
        </div>;
    };

    const setTheme = (themeKey) => {
        global.currentThemeKey = themeKey;
        rerenderRegistredReactRenders(); // Ugh
    };
    const getCurrentTheme = () => currentThemeKey ? themes[currentThemeKey] : "";
    const ThemePicker = ({theme: currentTheme}) => {
        return <div className="theme-picker">
            <span>theme:</span>
            {Object.keys(themes).map(theme => <div onClick={() => setTheme(theme)}
                                                   className={`theme ${theme} ${(currentTheme === theme) ? "active" : ""}`}>{theme}</div>)}
        </div>;
    };

    const MenuWrapper = ({theme, srcType}) => {
        return <div>
            <ThemePicker theme={theme}/>
            <SourceStylePicker srcType={srcType}/>
        </div>;
    };

    function initializeRender() {
        ReactDOM.render(
            <MenuWrapper theme={currentThemeKey} srcType={currentSourceType}/>
            , document.querySelector("#menu-preferences"));
    }

    global.reactRenders = [...(global.reactRenders || []), initializeRender];

    function rerenderRegistredReactRenders() {
        console.log("Re-render: ", global.reactRenders.length);
        global.reactRenders.forEach(render => render());
    }

    initializeRender();
})(window);