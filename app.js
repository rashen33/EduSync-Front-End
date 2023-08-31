"use strict";
//------Updating the profile pic--------------
let profilePic = document.getElementById("profile-pic");
let inputFile = document.getElementById("input-img");

inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
};

//------Getting the student entity data from the front end----------
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

submitBtn.addEventListener("click", () => {
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

  console.log(StudentOb);
});
