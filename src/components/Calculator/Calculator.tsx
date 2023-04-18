import { useState } from "react";
import "./Calculator.scss";
import Switcher from "../Switcher/Switcher";
const calculatorButtons = [
    {
        name: "7",
        type: "number",
        id: "number7",
        className: "number-and-operator",
    },
    {
        name: "8",
        type: "number",
        id: "number8",
        className: "number-and-operator",
    },
    {
        name: "9",
        type: "number",
        id: "number9",
        className: "number-and-operator",
    },
    {
        name: "DEL",
        type: "function",
        id: "del",
        className: "function",
    },
    {
        name: "4",
        type: "number",
        id: "number4",
        className: "number-and-operator",
    },
    {
        name: "5",
        type: "number",
        id: "number5",
        className: "number-and-operator",
    },
    {
        name: "6",
        type: "number",
        id: "number6",
        className: "number-and-operator",
    },
    {
        name: "+",
        type: "operator",
        id: "+",
        className: "number-and-operator",
    },
    {
        name: "1",
        type: "number",
        id: "number1",
        className: "number-and-operator",
    },
    {
        name: "2",
        type: "number",
        id: "number2",
        className: "number-and-operator",
    },
    {
        name: "3",
        type: "number",
        id: "number3",
        className: "number-and-operator",
    },
    {
        name: "-",
        type: "operator",
        id: "-",
        className: "number-and-operator",
    },
    {
        name: ".",
        type: "number",
        id: ".",
        className: "number-and-operator",
    },
    {
        name: "0",
        type: "number",
        id: "0",
        className: "number-and-operator",
    },
    {
        name: "/",
        type: "operator",
        id: "/",
        className: "number-and-operator",
    },
    {
        name: "×",
        type: "operator",
        id: "×",
        className: "number-and-operator",
    },
    {
        name: "RESET",
        type: "function",
        id: "reset",
        className: "last-item function",
    },
    {
        name: "=",
        type: "operator",
        id: "=",
        className: "last-item result",
    },
];


interface HeaderProps {
    handlePositionChange: (position: number) => void;
}

const Header: React.FC<HeaderProps> = ({ handlePositionChange }) => {

    return (
        <div className="header">
            <h1>calc</h1>
            <div className="theme-wrapper">
                <span>THEME</span>
                <div>
                    <div className="theme-number">
                        <label>1</label>
                        <label>2</label>
                        <label>3</label>
                    </div>
                    <Switcher onPositionChange={handlePositionChange}></Switcher>
                </div>
            </div>
        </div>
    );
};
const Calculator = () => {
    const [result, setResult] = useState("0");
    const [currentNumber, setCurrentNumber] = useState("");
    const displayValue = currentNumber || result;

    const handleButtonClick = (button: { name: string; type: string; id?: string; className?: string; }) => {
        const buttonName = button.name;
        let tempNumber = currentNumber;
        if (currentNumber === "" && (button.type === "operator" || button.type === "function")) {
            tempNumber = result
        }
        switch (buttonName) {
            case "DEL":
                let tempResult = tempNumber.slice(0, -1);
                setCurrentNumber(tempResult ? tempResult : "");
                setResult(tempResult ? tempResult : "0");
                break;
            case "RESET":
                setCurrentNumber("");
                setResult("0");
                break;
            case "=":
                calculateResult();
                break;
            case ".":
                if (!currentNumber.includes(".")) {
                    setCurrentNumber(tempNumber + ".");
                }
                break;
            default:
                setCurrentNumber(tempNumber + buttonName);
                break;
        }
    };
    const calculateResult = () => {
        console.log(currentNumber)
        let expression = currentNumber.replace(/×/g, "*"); // replace "x" with "*"
        let result = 0;

        // parse the expression from left to right
        let numbers = expression.split(/[-+*/]/);
        let operators = expression.match(/[-+*/]/g);
        // apply the operators to the numbers
        if (operators) {
            for (let i = 0; i < operators?.length; i++) {
                let operator = operators[i];
                let num1 = parseFloat(numbers[i]);
                let num2 = parseFloat(numbers[i + 1]);

                if (operator === "+") {
                    result = num1 + num2;
                } else if (operator === "-") {
                    result = num1 - num2;
                } else if (operator === "*") {
                    result = num1 * num2;
                } else if (operator === "/") {
                    result = num1 / num2;
                }
                numbers[i + 1] = result.toString();
            }
        }

        setResult(result.toString());
        setCurrentNumber("");
    };

    function setTheme(theme: string) {
        document.documentElement.className = theme;
    }

    const handlePositionChange = (newPosition: any) => {
        setTheme(`theme${newPosition}`);
    };

    return (
        <div>
            <div>
                <Header handlePositionChange={handlePositionChange} />
            </div>
            <div className="display-value">{displayValue}</div>
            <div className="buttons-layout">
                {calculatorButtons.map((button) => (
                    <button
                        key={button.id}
                        className={button.className}
                        onClick={() => handleButtonClick({ ...button })}
                    >ㅤ
                        <div>
                            {button.name}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
export default Calculator;
