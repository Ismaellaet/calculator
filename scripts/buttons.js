import { createDisplaysRules } from "./displays.js";
import { createCalculation } from "./calculator.js";

const displayRules = createDisplaysRules();
const calculation = createCalculation;

const createButtonsEvents = () => {

    function numericalEvents() {
        const numbersCollection = document.getElementsByClassName("number");

        for(const digit of numbersCollection) { 
            digit.addEventListener('click', () => { // Add events on each digit click
                displayRules.checkLimit();
                displayRules.continueExpression();
                displayRules.processTheDigit(digit.innerHTML)
                displayRules.focusOnDisplay("current");
                displayRules.showResultDisplay();                
                calculation()
            })
        }
    }

    function operatorEvents() {
        const operatorsCollection = document.getElementsByClassName("operator");

        for(const operator of operatorsCollection) { // Add events on each operator click
            operator.addEventListener('click', () => {
                displayRules.continueExpression();
                displayRules.processTheOperator(operator.value);
                displayRules.checkLimit();
                displayRules.focusOnDisplay("current")
                calculation()
            })
        }
    }

    function percentageEvents() {
        const percentageButton = document.querySelector(".percentage");

        percentageButton.addEventListener('click', () => {
            displayRules.continueExpression();
            displayRules.checkLimit()
            displayRules.processThePercentage(percentageButton.value);
            displayRules.focusOnDisplay("current");
            calculation()
        })
    }

    function decimalEvents() {
        const decimalButton = document.querySelector('.decimal');

        decimalButton.addEventListener('click', () => {
            displayRules.continueExpression();
            displayRules.checkLimit();
            displayRules.processTheDecimal(decimalButton.innerHTML);
        })
    }

    function backspaceEvents() {
        const backspaceButton = document.querySelector('.backspace');

        backspaceButton.addEventListener('click', () => {
            displayRules.removeLastElement();
            displayRules.focusOnDisplay("current");
            calculation()
        })
    }

    function clearEvents() {
        const clearsButton = document.querySelector('.clear-allClear');
        const currentDisplay = document.querySelector('.current-display');
        const resultDisplay = document.querySelector('.result-display');
        

        clearsButton.addEventListener('click', () => {
            currentDisplay.innerHTML = "0"; // Resets the current display
            resultDisplay.classList.remove('active'); // Remove class 'active' from result display            
            displayRules.focusOnDisplay("current");            
        })
    }

    function equalEvents() {
        const equalButton = document.querySelector('.equal');

        equalButton.addEventListener('click', () => {
            displayRules.focusOnDisplay("result");
        })
    }

    function addAll() {
        try {
            numericalEvents();
            operatorEvents();
            percentageEvents();
            decimalEvents();
            backspaceEvents();
            clearEvents();
            equalEvents();
        } catch(e) {
            console.log(e.message);
        }
    }

    return {
        addAll
    }
}

createButtonsEvents().addAll()
