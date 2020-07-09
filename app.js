document.addEventListener('DOMContentLoaded', () => {

    // DOM content
    const colorContainer = document.querySelector('#bg-container')
    const colorBtn = document.querySelector('#color-btn')

    const colors = ['yellow', 'red', 'green', 'blue']
    let leftColor
    let rightColor

    let previousGradient
    let currentGradient
    let gradients = []

    // Change background on click or space key
    colorBtn.addEventListener('click', updateGradient)
    document.body.onkeyup = function(e) {
        if (e.keyCode == 32) updateGradient()
    }

    function random(array) {
        let randomIndex = Math.floor(Math.random() * array.length)
        return randomIndex
    }

    function colorMatch() {
        leftColor = colors[random(colors)]
        rightColor = colors[random(colors)]
        while (leftColor === rightColor) rightColor = colors[random(colors)]
    }

    function updateGradient() {

        colorMatch()
        previousGradient = gradients[gradients.length - 1]
        currentGradient = 'linear-gradient(62deg, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'

        while (previousGradient === currentGradient) {
            colorMatch()
            currentGradient = 'linear-gradient(62deg, ' + leftColor + ' 0%, ' + rightColor + ' 100%)'
        }

        colorContainer.style.backgroundImage = currentGradient
        gradients.push(currentGradient)

        console.log('colorcombo: ' + leftColor + ' + ' + rightColor)
        console.log('previousGradient: ' + previousGradient)
        console.log('currentGradient: ' + currentGradient)
        console.log(gradients)

    }


})