import { Calculator } from "./calculator.js";
import { Calculation } from "./calculator.js";
import { Displays } from "./displays.js";

const currentDisplay = document.querySelector('.current-display');
const resultDisplay = document.querySelector('.result-display');


export default function addButtons() {
    const calculator = Calculator();
    const display = Displays();

    function numericalEvents() {
        const numberCollection = document.getElementsByClassName('number'); 

        for (const digit of numberCollection) {
            digit.addEventListener('click', () => {
                calculator.changeCurrentDisplay();
                display.setLimit();

                
                display.addClassFocus(currentDisplay)
                display.toggleResultDisplay();
                display.decreaseFontSize();
                if (currentDisplay.innerHTML == 0) {
                    currentDisplay.innerHTML = digit.innerHTML; // Replace 0 by digit
                } else {
                    currentDisplay.innerHTML += digit.innerHTML; // Add number in current display
                }

                Calculation()
            })
        }
    }

    function operatorEvents() {
        const operatorCollection = document.getElementsByClassName('operator')
        

        for (const operator of operatorCollection) {
            operator.addEventListener('click', () => {
                calculator.changeCurrentDisplay();
                const isOperator = calculator.checkIfIsOperator();
                if (isOperator) {
                    currentDisplay.innerHTML = currentDisplay.innerHTML.replace(/(\W$)/, `${operator.value}`) // Replace last element by the operator that was clicked

                } else {
                    currentDisplay.innerHTML += operator.value; // Add operator in current display text
                }

                display.setLimit();
                display.addClassFocus(currentDisplay)
            })
        }
    }

    function percentageEvents() {
        const percentageButton = document.querySelector('.percentage');

        percentageButton.addEventListener('click', () => {
            calculator.changeCurrentDisplay();
            if (currentDisplay.innerHTML == 0) { return }

            display.setLimit();
            currentDisplay.innerHTML += percentageButton.value;
            display.addClassFocus(currentDisplay)
            Calculation()
        })
    }

    function decimalEvents() {
        const decimalButton = document.querySelector('.decimal');
        const isOperator = calculator.checkIfIsOperator();

        decimalButton.addEventListener('click', () => {
            display.setLimit();
            if (isOperator) {
                currentDisplay.innerHTML += '0' + decimalButton.innerHTML; // Add 0. in current display
            } else {
                currentDisplay.innerHTML += decimalButton.innerHTML; // Add . in current display
            }

        })
    }

    function backspaceEvents() {
        const backspaceButton = document.querySelector('.backspace');

        backspaceButton.addEventListener('click', () => {
            calculator.changeCurrentDisplay();
            if (currentDisplay.innerHTML.length < 2) { // Check if has one element in current display text
                currentDisplay.innerHTML = "0";
            } else {
                currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1) // Remove the last number of the current display
            }
            
            display.addClassFocus(currentDisplay)
            Calculation()
        })
    }

    function clearsEvents() {
        const clearsButton = document.querySelector('.clear-allClear');

        clearsButton.addEventListener('click', () => {

                currentDisplay.innerHTML = "0";

                display.addClassFocus(currentDisplay)
                display.classActive.remove(resultDisplay)            
        })
    }

    function equalEvents() {
        const equalButton = document.querySelector('.equal');

        equalButton.addEventListener('click', () => {
            display.addClassFocus(resultDisplay)
        })
    }

    function addAllEvents() {
        try {
            numericalEvents();
            operatorEvents();
            percentageEvents();
            decimalEvents();
            backspaceEvents();
            clearsEvents();
            equalEvents();
        } catch (error) {
            console.log(error.message);
        }
    }

    return {
        addAllEvents
    }
}

addButtons().addAllEvents();