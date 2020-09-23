class FormControl {
  #$input;
  #$feedback;
  #name;
  #validationFn;
  #isRadioButton = false;

  constructor(name, validationFn) {
    this.#validationFn = validationFn;
    this.#name = name;
    const form = document.querySelector('.form-group.' + name);
    this.#$input = form.querySelector('input');
    if (this.#$input.getAttribute('type') === 'radio') {
      this.#isRadioButton = true;
    }
    this.#$feedback = form.querySelector('.invalid-feedback');
  }

  disable() {
    if (this.#isRadioButton) {
      const buttons = document.querySelectorAll(`input[name="${this.#name}"]`);
      return buttons.forEach(function (input) {
        input.disabled = true;
      });
    }
    this.#$input.disabled = true;
  }

  enable() {
    if (this.#isRadioButton) {
      const buttons = document.querySelectorAll(`input[name="${this.#name}"]`);
      return buttons.forEach(function (input) {
        input.disabled = false;
      });
    }
    this.#$input.disabled = false;
  }

  setValue(value) {
    if (this.#isRadioButton) {
      return setRadioButtonValue(this.#name, value);
    }
    this.#$input.value = value;
  }

  getValue() {
    if (this.#isRadioButton) {
      return getRadioButtonValue(this.#name);
    }
    return this.#$input.value;
  }

  setError(error) {
    if (this.#isRadioButton) {
      const buttons = document.querySelectorAll(`input[name="${this.#name}"]`);
      return buttons.forEach(function (input) {
        input.classList.add('is-invalid');
      });
    }
    this.#$feedback && (this.#$feedback.innerText = error);
    this.#$input.classList.add('is-invalid');
  }

  removeError() {
    if (this.#isRadioButton) {
      const buttons = document.querySelectorAll(`input[name="${this.#name}"]`);
      return buttons.forEach(function (input) {
        input.classList.remove('is-invalid');
      });
    }
    this.#$feedback && (this.#$feedback.innerText = '');
    this.#$input.classList.remove('is-invalid');
  }

  validate() {
    const result = this.#validationFn && this.#validationFn(this.getValue());
    if (result === undefined) return;
    if (result === true) {
      return this.removeError();
    }
    this.setError(result);
  }
}
