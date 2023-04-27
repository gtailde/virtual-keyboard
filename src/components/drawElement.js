const keyClasses = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

export const drawElement = () => {
  const keyboardContainer = document.createElement("div");
  keyboardContainer.className = "keyboard-conatiner";
  
  const keyboard = document.createElement("div");
  keyboard.className = "keyboard";

  keyClasses.forEach((val, i) => {
    const btn = document.createElement("button");
    if (val === "Delete") {
      btn.className = `keyboard-key ${val} XS-btn cntrl-btn`;
    } else if (val === "Tab") {
      btn.className = `keyboard-key ${val} S-btn cntrl-btn`;
    } else if (val === "Enter" || val === "ShiftRight") {
      btn.className = `keyboard-key ${val} M-btn cntrl-btn`;
    } else if (val === "Backspace" || val === "CapsLock" || val === "ShiftLeft") {
      btn.className = `keyboard-key ${val} L-btn cntrl-btn`;
    } else if (val === "Space") {
      btn.className = `keyboard-key ${val} XL-btn cntrl-btn`;
    } else {
      btn.className = `keyboard-key ${val}`;
    }    
    keyboard.append(btn);
  })
  keyboardContainer.append(keyboard)

  const textField = document.createElement("textarea");
  textField.className = "text-field";
  textField.cols = "50";
  textField.rows = "10";

  const mainContainer = document.createElement("div");
  mainContainer.className = "main-container";

  mainContainer.append(textField, keyboardContainer);

  const container = document.createElement("div");
  container.className = "container";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = "RSS Виртуальная клавиатура";

  const subTitle = document.createElement("h3");
  subTitle.className = "subtitle";
  subTitle.innerHTML = "Клавиатура создана в операционной системе Windows <br> Для переключения языка комбинация: левыe ctrl + alt";
  container.append(title, mainContainer, subTitle);

  document.body.append(container);
}

