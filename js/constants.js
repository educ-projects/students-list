const students = JSON.parse(localStorage.getItem('students')) || [];

const controls = {
  matricule: new FormControl('matricule', function(value) {
    if (!value) {
      return 'Le numéro matricule est obligatoire'
    }
    if (!formState.edition && students.find(student => student.matricule === value)) {
      return 'Le numéro matricule existe déjà!'
    }
    return true;
  }),
  lastname: new FormControl('lastname', function (value) {
    return value ? true : 'Vous devez entrer votre nom';
  }),
  firstname: new FormControl('firstname', function (value) {
    return value ? true : 'Vous devez entrer votre prénom';
  }),
  level: new FormControl('level', function (value) {
    return value && value > 0 ? true : "Vous devez entrer votre niveau d'étude";
  }),
  gender: new FormControl('gender', function (value) {
    return value ? true : 'Vous devez sélectionner votre genre ou sexe';
  }),
  age: new FormControl('age', function (value) {
    return value && value > 0 ? true : 'Vous devez entrer un age valide';
  }),
};

const $form = document.querySelector('form');

const $tableBody = document.querySelector('tbody');

const formState = {
  edition: false
};