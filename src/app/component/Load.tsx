import React from "react";

export default function Load() {
  function generateMathProblem() {
    const operators = ["+", "-", "*", "/"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const number1 = Math.floor(Math.random() * 100) + 1;
    const number2 = Math.floor(Math.random() * 100) + 1;
    let question, answer;
    switch (operator) {
      case "+":
        question = `${number1} + ${number2}`;
        answer = number1 + number2;
        break;
      case "-":
        question = `${number1} - ${number2}`;
        answer = number1 - number2;
        break;
      case "*":
        question = `${number1} * ${number2}`;
        answer = number1 * number2;
        break;
      case "/":
        if (number2 !== 0) {
          question = `${number1} ÷ ${number2}`;
          answer = Math.floor(number1 / number2);
        } else {
          return generateMathProblem();
        }
        break;
    }
    return {
      question: question,
      answer: answer,
    };
  }
  const [mathProblem, setMathProblem] = React.useState(
    generateMathProblem().question
  );
  return (
    <div className=" bg-black text-white flex justify-center items-center absolute w-full h-full">
      <div className=" animate-pulse text-[2rem] text-[#edff08]">
        {`${mathProblem} = ? `}
      </div>
    </div>
  );
}
