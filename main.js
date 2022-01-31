const lightMode = document.querySelector('.calc__light-mode')
const darkMode = document.querySelector('.calc__dark-mode')
const historyPa = document.querySelector('.calc__history-pa')
const currentPa = document.querySelector('.calc__current-pa')
const operationButtons = document.querySelectorAll('[data-operation]')
const numberButtons = document.querySelectorAll('[data-number]')
const clearButton = document.querySelector('[data-clear]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
class Calculator {
    constructor(historyPa, currentPa) {
        this.historyPa = historyPa;
        this.currentPa = currentPa;
        this.clear()
    }

    clear() {
        this.history = '';
        this.current = '';
        this.operation = undefined;

    }
    appendNumber(number) {
        // this.current = number;
        if (number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.current === '') return
        if (this.history !== '') {
            this.compute()
        }
        this.operation = operation
        this.history = this.current
        this.current = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }



    delete() {
        this.current = this.current.toString().slice(0, -1)
    }


    compute() {
        let computation
        const prev = parseFloat(this.history)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return

        switch (this.operation) {

            case '+': computation = prev + curr;
                break;
            case '-': computation = prev - curr;
                break;
            case '÷': computation = prev / curr;
                break;
            case '*': computation = prev * curr;
                break;
            default: return
        }
        this.current = computation
        this.operation = undefined
        this.history = ''
    }

    updateDisplay() {

        this.currentPa.innerText = this.getDisplayNumber(this.current)

        if (this.operation != null) {
            this.historyPa.innerText = `${this.getDisplayNumber(this.history)} ${this.operation}`
        } else {
            this.historyPa.innerText = ''
        }



        if (this.currentPa.innerText.length > 15) {
            currentPa.style.fontSize = '1rem';
        }
        if (this.history.innerText.length > 25) {
            currentPa.style.fontSize = '.5rem';
        }
    }
};


const calculator = new Calculator(historyPa, currentPa)




numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay();
})