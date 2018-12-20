function add(a, b) {
      return (+a + +b);
    };
    function subtract(a, b) {
      return a - b;
    };
    function multiply(a, b) {
      return a * b;
    };
    function divide(a, b) {
      if (b == 0){
        return "Error";
      } else {
        return a / b;
      }
    };
    function operate(operator, a, b) {
      return operator == "+" ? add(a, b) : operator == "-" ? subtract(a, b) :
      operator == "*" ? multiply(a, b) : operator == "/" ? divide(a, b) : "error";
    };
    function operateAndReplace(x) {
      var operator = operate(problem[x], problem[x - 1], problem[x + 1]);
      problem.splice(x - 1, 3, operator);
      problemIndex = (problem.length -1);
      problem[problemIndex] = problem[problemIndex].toString();
    };
    // Variables and functions for calculator display
    var problem = [""];
    var problemIndex = (problem.length - 1);
    function numToDisp(x) {
      if (problem.join("").length < 10) {
        problem[problemIndex] += x;
        document.getElementById("displayTwo").innerText = problem.join("");
      };
    };
    document.getElementsByClassName("numPad").addEventListener("click", (e) >= {
            var numberdisp = e.target.innerText;
      document.getElementsByClassName("displayOne").innerText = "";
      if (numberdisp == ".") {
        if (problem.join("").includes(".") == false) {
          numToDisp(numberdisp);
        }
      } else if (numberdisp == "="){
        document.getElementById("displayOne").innerText = problem.join("") + " =";
        while(problem.length > 1) {
          if ((problem.indexOf("*") != -1) && (problem.indexOf("/") != -1)) {
            if (problem.indexOf("*") < problem.indexOf("/")) {
              operateAndReplace(problem.indexOf("*"));
            } else {
              operateAndReplace(problem.indexOf("/"));
            };
          } else if (problem.indexOf("*") != -1) {
            operateAndReplace(problem.indexOf("*"));
          } else if (problem.indexOf("/") != -1) {
            operateAndReplace(problem.indexOf("/"));
          } else if ((problem.indexOf("+") != -1) && (problem.indexOf("-") != -1)) {
            if (problem.indexOf("+") < problem.indexOf("-")) {
              operateAndReplace(problem.indexOf("+"));
            } else {
              operateAndReplace(problem.indexOf("-"));
            };
          } else if (problem.indexOf("+") != -1) {
            operateAndReplace(problem.indexOf("+"));
          } else if (problem.indexOf("-") != -1) {
            operateAndReplace(problem.indexOf("-"));
          };
        }
        problemIndex = (problem.length - 1);
        if (problem[problemIndex].length < 10) {
          document.getElementById("displayTwo").innerText = problem[problemIndex];
        } else {
          if ((problem[problemIndex].indexOf(".") != -1) && (problem[problemIndex].indexOf(".") < 10)) {
            problem[problemIndex] = problem[problemIndex].slice(0, 10);
            document.getElementById("displayTwo").innerText = problem[problemIndex];
          } else {
            document.getElementById("displayTwo").innerText = "Error";
          }
        };
      } else {
        numToDisp(dispNum);
      }
    });
    document.getElementsByClassName("operators").addEventListener("click", (e) => {
      if (e.target.innerText == "del") {
        document.getElementById("displayOne").innerText = "";
        if ((problem[problemIndex].length == 1) && (problemIndex != 0)) {
          problem.pop();
          problemIndex = (problem.length - 1);
          document.getElementById("displayTwo").innerText = problem.join("");
        } else if (problem[problemIndex].length > 1) {
          problem[problemIndex] = problem[problemIndex].slice(0, -1);
          document.getElementById("displayTwo").innerText = problem.join("");
        } else if ((problem[problemIndex].length == 1) && (problemIndex == 0)) {
          problem[problemIndex] = "";
          document.getElementById("displayTwo").innerText = problem.join("");
        } else if ((problem[problemIndex].length == 0) && (problemIndex != 0)) {
          problem.pop();
          problem.pop();
          problemIndex = (problem.length - 1);
          document.getElementById("displayTwo").innerText = problem.join("");
        }
      } else {
        if (problem[problemIndex].length != 0) {
          problem.push("");
          problemIndex = (problem.length - 1);
          numToDisp(e.target.innerText);
          problem.push("");
          problemIndex = (problem.length - 1);
        }
      }
    });
