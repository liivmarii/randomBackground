document.addEventListener('DOMContentLoaded', () => {

    // DOM elements
    const background = document.querySelector('#gradient')
    const colorBtn = document.querySelector('#generate-gradient-btn')

    // Create random gradient degree
    let randomDeg = () => Math.floor(Math.random() * 360)

    // Create random rgba
    let rgbMax = 255
    let opacity = 1
    let rgbValue = () => Math.floor(Math.random() * rgbMax)
    let randomRgba = () => 'rgba(' + rgbValue() + ', ' + rgbValue() + ', ' + rgbValue() + ', ' + opacity + ')'

    // Default first & second colour
    let firstColor = 'rgba(255, 255, 255, 1)'
    let secondColor = 'rgba(255, 255, 255, 1)'

    let previousGradient
    let currentGradient
    let gradients = []

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

    }

    // Change background on click or space key
    colorBtn.addEventListener('click', updateGradient)
    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) updateGradient()
    }

})