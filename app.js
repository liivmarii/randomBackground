document.addEventListener('DOMContentLoaded', () => {

    // DOM elements
    const background = document.querySelector('#gradient')
    const colorBtn = document.querySelector('#generate-gradient-btn')

    // Default first & second colour
    let firstColor = 'rgba(100, 100, 100, 1)'
    let secondColor = 'rgba(210, 210, 210, 1)'

    let previousGradient
    let currentGradient = 'linear-gradient(62deg, ' + firstColor + ' 0%, ' + secondColor + ' 100%)'
    let gradients = []

    // DOM text nodes for code snippet
    const mozGradient = document.querySelector('#moz-linear-gradient')
    const webkitGradient = document.querySelector('#webkit-linear-gradient')
    const defaultGradient = document.querySelector('#linear-gradient')

    let mozNode = document.createTextNode('-moz-' + currentGradient)
    let webkitNode = document.createTextNode('-webkit-' + currentGradient)
    let defaultNode = document.createTextNode(currentGradient)

    mozGradient.appendChild(mozNode)
    webkitGradient.appendChild(webkitNode)
    defaultGradient.appendChild(defaultNode)

    function updateTextNodes() {
        mozGradient.removeChild(mozNode)
        webkitGradient.removeChild(webkitNode)
        defaultGradient.removeChild(defaultNode)

        mozNode = document.createTextNode('-moz-' + currentGradient)
        webkitNode = document.createTextNode('-webkit-' + currentGradient)
        defaultNode = document.createTextNode(currentGradient)

        mozGradient.appendChild(mozNode)
        webkitGradient.appendChild(webkitNode)
        defaultGradient.appendChild(defaultNode)
    }

    // Create random gradient degree
    let randomDeg = () => Math.floor(Math.random() * 360)

    // Create random rgba
    let rgbMax = 255
    let opacity = 1
    let rgbValue = () => Math.floor(Math.random() * rgbMax)
    let randomRgba = () => 'rgba(' + rgbValue() + ', ' + rgbValue() + ', ' + rgbValue() + ', ' + opacity + ')'

    function colorMatch() {
        firstColor = randomRgba()
        secondColor = randomRgba()
        while (firstColor === secondColor) secondColor = randomRgba()
    }

    function updateGradient() {

        colorMatch()
        previousGradient = gradients[gradients.length - 1]
        currentGradient = 'linear-gradient(' + randomDeg() + 'deg, ' + firstColor + ' 0%, ' + secondColor + ' 100%)'

        while (previousGradient === currentGradient) {
            colorMatch()
            currentGradient = 'linear-gradient(' + randomDeg() + 'deg, ' + firstColor + ' 0%, ' + secondColor + ' 100%)'
        }

        gradients.push(currentGradient)

        background.style.backgroundImage = currentGradient
        colorBtn.style.color = firstColor

        updateTextNodes()

    }

    // Change background on click or space key
    colorBtn.addEventListener('click', updateGradient)
    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) updateGradient()
    }

})