const checkBtnClick = (el, allKey) => Array.from(allKey)
  .filter((key) => (key.classList.contains(el) ? key.classList.toggle('active-key') : key));

export default checkBtnClick;
