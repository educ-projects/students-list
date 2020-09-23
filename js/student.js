function getStudent() {
  const student = {};
  for (const key in controls) {
    if (controls.hasOwnProperty(key)) {
      const control = controls[key];
      student[key] = control.getValue();
    }
  }
  return student;
}

function redrawTable() {
  $tableBody.innerHTML = '';
  students.forEach((student) => {
    const template = `
      <tr>
         <th>${student.matricule}</th>
         <td>${student.lastname}</td>
         <td>${student.firstname}</td>
         <td>${student.gender}</td>
         <td>${student.level}</td>
         <td>${student.age} ans</td>
         <td>
            <button type="button" onclick="editStudent('${student.matricule}')" class="btn btn-outline-primary edit">Editer</button>
            <button type="button" onclick="deleteStudent('${student.matricule}')" class="btn btn-outline-danger remove">Supprimer</button>
         </td>
      </tr>
      `;
    $tableBody.innerHTML += template;
  });
  persistData();
}

function saveStudent(student) {
  // On vérifie si l'étudiant n'a pas été déjà enregistré
  const existingStudent = students.find(
    (_student) => _student.matricule === student.matricule
  );
  if (existingStudent) {
    Object.assign(existingStudent, student);
  } else {
    // Sauvegarde de l'étudiant dans la liste des étudiants
    students.push(student);
    // Réinitialisation du formulaire
    $form.reset();
    controls.matricule.enable();
    formState.edition = false;
  }
  // on met à jour la table en HTML
  redrawTable();
}

function editStudent(matricule) {
  const student = students.find((student) => student.matricule === matricule);
  formState.edition = true;
  controls.matricule.disable();
  for (const key in controls) {
    if (controls.hasOwnProperty(key)) {
      const control = controls[key];
      control.setValue(student[key]);
      control.validate();
    }
  }
}

function deleteStudent(matricule) {
  const index = students.findIndex(student => student.matricule === matricule); 
  if (index >= 0) {
    const removed = confirm(`Êtes vous sûr de vouloir supprimer l'étudiant au matricule ${matricule}`);
    if (removed) {
      students.splice(index, 1);
      redrawTable();
      alert('Suppression avec succès!');
    }
  }
}


function persistData() {
  localStorage.setItem('students', JSON.stringify(students));
}