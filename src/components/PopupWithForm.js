import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._form = this._popup.querySelector(".modal__form");
    this._inputs = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  getForm() {
    return this._form;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name] ?? "";
    });
  }

  _getInputValues() {
    const values = {};

    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
