import drawElement from './components/drawElement';
import checkBtnClick from './components/checkBtnClick';
import addLetter from './components/addLetter';
import getTextContent from './components/getTextContent';

class App {
  constructor() {
    this.isCtrlPressed = false;
    this.lang = localStorage.getItem('language') || 'en';
    this.CapsLock = false;
    this.Shift = false;
    this.textField = null;
    this.allKey = null;
    this.cursorPosition = 0;
    this.text = '';
  }

  init() {
    // Инициализация приложения
    drawElement();
    this.textField = document.querySelector('.text-field');
    this.allKey = document.querySelectorAll('.keyboard-key');
    addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
    this.addEventListeners();
  }

  addEventListeners() {
    // Добавление обработчиков событий
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    this.allKey.forEach((key) => {
      key.addEventListener('click', this.handleKeyClick.bind(this));
      key.addEventListener('mousedown', this.handleMouseDown.bind(this));
      key.addEventListener('mouseup', this.handleMouseUp.bind(this));
    });
  }

  handleKeyDown(event) {
    // Обработчик нажатия клавиш
    const activeSymbol = getTextContent(event.code, this.allKey);
    this.text = this.textField.value;
    this.cursorPosition = this.textField.selectionStart;

    if (event.code === 'ControlLeft') {
      this.isCtrlPressed = true;
    }
    if (
      (event.code === 'AltLeft' && this.isCtrlPressed)
      || (event.code === 'ControlLeft' && event.altKey)
    ) {
      this.isCtrlPressed = false;
      this.lang = this.lang === 'en' ? 'ru' : 'en';
      localStorage.setItem('language', this.lang);
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
    }

    if (activeSymbol.length === 1) {
      this.textField.value = this.text.slice(0, this.cursorPosition)
        + activeSymbol
        + this.text.slice(this.cursorPosition);
      this.textField.selectionStart = this.cursorPosition + 1;
      this.textField.selectionEnd = this.cursorPosition + 1;
      event.preventDefault();
    } else if (event.key === 'CapsLock') {
      this.CapsLock = !this.CapsLock;
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
      checkBtnClick('CapsLock', this.allKey);
    } else if (event.key === 'Shift') {
      this.Shift = true;
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
    } else if (event.code === 'Backspace') {
      if (this.cursorPosition > 0) {
        this.textField.value = this.text.slice(0, this.cursorPosition - 1)
          + this.text.slice(this.cursorPosition);
        this.textField.selectionStart = this.cursorPosition - 1;
        this.textField.selectionEnd = this.cursorPosition - 1;
      }
      event.preventDefault();
    } else if (event.code === 'Delete') {
      if (this.cursorPosition < this.text.length) {
        this.textField.value = this.text.slice(0, this.cursorPosition)
          + this.text.slice(this.cursorPosition + 1);
        this.textField.selectionStart = this.cursorPosition;
        this.textField.selectionEnd = this.cursorPosition;
      }
      event.preventDefault();
    } else if (event.code === 'Space') {
      event.preventDefault();
      this.keyOperation(' ', 1);
    } else if (event.code === 'Tab') {
      event.preventDefault();
      this.keyOperation('    ', 4);
    } else if (event.code === 'Enter') {
      event.preventDefault();
      this.keyOperation('\n', 1);
    }

    checkBtnClick(event.code, this.allKey);
  }

  handleKeyUp(event) {
    if (event.key === 'Shift') {
      this.Shift = false;
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
    }
    if (event.code === 'ControlLeft') {
      this.isCtrlPressed = false;
    }
    checkBtnClick(event.code, this.allKey);
    this.cursorPosition = this.textField.selectionStart;
  }

  handleKeyClick(event) {
    // Обработчик нажатия клавиш (button)
    const key = event.target;
    this.cursorPosition = this.textField.selectionStart;
    this.text = this.textField.value;
    this.textField.focus();
    this.textField.setSelectionRange(this.cursorPosition, this.cursorPosition);

    if (key.textContent.length === 1) {
      this.textField.value = this.text.slice(0, this.cursorPosition)
      + key.textContent + this.text.slice(this.cursorPosition);
      this.textField.selectionStart = this.cursorPosition + 1;
      this.textField.selectionEnd = this.cursorPosition + 1;
      event.preventDefault();
    } else if (key.textContent === 'CapsLock') {
      this.CapsLock = this.CapsLock !== true;
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
      key.classList.toggle('active-key');
    } else if (key.classList.contains('Backspace')) {
      if (this.cursorPosition > 0) {
        this.textField.value = this.text.slice(0, this.cursorPosition - 1)
        + this.text.slice(this.cursorPosition);
        this.textField.selectionStart = this.cursorPosition - 1;
        this.textField.selectionEnd = this.cursorPosition - 1;
      }
      event.preventDefault();
    } else if (key.classList.contains('Delete')) {
      if (this.cursorPosition < this.text.length) {
        this.textField.value = this.text.slice(0, this.cursorPosition)
        + this.text.slice(this.cursorPosition + 1);
        this.textField.selectionStart = this.cursorPosition;
        this.textField.selectionEnd = this.cursorPosition;
      }
      event.preventDefault();
    } else if (key.classList.contains('Space')) {
      event.preventDefault();
      this.keyOperation(' ', 1);
    } else if (key.classList.contains('Tab')) {
      event.preventDefault();
      this.keyOperation('    ', 4);
    } else if (key.classList.contains('Enter')) {
      event.preventDefault();
      this.keyOperation('\n', 1);
    }
  }

  handleMouseDown(event) {
    if (event.target.textContent === 'Shift') {
      this.Shift = true;
      addLetter(this.CapsLock, this.Shift, this.lang, this.allKey);
    }
  }

  handleMouseUp(event) {
    if (event.target.textContent === 'Shift') {
      this.Shift = false;
      addLetter();
    }
  }

  keyOperation(val, step) {
    this.cursorPosition = this.textField.selectionStart;
    const { value } = this.textField;
    this.textField.value = value.substring(0, this.cursorPosition)
    + val + value.substring(this.cursorPosition);
    this.textField.selectionStart = this.cursorPosition + step;
    this.textField.selectionEnd = this.cursorPosition + step;
  }
}

const app = new App();
app.init();
