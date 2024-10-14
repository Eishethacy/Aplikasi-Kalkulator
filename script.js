const calculator = {
    displayValue: '0',
    currentInput: '', // Untuk menyimpan ekspresi perhitungan
  };
  
  function inputDigit(digit) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    calculator.currentInput += digit; // Tambahkan digit ke ekspresi
  }
  
  function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
      calculator.currentInput += dot;
    }
  }
  
  function handleOperator(operator) {
    const { displayValue } = calculator;
    if (/[+\-*/]$/.test(calculator.currentInput)) {
      // Cegah dua operator berturut-turut
      calculator.currentInput = calculator.currentInput.slice(0, -1) + operator;
    } else {
      calculator.currentInput += operator;
    }
    calculator.displayValue += operator;
  }
  
  function calculate() {
    try {
      // Evaluasi ekspresi matematika
      const result = eval(calculator.currentInput);
      calculator.displayValue = String(result);
      calculator.currentInput = String(result); // Update ekspresi setelah evaluasi
    } catch (error) {
      calculator.displayValue = 'Error'; // Tampilkan error jika ada kesalahan
    }
  }
  
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.currentInput = '';
  }
  
  function updateDisplay() {
    const display = document.querySelector('#display');
    display.value = calculator.displayValue;
  }
  
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    if (target.classList.contains('equal-sign')) {
      calculate();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });
  