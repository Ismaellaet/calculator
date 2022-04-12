const html = document.querySelector('html');
const themeButton = document.querySelector('.theme');

const getStyle = (element, style) => {
   return window.getComputedStyle(element).getPropertyValue(style);
}

const lightTheme = {
    backgroundCalculator: getStyle(html, "--background-calculator-color:"),
    backgroundColor: getStyle(html, "--background-color:"),
    border: getStyle(html, "--border"),
    secondColor: getStyle(html, "--second-color"),
}

const darkTheme = {
    backgroundCalculator: "#2e2e2e",
    backgroundColor: "#f7f7f7",
    border: "#f7f7f7",
    secondColor: "#f7f7f7"
}

const transformKey = (key) => {
    return "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()
}

const changeTheme = (theme) => {
        Object.keys(theme).map((key) => {
            html.style.setProperty(transformKey(key), theme[key])
        })
}

themeButton.addEventListener('click', () => {
    themeButton.classList.toggle('dark')
    themeButton.classList.contains('dark') ? changeTheme(darkTheme) : changeTheme(lightTheme);
})