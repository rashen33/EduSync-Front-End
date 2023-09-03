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
let addressE = document.getElementById("address");
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
  let addressValue = addressE.value.trim();
  let tpNumberValue = tpNumberE.value.trim();
  let nicValue = nicE.value.trim();

  //Validation for the name
  if(nameValue === ''){
    setError(nameE, 'Fullname is required');
  }else{
    setSuccess(nameE);
  }

  //Validation for the birthday

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
  }else if(inValidDob(dobValue)){
    setError(dobE,'Enter valid birthday');
  }else{
    setSuccess(dobE);
  }

  //Validating the email
  const isValidEmail = emailValue => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailValue).toLowerCase());
  } 

  if(emailValue === '') {
    setError(emailE, 'Email is required');
  } else if (!isValidEmail(emailValue)) {
      setError(emailE, 'Provide a valid email address');
  } else {
      setSuccess(emailE);
  }

  //Validating the address

  if(addressValue === '') {
    setError(addressE, 'Address is required');
  } else {
      setSuccess(addressE);
  }

  //Validating the tpNumber

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
  } else if (!isValidTpNumber(tpNumberValue)){
    setError(tpNumberE, 'Invalid telephone number');
  } else {
      setSuccess(tpNumberE);
  }

  //Validating the nic
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
  }else if(!isValidNic(nicValue)){
    setError(nicE, 'Invalid NIC number');
  }else{
    setSuccess(nicE);
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
