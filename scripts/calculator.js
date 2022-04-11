import { Displays } from './displays.js';

const display = Displays();
const currentDisplay = document.querySelector('.current-display');
const resultDisplay = document.querySelector('.result-display');
let resultFinal;

export const Calculator = () => {
    
    function checkIfIsOperator() {
        const allOperators = ["+", "-", "*", "/", "%"] // All operators
        const lastIndex = currentDisplay.innerHTML.length - 1; // Last index of current display text
        const lastElement = currentDisplay.innerHTML[lastIndex]; // Last element of current display text
        const lastElementIsOperator = allOperators.includes(lastElement); // Check if last element is operators

        return lastElementIsOperator;
    }

    function checkIfIsNull() {
        const isNull = currentDisplay.innerHTML === "0"; // Check if current display text is null

        return isNull;
    }

    function changeCurrentDisplay() {
        if(resultDisplay.classList.contains('focus')) {
            currentDisplay.innerHTML = resultFinal;
            Calculation().expression = [];
        }
    }

    return  {
        checkIfIsNull,
        checkIfIsOperator,
        changeCurrentDisplay
    }
}

export const Calculation = () => {
    const expression = currentDisplay.innerHTML.split(/(?!\.)(\W)/g);
    let availableToCalculate = expression.length >= 3;

    const operations = {
        percentage: '%',
        multiplication: '*',
        division: '/',
        addition: '+',
        subtraction: '-',
    }

    function firstPriorityCalculation() {
        if(expression.includes(operations.percentage)) {
            let firstAppearance = expression.findIndex(element => element === '%')
            
            const value1 = expression[firstAppearance - 1];
            
            let result = value1 / 100;

            expression.splice(firstAppearance - 1, 3, result)
        }        
    }

    function secondPriorityCalculation() { // Calculates '*' and '/'
        if(expression.includes(operations.division) || expression.includes(operations.multiplication)) {
            let firstAppearance = expression.findIndex(element => element === '/' || element === '*')
            const value1 = expression[firstAppearance - 1];
            const value2 = expression[firstAppearance + 1];
            let result;

            if(expression[firstAppearance] === '*') {
                result = value1 * value2
            } else {
                result = value1 / value2
            }

            expression.splice(firstAppearance - 1, 3, result)

            if(expression.length >= 3) {
                secondPriorityCalculation()
            }
        }
    }

    function thirdPriorityCalculation() { // Calculates '+' and '-'
        if(expression.includes(operations.addition) || expression.includes(operations.subtraction)) {
            let firstAppearance = expression.findIndex(element => element === '+' || element === '-')
            const value1 = expression[firstAppearance - 1];
            const value2 = expression[firstAppearance + 1];
            let result;

            if(expression[firstAppearance] === '+') {
                result = Number(value1) + Number(value2)
            } else {
                result = Number(value1) - Number(value2)
            }

            expression.splice(firstAppearance - 1, 3, result)

            if(expression.length >= 3) {
                thirdPriorityCalculation()
            }
        }
    }

    if(expression.length >= 2) {
        firstPriorityCalculation()
    }

    if(availableToCalculate) {
        firstPriorityCalculation()
        secondPriorityCalculation()   
        thirdPriorityCalculation()    
    } 
    
    resultFinal = expression;
    resultDisplay.innerHTML = `= ${expression}`

    return {
        expression
    }
}