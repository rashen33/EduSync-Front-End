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
let sexE = document.getElementsByName("sex");
let sexEl = document.querySelector('.sex-radio')
let emailE = document.getElementById("email");
let tpNumberE = document.getElementById("tpNumber");
let addressE = document.getElementById("address");
let nicE = document.getElementById("nic");
let schooE = document.querySelector("#school");
let departmentE = document.querySelector("#department");
let courseE = document.querySelector("#specialization");

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

//Validation for the name
function validateName(){
  let nameValue = nameE.value.trim();
    
    if(nameValue === ''){
      setError(nameE, 'Fullname is required');
      return false;
    }else{
      setSuccess(nameE);
      return true;
    }
  }

//Validation for the birthday
function validateDob(){
  let dobValue = dobE.value.trim();

  const inValidDob = (dobValue) => {
    let mm = dobValue.substring(5,7);
    let dd = dobValue.substring(8,10);
    let yy = dobValue.substring(0,4);

    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDay;

    if(yy >= year){
      return true;
    }
    return false;
  }

  if(dobValue === ''){
    setError(dobE,'Birthday is required');
    return false;
  }else if(inValidDob(dobValue)){
    setError(dobE,'Enter valid birthday');
    return false;
  }else{
    setSuccess(dobE);
    return true;
  }
}

  //Validating the email
function validateEmail(){
  let emailValue = emailE.value.trim();

  const isValidEmail = emailValue => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailValue).toLowerCase());
  } 

  if(emailValue === '') {
    setError(emailE, 'Email is required');
    return false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailE, 'Provide a valid email address');
    return false;
  } else {
    setSuccess(emailE);
    return true;
}
}

//Validating the address
function validateAddress(){
  let addressValue = addressE.value.trim();

  if(addressValue === '') {
    setError(addressE, 'Address is required');
    return false;
  } else {
    setSuccess(addressE);
    return true;
  }
}

//Validating the tpNumber
function validateTpNumber(){
  let tpNumberValue = tpNumberE.value.trim();

  let isValidTpNumber = tpNumberValue => {
    if(tpNumberValue.charAt(0) != 0){
      return false;
    }

    let tpS = tpNumberValue.toString();
    let tp = tpS.substring(1,10);

    if(tp.length != 9){
      return false;
    }

    let serviceCode = ["70","71","72","74","75","76","77","78","11","36","31","33","38","34","81","54","51","52","66","91","41","47","21","23","24","63","65","67","26","25","27","32","37","55","57","45","35"];
    for(let i=0; i<serviceCode.length; i++){
      if(tpS.substring(1,3) == (serviceCode[i])){
        return true;
      }
    }
    return false;
  }

  if(tpNumberValue === '') {
    setError(tpNumberE, 'Telephone number is required');
    return false;
  } else if (!isValidTpNumber(tpNumberValue)){
    setError(tpNumberE, 'Invalid telephone number');
    return false;
  } else {
    setSuccess(tpNumberE);
    return true;
}

}

//Validating the nic
function validateNic(){ 
  let nicValue = nicE.value.trim();

  let isValidNic = nicValue => {
    let nicS = nicValue.toString();
    if(nicS.length == 12){
      return true;
    }
    if(nicS.length != 10 && nicS.substring(8,10).toUpperCase != 'V'){
      return false;
    }
    return true;
  }


  if(nicValue == ''){
    setError(nicE, 'NIC is required');
    return false;
  }else if(!isValidNic(nicValue)){
    setError(nicE, 'Invalid NIC number');
    return false;
  }else{
    setSuccess(nicE);
    return true;
  }

}

//Validating the radio button of sex
function validateSex(){  
  let isChecked = sexE =>{
    for (let i = 0; i < sexE.length; i++) {
      if (sexE[i].checked){
        return true;
      }
    }
    return false;
  }

  if(!isChecked(sexE)){
    setError(sexEl, 'Select an option');
    return false;
  }else{
    setSuccess(sexEl);
    return true;
  }
}

//Validating the school
function validateSchool(schooE){
  let schoolValue = schooE.value.trim();

  if(schoolValue === 'Select your school'){
    setError(schooE,'Select an option');
    return false;
  }else{
    setSuccess(schooE);
    return true;
  }
}

//Validating the department
function validateDepartment(departmentE){
  let departmentValue = departmentE.value.trim();

  if(departmentValue === 'Select your department') {
    setError(departmentE, 'Select an option');
    return false;
  } else {
    setSuccess(departmentE);
    return true;
  }
}

//Validating the Course
function validateCourse(courseE){
  let courseValue = courseE.value.trim();

  if(courseValue === 'Select your specialization') {
    setError(courseE, 'Select an option');
    return false;
  } else {
    setSuccess(courseE);
    return true;
  }
}


//------Getting the student entity data from the front end----------

//validating all the inputs
const isValidAllInputs = () => {
  const isValidName = validateName();
  const isValidDob = validateDob();
  const isValidEmail = validateEmail();
  const isValidAddress = validateAddress();
  const isValidTpNumber = validateTpNumber();
  const isValidNic = validateNic();
  const isValidSex = validateSex();
  const isValidSchool = validateSchool(schooE);
  const isValidDepartment = validateDepartment(departmentE);
  const isValidCourse = validateCourse(courseE);

  return (
    isValidName &&
    isValidDob &&
    isValidEmail &&
    isValidAddress &&
    isValidTpNumber &&
    isValidNic &&
    isValidSex &&
    isValidSchool &&
    isValidDepartment &&
    isValidCourse
  );
};


function Student(
  name,
  dob,
  sex,
  email,
  tpNumber,
  address,
  nic,
  school,
  department,
  course
) {
  this.name = name;
  this.dob = dob;
  this.sex = sex;
  this.email = email;
  this.tpNumber = tpNumber;
  this.address = address;
  this.nic = nic;
  this.school = school;
  this.department = department;
  this.course = course;
}

let submitBtn = document.querySelector(".submit-btn");
function displayRadioValue() {
  let ele = document.getElementsByName("sex");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}

let submitForm = submitBtn.addEventListener('click', (event) => {

  event.preventDefault();
  
  if(isValidAllInputs()){
    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let sex = displayRadioValue();
    let email = document.getElementById("email").value;
    let tpNumber = document.getElementById("tpNumber").value;
    let address = document.getElementById("address").value;
    let nic = document.getElementById("nic").value;
    let school = document.querySelector("#school").value;
    let department = document.querySelector("#department").value;
    let course = document.querySelector("#specialization").value;
  
    let StudentOb = new Student(
      name,
      dob,
      sex,
      email,
      tpNumber,
      address,
      nic,
      school,
      department,
      course
    );
  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify(StudentOb);
  
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch("http://localhost:8080/student", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    location.reload()
  
  }else{
    alert("Check your inputs!");
  }
  
});
