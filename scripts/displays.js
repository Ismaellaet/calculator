export const createDisplaysRules = () => {
    const currentDisplay = document.querySelector(".current-display");
    const resultDisplay = document.querySelector(".result-display");

    function processTheDigit(digit) { // Process the digit on current display
        currentDisplay.style.fontSize = "50px"; // Default font size

        if(checksLastElement.isPercentage()) {return} // Avoids adding a number after the percentage

        // Check if current display is 0
        if (currentDisplay.innerHTML === "0") {
            currentDisplay.innerHTML = digit; // Replace the current display text
            resizeFontSize()
        } else {
            currentDisplay.innerHTML += digit; // Add in the current display text
            resizeFontSize()
        }
    }

    function resizeFontSize() {
        const displayContainer = document.querySelector(".display");
        let fontSize = window.getComputedStyle(currentDisplay).fontSize; // Get current display's font size
        currentDisplay.style.fontSize = (parseFloat(fontSize) - 1) + "px"; // Decrease font size

        // Check if current display's width is greater or equal than display container's width
        if (currentDisplay.clientWidth >= displayContainer.clientWidth) {
            resizeFontSize()
        }
    }

    function processTheOperator(operator) { // Process the operator on current display
        if(checksLastElement.IsOperator()) {        
            currentDisplay.innerHTML = currentDisplay.innerHTML.replace(/(\W$)/, operator); // Replace the last element by the operator
            return;
        } else {
            currentDisplay.innerHTML += operator // Add operator in current display
        }        
    }

    function processThePercentage(percentage) {
        if(checksLastElement.IsOperator() || checksLastElement.isPercentage() ||currentDisplay.innerHTML == 0) {
            return
        } else {
            currentDisplay.innerHTML += percentage
        }
    }

    function processTheDecimal(decimal) {
        if(currentDisplay.innerHTML == 0) {
            currentDisplay.innerHTML = "0" + decimal; // Replace "0." in current display
        } else if(checksLastElement.IsOperator()){
            currentDisplay.innerHTML += "0" + decimal; // Add "0." in current display
        }else {
            currentDisplay.innerHTML += decimal // Add "." in current display
        }
    }    

    function checkLimit() {
        const maxLength = 16;

        // Check if current display length exceeds max length
        if (currentDisplay.innerHTML.length > maxLength) {
            currentDisplay.innerHTML = currentDisplay.innerHTML.substring(0, maxLength) // Limit current display text to 19 digits
        }
    }

    function showResultDisplay() {
        // Check if current display is null
        if (currentDisplay.innerHTML == 0) {
            resultDisplay.classList.remove("active"); // Remove class 'active'
        } else {
            resultDisplay.classList.add("active") // Add class 'active'
        }
    }

    function continueExpression() { // Continue expression from equal if resultDisplay be focused
        if(resultDisplay.classList.contains('focus')) {
            currentDisplay.innerHTML = resultDisplay.innerHTML.substring(2)
            currentDisplay.style.fontSize = "50px"
        }

    }

    function focusOnDisplay(display) {
        // Only ONE display can have the class 'focus'
        if (display == "current") {
            resultDisplay.classList.remove("focus");
            currentDisplay.classList.add("focus");
        } else {
            currentDisplay.style.fontSize = "30px"
            currentDisplay.classList.remove("focus");
            resultDisplay.classList.add("focus");
        }
    }

    function removeLastElement() {
        /// Check if has one element in current display
        if(currentDisplay.innerHTML.length < 2) {
            currentDisplay.innerHTML = "0";
            return;
        }

        currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1) // Remove the last element of the current display
    }

    const checksLastElement = {
        IsOperator() { // Check if the last element is operator
            const operators = ["+", "-", "*", "/"]; // All operators
            const lastElement = currentDisplay.innerHTML[currentDisplay.innerHTML.length - 1]; // Get the last element of current display
            const isOperator = operators.includes(lastElement) // Check if lastElement is in the operators
    
            if(isOperator) {
                return true;
            } else {
                return false;
            }
        },

        isPercentage() { // Check if the last element is percentage  
            const lastElement = currentDisplay.innerHTML[currentDisplay.innerHTML.length - 1]; // Get the last element of current display          
            if(lastElement == "%") {
                return true;
            } else {
                return false
            }
        }
    }

    return {
        processTheDigit,
        processTheOperator,
        processThePercentage,
        processTheDecimal,
        checkLimit,
        showResultDisplay,
        continueExpression,
        focusOnDisplay,
        removeLastElement
    }
}
