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

        // Copy css to clipboard
        let cssTextarea = document.querySelector('#css-values')
        let webkit = '-webkit-' + currentGradient + '\n'
        let moz = '-moz-' + currentGradient + '\n'

        cssTextarea.innerHTML = webkit + moz + currentGradient

    }

    // Change background on click or space key
    colorBtn.addEventListener('click', updateGradient)
    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) updateGradient()
    }

    // Display/hide copy-code section
    const displayCodeBtn = document.querySelector('#btn-show-code')
    const hideCodeBtn = document.querySelector('#btn-hide-code')
    const codeDisplaySection = document.querySelector('#code-display')

    displayCodeBtn.addEventListener('click', displayCode)
    hideCodeBtn.addEventListener('click', hideCode)

    function displayCode() {
        codeDisplaySection.style.opacity = '1'
        codeDisplaySection.style.pointerEvents = 'auto'

        displayCodeBtn.style.display = 'none'
        hideCodeBtn.style.display = 'block'
    }

    function hideCode() {
        codeDisplaySection.style.opacity = '0'
        codeDisplaySection.style.pointerEvents = 'none'

        displayCodeBtn.style.display = 'block'
        hideCodeBtn.style.display = 'none'
    }

    // Copy css code to clipboard
    const copyCssBtn = document.querySelector('#btn-copy-css')
    const cssTextarea = document.querySelector('#css-values')

    copyCssBtn.addEventListener('click', copyToClipBoard)

    function copyToClipBoard() {
        document.body.appendChild(cssTextarea)
        cssTextarea.select()
        document.execCommand('copy')
        document.body.removeChild(cssTextarea)
    }

})