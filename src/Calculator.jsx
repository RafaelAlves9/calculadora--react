import React, { Component} from 'react'
import Buttons from './components/Buttons'
import Value from './components/Value'

const initialStateValue = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

//exportação para o Index.js
export default class Calculator extends Component {
    state = { ...initialStateValue }

    //definindo referência fixa das funções abaixo
    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory() {
        this.setState({ ...initialStateValue })
    }

    setOperation(operation) {
      if (this.state.current === 0) {
          this.setState({ operation, current: 1, clearDisplay: true})
      } else {
          const equals = operation === '='
          const currentOperation = this.state.operation
          
          const values = [...this.state.values]
         try {
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
         } catch(e) {
             values[0] = this.state.values[0]
         }

         values[1] = 0

          this.setState({
              displayValue: values[0].toFixed([1]),
              operation: equals ? null : operation,
              current: equals ? 0 : 1,
              clearDisplay: true,
              values
          })
      }
    }

    addDigit(digit) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + digit
        this.setState( {displayValue, clearDisplay: false} )

        if (digit !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            
            console.log(values)
        }
    }

    //renderizando JSX
    render() {

        return (
            <div className="calculator">
            <Value value={this.state.displayValue}/>
            <div className="squares">
                <Buttons label="AC" click={this.clearMemory} triple/>
                <Buttons label="/" click={this.setOperation} operation/>
                <Buttons label="7" click={this.addDigit}/>
                <Buttons label='8' click={this.addDigit}/>
                <Buttons label='9' click={this.addDigit}/>
                <Buttons label='*' click={this.setOperation} operation/>
                <Buttons label='4' click={this.addDigit}/>
                <Buttons label='5' click={this.addDigit}/>
                <Buttons label='6' click={this.addDigit}/>
                <Buttons label='-' click={this.setOperation} operation/>
                <Buttons label='1' click={this.addDigit}/>
                <Buttons label='2' click={this.addDigit}/>
                <Buttons label='3' click={this.addDigit}/>
                <Buttons label='+' click={this.setOperation} operation/>
                <Buttons label='0' click={this.addDigit} double/>
                <Buttons label='.' click={this.addDigit}/>
                <Buttons label='=' click={this.setOperation} operation/>
            </div>
        </div>
        )}
}