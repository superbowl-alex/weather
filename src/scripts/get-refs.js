// create references to DOM elements
export default function getRefs() {
  return {
    form: document.querySelector('.search-form'),
    input: document.querySelector('.search-form__input'),
    weatherBlock: document.querySelector('#weather'),
    loading: document.querySelector('.weather__loading'),
    start: document.querySelector('.weather__start'),
  };
}
