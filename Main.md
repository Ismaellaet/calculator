# Calculatora
## Displays

- **current-display** = valor onde será mostrado a **equação**

- **result-display** = valor onde será mostrado o **resultado** do *current-display*
# 
## Inputs
### Tipos
- numero => 1,2,3,4,5,6,7,8,9,0 

- operador => +, -, *, /, =

- clear && allClear => C, AC

- porcentagem => %

- backspace

### Fluxo de eventos
- Input numeros = Adicionar números no **current-display** [x]

- Input operador '+' = Função de Adição [x]

- Input operador '-' = Função de Subtração [x]

- Input operador '*' = Função de Multiplicação [x]

- Input operador '/' = Função de Divisão [x]

- Input operador '=' = Função de Igualdade [x]

- Input *C* = Zerar o **current-display** [x]

- Input *Backspace* = Apagar um dígito do **current-display** [x]
# 
## Regra de negócios

- Operadores só poderão ser adicionados na expressão se NÃO for seguido de outro operador, caso for seguido, substituir o operador atual pelo anterior [x]

- Quando adicionado qualquer valor dentro do **current-display**, mostrar o **result-display** [x]

- Diminuir tamanho da fonte do **current-display** em 0.4rem cada vez que a largura do mesmo for maior ou igual a 280px [x]

- Focar o **result-display** se o usuário solicitar o resultado, caso o contrário, focar **current-display** [x]