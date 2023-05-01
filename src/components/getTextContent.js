const getTextContent = (name, allKey) => Array.from(allKey)
  .filter((key) => key.classList.contains(name))[0].textContent;

export default getTextContent;
