document.addEventListener('DOMContentLoaded', () => {

    // DOM content
    const background = document.querySelector('body')
    const colorBtn = document.querySelector('#generate-gradient-btn')

    let rgbaMax = 255
    let opacity = 1
    let firstColor = 'rgba(255, 255, 255, 1)'
    let secondColor = 'rgba(255, 255, 255, 1)'

    let previousGradient
    let currentGradient
    let gradients = []

    // Create random rgba
    function randomRgba() {
        let red = Math.floor(Math.random() * rgbaMax)
        let green = Math.floor(Math.random() * rgbaMax)
        let blue = Math.floor(Math.random() * rgbaMax)

        return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')'
    }

    // Create random gradient degree
    let randomDeg = () => Math.floor(Math.random() * 360)

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
        colorBtn.style.background = secondColor


    }

    // Change background on click or space key
    colorBtn.addEventListener('click', updateGradient)
    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) updateGradient()
    }

})