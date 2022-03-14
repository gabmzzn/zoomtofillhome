const video = document.querySelector('video')
const svg = document.getElementsByTagName('svg')[1]

let interval = setInterval(() => { zoomButton() }, 1900)

svg.addEventListener('click', () => {
    zoomButton()
    clearInterval(interval)
})
svg.addEventListener('wheel', event => {
    buttonScroll(event)
    clearInterval(interval)
})

function buttonScroll(event) {
    event.preventDefault()
    if (event.deltaY < 0) zoomManual('+')
    if (event.deltaY > 0) zoomManual('-')
}

function cssScale(scale, transition) {
    video.style = `transform: scale(${scale}); transition: transform ${transition} ease;`

    let status = document.getElementById('state')
    if (scale == 1) status.innerText = 'Original'
    else status.innerText = 'Zoomed'
}

function zoomAR(transition) {
    let scale = 1.35
    if (scale !== getCurrentScale()) cssScale(scale, transition)
    else cssScale(1, '450ms')
}

function zoomManual(command) {
    let scale = getCurrentScale()
    if (command == '+') {
        scale += 0.05
    }
    else if (scale > 1 && command == '-') {
        scale -= 0.05
        if (scale < 1) scale = 1
    }
    cssScale(scale, '150ms')
}

function zoomButton() {
    if (getCurrentScale() == 1) zoomAR()
    else cssScale(1, '450ms')
}

function getCurrentScale() {
    let videoStyle = video.getAttribute('style')
    if (!videoStyle) return 1
    return parseFloat(videoStyle.substring(
        videoStyle.indexOf('(') + 1,
        videoStyle.indexOf(')'))
    )
}

function zoom(command) {
    switch (command) {
        case '+':
        case '-': zoomManual(command); break
        default: zoomAR(command); break
    }
}

history.scrollRestoration = 'manual'

// Theme switcher
let storedTheme = localStorage.getItem('theme')
let currentTheme = document.documentElement.getAttribute("data-theme")

if (storedTheme == 'dark' || storedTheme == 'light') currentTheme = storedTheme
else currentTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light"

document.documentElement.setAttribute('data-theme', currentTheme)

document.getElementsByClassName("theme-toggle")[0].onclick = () => {
    if (currentTheme == 'light') currentTheme = 'dark'
    else currentTheme = 'light'

    localStorage.setItem('theme', currentTheme)
    document.documentElement.setAttribute('data-theme', currentTheme)
}

// Animation loading
window.onload = () => {
    setTimeout(() => {
        document.getElementsByTagName('html')[0].style = `
        transition: background-image 0.5s;`
        document.getElementsByClassName('title')[0].style = `
        opacity: 100%;
        transform: scale(1);`
        document.getElementsByClassName('box')[0].style = `
        margin-top: 0;`
        document.getElementsByClassName('theme-toggle')[0].style = `
        transform: translate(0%, 0%);`
    }, 300)
}