export const Displays = () => {
    const currentDisplay = document.querySelector('.current-display');
    const resultDisplay = document.querySelector('.result-display');

    function toggleResultDisplay() {
        const isNull = currentDisplay.innerHTML == 0;

        // Check if Current display is null
        if(!isNull) {
           classActive.add(resultDisplay); 
        } else {
            classActive.remove(resultDisplay); 
        }
    }

    const classActive = {
        add(display) {
            display.classList.add('active'); // Add class 'active'
        },

        remove(display) {
            display.classList.remove('active'); // Remove class 'active'
        }
    }

    function decreaseFontSize() { // Check if have to decrease the font size by checking the client's width
        const styles = window.getComputedStyle(currentDisplay)
        const currentFontSize = Number(styles.getPropertyValue('font-size').replace('px', '')) // Current display font size without px
        const currentWidth = currentDisplay.clientWidth >= 280; // Current display width

        // Check Current display width and Current display font size
        if(currentWidth && currentFontSize >= 40) {
            currentDisplay.style.fontSize = `${currentFontSize - 10}px` // Decrease font size by 10px
        }
    }

    function resetFontSize() {
        currentDisplay.style.fontSize = "50px"
    }

    function addClassFocus(display) { 
        // Only one display can have the class 'focus'
        if(display == currentDisplay) {
            resultDisplay.classList.remove('focus');
            currentDisplay.classList.add('focus');
        } else {
            currentDisplay.classList.remove('focus');
            resultDisplay.classList.add('focus');
        }
    }

    function setLimit() {
        const length = 18;

        currentDisplay.innerHTML = currentDisplay.innerHTML.substring(0, length);
    }

    return {
        toggleResultDisplay,
        classActive,
        decreaseFontSize,
        resetFontSize,
        addClassFocus,
        setLimit
    }
}