let storedTheme = localStorage.getItem('theme')
let currentTheme = document.documentElement.getAttribute("data-theme")

if (storedTheme == 'dark' || storedTheme == 'light') currentTheme = storedTheme
else currentTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"

document.documentElement.setAttribute('data-theme', currentTheme)

window.onload = () => {
    document.getElementsByClassName("theme-toggle")[0].onclick = () => {
        if (currentTheme == 'light') currentTheme = 'dark'
        else currentTheme = 'light'

        localStorage.setItem('theme', currentTheme)
        document.documentElement.setAttribute('data-theme', currentTheme)
    }
}