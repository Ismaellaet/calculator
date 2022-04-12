export function createCalculation() {
    const currentDisplay = document.querySelector('.current-display');
    const resultDisplay = document.querySelector('.result-display');
    let expression = currentDisplay.innerHTML.split(/(?!\.)(\W)/g);
    
    const operations = {
        percentage: '%',
        multiplication: '*',
        division: '/',
        addition: '+',
        subtraction: '-',
    }

    function calculatePercentage() {
        const hasPercentage = expression.includes(operations.percentage) // Check if the expression has percentage
        if(hasPercentage) {
            let firstAppearance = expression.findIndex(element => element === '%'); // Store the index of the first appearance of the percentage
            const previousValue = Number(expression[firstAppearance - 1]); // Get the previous value of the first appearance
            let result = previousValue / 100;   
            
            expression.splice(firstAppearance - 1, 2, result)
        }        
    }

    function firstPriority() {
        const hasMutiplication = expression.includes(operations.multiplication); // Check if has multiplication in expression
        const hasDivision = expression.includes(operations.division); // Check if has division in expression

        if(hasMutiplication || hasDivision) {
            let firstAppearance = expression.findIndex(element => element === '*' || element === '/'); // Store the index of the first appearance of the multiplication or division
            const previousValue = Number(expression[firstAppearance - 1]); // Get the previous value of the first appearance
            const nextValue = Number(expression[firstAppearance + 1]) // Get the next value of the first appearance
            const isMultiplication = expression[firstAppearance] === '*'; // Check if first appearance is multiplication
            const isDivision = expression[firstAppearance] === '/'; // Check if first appearance is division
            let result;

            if(isNaN(nextValue)) {return} // Avoids calculate NaN

            if(isMultiplication) {
                result = previousValue * nextValue;
            }
            
            if(isDivision){
                result = previousValue / nextValue;
            }

            expression.splice(firstAppearance - 1, 3, result); // Replace the previous and next value to result

            if(expression.length >= 3) {
                firstPriority()
            }
        }
    }

    function secondPriority() {
        const hasAddition = expression.includes(operations.addition); // Check if has addition in expression
        const hasSubtraction = expression.includes(operations.subtraction); // Check if has subtraction in expression

        if(hasAddition || hasSubtraction) {
            let firstAppearance = expression.findIndex(element => element === '+' || element === '-'); // Store the index of the first appearance of the addition or subtraction
            const previousValue = Number(expression[firstAppearance - 1]); // Get the previous value of the first appearance
            const nextValue = Number(expression[firstAppearance + 1]) // Get the next value of the first appearance
            const isAddition = expression[firstAppearance] === '+'; // Check if first appearance is addition
            const isSubtraction = expression[firstAppearance] === '-'; // Check if first appearance is subtraction
            let result;

            if(isNaN(nextValue)) {return} // Avoids calculate NaN

            if(isAddition) {
                result = previousValue + nextValue;
            }
            
            if(isSubtraction){
                result = previousValue - nextValue;
            }

            expression.splice(firstAppearance - 1, 3, result); // Replace the previous and next value to result

            if(expression.length >= 3) {
                secondPriority()
            }
        }
    }

    function removeWhiteSpaces() { // Remove white spaces from expression
        if(expression.includes("")) {
            expression = expression.filter((item) => item != "")
        }
    }

    function calculateExpression() {
        removeWhiteSpaces()

        if(expression.length <= 2) {
            calculatePercentage()
        }
        else if(expression.length >= 3) { 
            calculatePercentage()
            firstPriority()   
            secondPriority()   
        }
    }

    function showResult() {
        calculateExpression()
        expression = parseFloat(Number(expression[0]).toFixed(3))
        resultDisplay.innerHTML = `= ${expression}`
    }
    showResult()
    return {
        
    }
}