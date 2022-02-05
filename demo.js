let styleX = new CSSStyleSheet()
document.adoptedStyleSheets = [styleX]
const video = document.getElementsByTagName('video')[1]
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

let styleDemo = document.createElement('style')

function cssScale(scale, transition) {
    if (!transition) transition = '450ms'
    styleX.replaceSync(
        `.video-example video { transform: scale(${scale}) !important;transition: transform ${transition} ease !important;}`)
    styleDemo.innerHTML = innerHTML = `.video-example video { transform: scale(${scale}) !important;transition: transform ${transition} ease !important;}`
    document.head.appendChild(styleDemo)

    let status = document.getElementById('state')
    if (scale == 1) {
        status.innerText = 'Original'
    }
    else {
        status.innerText = 'Zoomed'
    }
}

function zoomAR(transition) {
    let scale = 1.35
    if (scale !== getCurrentScale()) cssScale(scale, transition)
    else cssScale(1)
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
    else cssScale(1)
}

function getCurrentScale() {
    if (styleX.cssRules.length == 0) return 1
    return parseFloat(styleX.cssRules[0].cssText.substring(
        styleX.cssRules[0].cssText.indexOf('(') + 1,
        styleX.cssRules[0].cssText.indexOf(')'))
    )
}

function zoom(command) {
    switch (command) {
        case '+':
        case '-': zoomManual(command); break
        default: zoomAR(command); break
    }
}

setTimeout(() => {
    document.getElementsByClassName('title')[0].style = 'transform: scale(1); transform-origin: top; opacity: 100%;filter: blur(0px);transition: all 1300ms;'
    document.getElementsByClassName('box')[0].style = 'transform: scale(1); transform-origin: top; opacity: 100%; background-color: transparent; transition: all 1800ms'
}, 200) 