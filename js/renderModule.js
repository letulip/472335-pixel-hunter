const mainElement = document.querySelector(`#main`);

const pageRender = (strToRender) => {
  // debugger;
  mainElement.innerHTML = strToRender;
};

export default pageRender;
