const btnSuma = document.querySelector("#suma");
const btnResta = document.querySelector("#resta");
const btnMult = document.querySelector("#mult");
const btnDiv = document.querySelector("#div");
const btnCalcular = document.querySelector("#calcular");
const oper1 = document.querySelector("#op1");
const oper2 = document.querySelector("#op2");
const resultadoElement = document.querySelector("#resfinal");
const errorElement = document.querySelector("#error");
const btnLimpiar = document.querySelector("#clear");
const op1Element = document.querySelector("#resOp1");
const op2Element = document.querySelector("#resOp2");
const operacionElement = document.querySelector("#operacion");

const botones = [btnSuma, btnResta, btnMult, btnDiv];

botones.forEach((boton) => {
  boton.addEventListener("click", () => agregaClaseBotonPresionado(boton));
});

btnCalcular.addEventListener("click", realizaCalculo);
btnLimpiar.addEventListener("click", limpiar);

function agregaClaseBotonPresionado(boton) {
  //Recorro array de botones para resetear clases cada vez que presiono cualquier boton
  botones.forEach((boton) => {
    limpiarClases(boton);
  });
  //Agrego clase de boton "PRESIONADO" al boton seleccionado
  boton.classList.remove("btn-outline-warning");
  boton.classList.add("btn-warning");
}

// Pone todos los botones en estado "NO PRESIONADO"
function limpiarClases(boton) {
  boton.classList.remove("btn-warning");
  boton.classList.add("btn-outline-warning");
}

//Identifico al boton que fue presionado y llamo a la funcion correspondiente
function realizaCalculo() {
  const botonSeleccionado = botones.find((boton) =>
    boton.classList.contains("btn-warning")
  );

  if (!botonSeleccionado || !oper1.value || !oper2.value) {
    errorElement.textContent = "Ingresa 2 números y seleccioná una operación";
    resultadoElement.textContent = "";
    resultadoElement.classList.remove("resfinal");
    errorElement.classList.add("error");
    return;
  }

  switch (botonSeleccionado.id) {
    case "suma":
      const resultadoSuma = sumar();
      resultadoSuma == "error"
        ? muestraError()
        : muestraResultado(botonSeleccionado.textContent, resultadoSuma);
      break;
    case "resta":
      const resultadoResta = restar();
      resultadoResta == "error"
        ? muestraError()
        : muestraResultado(botonSeleccionado.textContent, resultadoResta);
      break;
    case "div":
      const resultadoDiv = dividir();
      if (resultadoDiv == "error" || resultadoDiv == "error2") {
        muestraError(botonSeleccionado.textContent, resultadoDiv);
      } else {
        muestraResultado(botonSeleccionado.textContent, resultadoDiv);
      }

      break;

    case "mult":
      const resultadoMult = multiplicar();
      resultadoMult == "error"
        ? muestraError()
        : muestraResultado(botonSeleccionado.textContent, resultadoMult);
      break;
    default:
      break;
  }
}

function sumar() {
  let num1 = parseFloat(oper1.value);
  let num2 = parseFloat(oper2.value);
  if (isNaN(num1) || isNaN(num2)) {
    return "error";
  } else {
    return num1 + num2;
  }
}

function restar() {
  let num1 = parseFloat(oper1.value);
  let num2 = parseFloat(oper2.value);
  if (isNaN(num1) || isNaN(num2)) {
    return "error";
  } else {
    return num1 - num2;
  }
}

function multiplicar() {
  let num1 = parseFloat(oper1.value);
  let num2 = parseFloat(oper2.value);
  if (isNaN(num1) || isNaN(num2)) {
    return "error";
  } else {
    return num1 * num2;
  }
}

function dividir() {
  let num1 = parseFloat(oper1.value);
  let num2 = parseFloat(oper2.value);
  if (isNaN(num1) || isNaN(num2)) {
    return "error";
  } else if (num2 === 0) {
    return "error2";
  } else {
    return num1 / num2;
  }
}

function muestraError(operacion, res) {
  resultadoElement.textContent = "";
  resultadoElement.classList.remove("resfinal");
  errorElement.classList.add("error");

  if (operacion == "/") {
    if (res === "error2") {
      errorElement.textContent = "No es posible dividir por 0.";
    } else {
      errorElement.textContent = "Ingresa únicamente números.";
    }
  }
}

function muestraResultado(oper, res) {
  errorElement.textContent = "";
  resultadoElement.textContent = res;
  resultadoElement.classList.add("resfinal");
  errorElement.classList.remove("error");
  op1Element.innerHTML = oper1.value;
  op2Element.innerHTML = oper2.value;
  operacionElement.innerHTML = oper;
}

function limpiar() {
  botones.forEach((boton) => {
    limpiarClases(boton);
  });
  oper1.value = "";
  oper2.value = "";
  resultadoElement.textContent = "";
  resultadoElement.classList.remove("resfinal");
  errorElement.textContent = "";
  errorElement.classList.remove("error");
  op1Element.innerHTML = "";
  op2Element.innerHTML = "";
  operacionElement.innerHTML = "";
}
