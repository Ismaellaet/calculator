# Documentation
## Displays

- **current-display** => Value where the **expression** will be shown

- **result-display** = Value where the **result** of the **current-display** will be shown 
# 
## Buttons
### Types
- Numbers => 1,2,3,4,5,6,7,8,9,0 

- Operators => +, -, *, /, =

- Percentage => %

- Decimal => ","

- Clear => C

- Backspace 

- Theme switcher

### Event Flow
- Button Numbers => Add numbers in **current-display** [x]

- Button Operator '+' => Addiction Function [x]

- Button Operator '-' => Subtraction Function [x]

- Button Operator '*' => Multiplication Function [x]

- Button Operator '/' => Division Function [x]

- Button Operator '=' => Show result of the expression [x]

- Button Percentage => Divide the number by 100

- Button Decimal => Add decimal place

- Button *C* => Reset **current-display** [x]

- Button *Backspace* => Remove last digit of the **current-display** [x]

- Theme switcher => Change between Dark Mode and Light Mode [x]
# 
## Displays Rules

- Operators can only be added to the expression if they are NOT followed by another operator [x]

- When adding any value within the **current-display**, show **result-display** [x]

- Decrease font size of the **current-display** each time its width is greater than or equal to calculator width  [x]

- Focus the **result-display** if the user requests the result, otherwise focus **current-display** [x]

- Set 18 as the length limit [x]

- User continues the expression from the result [x]

