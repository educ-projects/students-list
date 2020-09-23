redrawTable();

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  for (const key in controls) {
    if (controls.hasOwnProperty(key)) {
      const control = controls[key];
      control.validate();
    }
  }
  const hasInvalidControl = document.querySelector('.is-invalid');
  if (!hasInvalidControl) {
    const student = getStudent();
    saveStudent(student);
  }
});

$form.addEventListener('reset', function (event) {
  for (const key in controls) {
    if (controls.hasOwnProperty(key)) {
      const control = controls[key];
      control.enable()
    }
  }
});
