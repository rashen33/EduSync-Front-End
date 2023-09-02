"use strict";
//------Updating the profile pic--------------
let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-img");

inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
};

//-------Validations for the registration form------------------

let formE = document.querySelector('.form');
let nameE = document.getElementById("name");
let dobE = document.getElementById("dob");
let emailE = document.getElementById("email");
let tpNumberE = document.getElementById("tpNumber");
let nicE = document.getElementById("nic");

formE.addEventListener('submit', e => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputField = element.parentElement;
  const errorDisplay = inputField.querySelector('.error');
  
  errorDisplay.innerText = message;
  inputField.classList.add('error');
  inputField.classList.remove('success');
}

const setSuccess = element => {
  const inputField = element.parentElement;
  const errorDisplay = inputField.querySelector('.error');
  
  errorDisplay.innerText = '';
  inputField.classList.add('success');
  inputField.classList.remove('error');
}

const validateInputs = () => {
  let nameValue = nameE.value.trim();
  let dobValue = dobE.value.trim();
  let emailValue = emailE.value.trim();
  let tpNumberValue = tpNumberE.value.trim();
  let nicValue = nicE.value.trim();

  //Validation for the name
  if(nameValue === ''){
    setError(nameE, 'Fullname is required');
  }else{
    setSuccess(nameE);
  }

  //Validation for the birthday

  let mm = dobValue.substring(5,7);
  let dd = dobValue.substring(8,10);
  let yy = dobValue.substring(0,4);

  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = date.getDay;

  if(dobValue === ''){
    setError(dobE,'Birthday is required');
  }else if(yy >= year){ //the selected year should be lesser than the current year
    setError(dobE,'Enter valid birthday');
  }else{
    setSuccess(dobE);
  }




}










// //------Getting the student entity data from the front end----------
// function Student(
//   name,
//   dob,
//   sex,
//   email,
//   tpNumber,
//   address,
//   nic,
//   school,
//   department,
//   course
// ) {
//   this.name = name;
//   this.dob = dob;
//   this.sex = sex;
//   this.email = email;
//   this.tpNumber = tpNumber;
//   this.address = address;
//   this.nic = nic;
//   this.school = school;
//   this.department = department;
//   this.course = course;
// }

// let submitBtn = document.querySelector(".submit-btn");
// function displayRadioValue() {
//   let ele = document.getElementsByName("sex");

//   for (let i = 0; i < ele.length; i++) {
//     if (ele[i].checked) return ele[i].value;
//   }
// }

// submitBtn.addEventListener("click", () => {
//   let name = document.getElementById("name").value;
//   let dob = document.getElementById("dob").value;
//   let sex = displayRadioValue();
//   let email = document.getElementById("email").value;
//   let tpNumber = document.getElementById("tpNumber").value;
//   let address = document.getElementById("address").value;
//   let nic = document.getElementById("nic").value;
//   let school = document.querySelector("#school").value;
//   let department = document.querySelector("#department").value;
//   let course = document.querySelector("#specialization").value;

//   let StudentOb = new Student(
//     name,
//     dob,
//     sex,
//     email,
//     tpNumber,
//     address,
//     nic,
//     school,
//     department,
//     course
//   );

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   var raw = JSON.stringify(StudentOb);

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("http://localhost:8080/student", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));

//   console.log(StudentOb);
// });
