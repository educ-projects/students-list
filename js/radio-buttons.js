function getRadioButtonValue(name) {
  const $inputs = document.querySelectorAll(`input[name="${name}"]`);
  const iterator = $inputs.values();
  let current = iterator.next();
  while (!current.done && !current.value.checked) {
    current = iterator.next();
  }
  if (current.value && current.value.checked) {
    return current.value.value;
  }
}

function setRadioButtonValue(name, value) {
  const $inputs = document.querySelectorAll(`input[name="${name}"]`);
  const iterator = $inputs.values();
  let current = iterator.next();
  while (!current.done && current.value.value !== value) {
    current = iterator.next();
  }
  if (current.value) {
    current.value.checked = true;
  }
}
