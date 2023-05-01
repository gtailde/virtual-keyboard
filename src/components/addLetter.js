const EnKeyboardDataL = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","[", "]", "\\", "Del", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter", "Shift", "z", "x", "c","v", "b", "n", "m", ",", ".", "/", "▲", "Shift", "Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"];
const EnKeyboardDataU = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace", "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p","{", "}", "|", "Del", "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", `"`, "Enter", "Shift", "z", "x", "c","v", "b", "n", "m", "<", ">", "?", "▲", "Shift", "Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"]

const RuKeyboardDataL = ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace", "Tab", "й", "ц","у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del", "CapsLock","ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "▲", "Shift", "Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"];
const RuKeyboardDataU =  ["ё", "!", `"`, "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace", "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/", "Del", "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter", "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", "▲", "Shift", "Ctrl", "Win", "Alt", "", "Alt", "◄", "▼", "►", "Ctrl"];

export const addLetter = (CapsLock, Shift, lang, allKey) => {
  let arr;
  if(CapsLock && !Shift){
    arr = lang === "en" ? EnKeyboardDataL : RuKeyboardDataL;
    arr = arr.map(val => /^[a-zа-яё]$/i.test(val) ? val.toUpperCase() : val);
  } else if(CapsLock && Shift){
    arr = lang === "en" ?EnKeyboardDataU : RuKeyboardDataU;
  } else if(!CapsLock && Shift){
    arr = lang === "en" ? EnKeyboardDataU : RuKeyboardDataU;
    arr = arr.map(val => /^[a-zа-яё]$/i.test(val) ? val.toUpperCase() : val);
  } else if(!CapsLock && !Shift) {
    arr = lang === "en" ? EnKeyboardDataL : RuKeyboardDataL;
  }
  allKey.forEach((key, i) => key.textContent = arr[i]);
}