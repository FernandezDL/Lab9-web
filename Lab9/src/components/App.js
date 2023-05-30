import React from 'react';
import './App.css';
import { useState, useEffect } from 'react'
import {NumericFormat} from 'react-number-format'

function App(){
    const [input, setInput] = useState("0")
    const [preState, setPreState] = useState("")
    const [curState, setCurState] = useState("") 
    const [operator, setOperator] = useState(null)
    const [total, setTotal] = useState(false)
    const [error, setError] = useState(false)
    const [neg, setNeg] = useState(false)

    const inputNumber = (e) =>{
        if (curState.includes(".") && e.target.innerText === ".") 
            return;

        if (total){
            setPreState("")
        }

        if(curState.length>= 9)
            return;

        curState ? setCurState(pre => pre + e.target.innerText) : 
        setCurState(e.target.innerText)

        setTotal(false)
    };
    
    useEffect(() =>{
        setInput(curState)

    }, [curState]);

    useEffect(() =>{
        setInput(curState || "0")
    }, []);

    const reset= () =>{
        setCurState("")
        setPreState("")
        setInput("0")
        setError(false)
        setNeg(false)
    };

    const typeOperator = (e) =>{
        setTotal(false)
        setOperator(e.target.innerText)

        if(curState=== "") 
            return

        if(preState !== "")
        {
            equals()
        } 
        else
        {
            setPreState(curState)
            setCurState("")
        }
    };
    
    const equals = (e) =>{
        if(e?.target.innerText === "=")
        {
            setTotal(true)
        }

        let calc;

        switch (operator) {
            case "/":

                if(curState)
                {
                    setError(true)
                }
                else
                {
                    calc = String(parseFloat(preState) / parseFloat(curState))

                    if (calc.length > 9) {
                        calc = calc.slice(0, 9);
                    }
                }
            break;
            
            case "+":
                calc = String(parseFloat(preState) + parseFloat(curState)) 
                
                if(calc>999999999)
                {
                    setError(true)
                }
                else
                {
                    setError(false)
                    console.log(error)

                    if (calc.length > 9) {
                    calc = calc.slice(0, 9);
                    }
                }
            break;
            
            case "*":
                calc = String(parseFloat(preState) * parseFloat(curState))

                if(calc>999999999)
                {
                    setError(true)
                }
                else
                {
                    setError(false)
                    console.log(error)

                    if (calc.length > 9) {
                    calc = calc.slice(0, 9);
                    }
                }
            break;
            
            case "-":
                if(neg)
                {
                    calc = String(parseFloat(preState) - parseFloat(curState))
                    
                    if(calc<-99999999)
                    {
                        setError(true)
                        console.log(error)

                    }
                    else
                    {
                        setError(false)

                        if (calc.length > 9) {
                        calc = calc.slice(0, 9);
                        }
                    }
                }
                else
                {
                    if(preState < curState)
                    {
                        setError(true)
                        console.log(error)
                    }
                    else{
                        calc = String(parseFloat(preState) - parseFloat(curState))   
                    }        
                }

            break;  
            
            case "%":
                calc = String(parseFloat(preState) % parseFloat(curState))        
            break;

            default:
                return
        }


        setInput("")
        setPreState(calc)
        setCurState("")
    };

    const minusPlus =()=>{
        if(curState=== "0")
            return;

        if(curState.charAt(0) === "-")
        {
            setCurState(curState.substring(1))
            setNeg(false)
        }
        else
        {
            setCurState("-" + curState)
            setNeg(true)
        }
    };
    
    return(
        <div className="fondo">
            <div className="display">
                {error ? ("Error D:") 
                    : 
                    ( input !== "" || input === 0 ? 
                        (<NumericFormat value={input} displayType={"text"} 
                        thousandSeparator={true} />) 
                        : 
                        (<NumericFormat value={preState} displayType={"text"} 
                        thousandSeparator={true} />) 
                    )
                }
            </div>

            <div className="fila">
                <div className="botonesOp" onClick={reset}>C</div>
                <div className="botonesOp" onClick={minusPlus}>+/-​</div>
                <div className="botonesOp" onClick={typeOperator}>%</div>
                <div className="botonesOp" onClick={typeOperator}>/</div>
            </div>

            <div className="fila">
                <div className="botones" onClick={inputNumber}>7</div>
                <div className="botones" onClick={inputNumber}>8</div>
                <div className="botones" onClick={inputNumber}>9</div>
                <div className="botonesOp" onClick={typeOperator}>*</div>
            </div>

            <div className="fila">
                <div className="botones" onClick={inputNumber}>4</div>
                <div className="botones" onClick={inputNumber}>5</div>
                <div className="botones" onClick={inputNumber}>6</div>
                <div className="botonesOp" onClick={typeOperator}>-</div>
            </div>

            {/* <div className="filaFila"> */}
                <div className="filaAbajo">
                    <div className="fila">
                        <div className="botones" onClick={inputNumber}>1</div>
                        <div className="botones" onClick={inputNumber}>2</div>
                        <div className="botones" onClick={inputNumber}>3</div>
                        <div className="botonesOp" onClick={typeOperator}>+</div>
                    </div>

                    <div className="fila">
                        <div className="botonCero" onClick={inputNumber}>0</div>
                        <div className="botones" onClick={inputNumber}>.</div>
                        <div className="botonesOp" onClick={equals}>=</div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default App;