"use strict";
const updateBtn = document.querySelector(".update-btn");

document.addEventListener("DOMContentLoaded", () => {
  let searchedStudentName = localStorage.getItem("searchedStudentName");
  fetch(`http://localhost:8080/student/search/${searchedStudentName}`)
    .then((response) => response.json())
    .then((json) => {
      let form = document.querySelector(".form");

      let student = ``;

      json.forEach((element) => {
        student = `
            <div class="form first">

            <div class="student-img">
                <span class="title">Student Image</span>
                <form action="add" method="post" enctype="multipart/form-data">
                    <img src="/assets/blank-profile-picture-973460_1280.webp" alt="pro-pic" id="profile-pic">
                    <div class="upload">
                        <label for="input-img">Upload Image</label>
                        <input type="file" accept="image/jpeg,image/png,image/jpg" name="file" id="input-img">
                    </div>
                </form>
    
            
            <div class="details personal">
                <span class="title">Personal Details</span>
                <div class="fields">
                     <div class="input-fields">
                        <label>Full Name</label>
                        <input type="text"  placeholder="Enter your name"  id="name" value="${element.name}">
                        <div class="error"></div> 
                    </div> 
                                          
                    
                    <div class="input-fields">
                        <label>Date of Birth</label>
                        <input type="date" placeholder="Enter your date of birth" id="dob" value="${element.dob}">
                        <div class="error"></div>                       
                    </div> 
                    
                    <div class="input-fields">
                        <label>Sex</label>
                        <div class="sex-radio">
                            <input type="radio" name="sex" class="radio" name="gender"
                            value="${element.sex}"
                            checked
                            disabled"/> &nbspMale &nbsp
                      
                            <input type="radio" name="sex" class="radio" value="${element.sex}"/>  &nbspFemale
                        </div>
                        <div class="error"></div> 
                    </div>
                    <div class="input-fields">
                        <label>Email</label>
                        <input type="text" placeholder="Enter your email" id="email" value="${element.email}">
                        <div class="error"></div> 
                    </div> 

                    <div class="input-fields">
                        <label>Telephone Number</label>
                        <input type="tel" placeholder="Enter your number" id="tpNumber" value="${element.tpNumber}">
                        <div class="error"></div> 
                    </div>                        

                    <div class="input-fields">
                        <label>Address</label>
                        <input type="text" placeholder="Enter your address" id="address" value="${element.address}">
                        <div class="error"></div> 
                    </div>

                    <div class="input-fields">
                        <label>NIC</label>
                        <input type="text" placeholder="Enter your NIC number" id="nic" value="${element.nic}">
                        <div class="error"></div> 
                    </div>

                </div>
                <span class="title">Course Details</span>
                <div class="fields">
                     <div class="input-fields">
                        <label>School</label>
                        <select name="school" id="school" required>
                            <option value="${element.school}">
                              ${element.school}
                            </option>
                        </select>
                        <div class="error"></div>
                    </div>                        
                    
                    <div class="input-fields">
                        <label>Department</label>
                        <select name="department" id="department" required>
                            <option selected>${element.department}</option>
                            <option value="Civil" class="department">Department of Civil Engineering</option>
                            <option value="Mechanical" class="department">Department of Mechanical Engineering</option>
                            <option value="Electrical" class="department">Department of Electrical Engineering</option>
                        </select>
                        <div class="error"></div>
                    </div>                        
                    
                    <div class="input-fields">
                        <label>Specialization</label>
                        <select name="specialization" id="specialization" required>
                            <option selected>${element.course}</option>
                            <option value="BSc.(Hons)" class="specialization">BSc.(Hons) in Engineering</option>
                            <option value="BEng" class="specialization">BEng Curtin University</option>
                        </select>
                        <div class="error"></div>
                    </div>                        
                    
                </div>
            </div>
                <div class="buttons">
                    <button class="nextBtn">
                        <span class="btnText">Clear</span>
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <button class="submit-btn">
                        <span class="btnText">Submit</span>
                        <i class="fa-solid fa-circle-check"></i>
                    </button>
                </div>
            </div>
        </div>
            `;
      });
      form.innerHTML = student;
      //-------Validations for the registration form------------------
      let formE = document.querySelector(".form");
      let nameE = document.getElementById("name");
      let dobE = document.getElementById("dob");
      let sexE = document.getElementsByName("sex");
      let sexEl = document.querySelector(".sex-radio");
      let emailE = document.getElementById("email");
      let tpNumberE = document.getElementById("tpNumber");
      let addressE = document.getElementById("address");
      let nicE = document.getElementById("nic");
      let schooE = document.querySelector("#school");
      let departmentE = document.querySelector("#department");
      let courseE = document.querySelector("#specialization");

      const setError = (element, message) => {
        const inputField = element.parentElement;
        const errorDisplay = inputField.querySelector(".error");

        errorDisplay.innerText = message;
        inputField.classList.add("error");
        inputField.classList.remove("success");
      };

      const setSuccess = (element) => {
        const inputField = element.parentElement;
        const errorDisplay = inputField.querySelector(".error");

        errorDisplay.innerText = "";
        inputField.classList.add("success");
        inputField.classList.remove("error");
      };

      //Validation for the name
      function validateName() {
        let nameValue = nameE.value.trim();

        if (nameValue === "") {
          setError(nameE, "Fullname is required");
          return false;
        } else {
          setSuccess(nameE);
          return true;
        }
      }

      //Validation for the birthday
      function validateDob() {
        let dobValue = dobE.value.trim();

        const inValidDob = (dobValue) => {
          let mm = dobValue.substring(5, 7);
          let dd = dobValue.substring(8, 10);
          let yy = dobValue.substring(0, 4);

          const date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDay;

          if (yy >= year) {
            return true;
          }
          return false;
        };

        if (dobValue === "") {
          setError(dobE, "Birthday is required");
          return false;
        } else if (inValidDob(dobValue)) {
          setError(dobE, "Enter valid birthday");
          return false;
        } else {
          setSuccess(dobE);
          return true;
        }
      }

      //Validating the email
      function validateEmail() {
        let emailValue = emailE.value.trim();

        const isValidEmail = (emailValue) => {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(emailValue).toLowerCase());
        };

        if (emailValue === "") {
          setError(emailE, "Email is required");
          return false;
        } else if (!isValidEmail(emailValue)) {
          setError(emailE, "Provide a valid email address");
          return false;
        } else {
          setSuccess(emailE);
          return true;
        }
      }

      //Validating the address
      function validateAddress() {
        let addressValue = addressE.value.trim();

        if (addressValue === "") {
          setError(addressE, "Address is required");
          return false;
        } else {
          setSuccess(addressE);
          return true;
        }
      }

      //Validating the tpNumber
      function validateTpNumber() {
        let tpNumberValue = tpNumberE.value.trim();

        let isValidTpNumber = (tpNumberValue) => {
          if (tpNumberValue.charAt(0) != 0) {
            return false;
          }

          let tpS = tpNumberValue.toString();
          let tp = tpS.substring(1, 10);

          if (tp.length != 9) {
            return false;
          }

          let serviceCode = [
            "70",
            "71",
            "72",
            "74",
            "75",
            "76",
            "77",
            "78",
            "11",
            "36",
            "31",
            "33",
            "38",
            "34",
            "81",
            "54",
            "51",
            "52",
            "66",
            "91",
            "41",
            "47",
            "21",
            "23",
            "24",
            "63",
            "65",
            "67",
            "26",
            "25",
            "27",
            "32",
            "37",
            "55",
            "57",
            "45",
            "35",
          ];
          for (let i = 0; i < serviceCode.length; i++) {
            if (tpS.substring(1, 3) == serviceCode[i]) {
              return true;
            }
          }
          return false;
        };

        if (tpNumberValue === "") {
          setError(tpNumberE, "Telephone number is required");
          return false;
        } else if (!isValidTpNumber(tpNumberValue)) {
          setError(tpNumberE, "Invalid telephone number");
          return false;
        } else {
          setSuccess(tpNumberE);
          return true;
        }
      }

      //Validating the nic
      function validateNic() {
        let nicValue = nicE.value.trim();

        let isValidNic = (nicValue) => {
          let nicS = nicValue.toString();
          if (nicS.length == 12) {
            return true;
          }
          if (nicS.length != 10 && nicS.substring(8, 10).toUpperCase != "V") {
            return false;
          }
          return true;
        };

        if (nicValue == "") {
          setError(nicE, "NIC is required");
          return false;
        } else if (!isValidNic(nicValue)) {
          setError(nicE, "Invalid NIC number");
          return false;
        } else {
          setSuccess(nicE);
          return true;
        }
      }

      //Validating the radio button of sex
      function validateSex() {
        let isChecked = (sexE) => {
          for (let i = 0; i < sexE.length; i++) {
            if (sexE[i].checked) {
              return true;
            }
          }
          return false;
        };

        if (!isChecked(sexE)) {
          setError(sexEl, "Select an option");
          return false;
        } else {
          setSuccess(sexEl);
          return true;
        }
      }

      //Validating the school
      function validateSchool(schooE) {
        let schoolValue = schooE.value.trim();

        if (schoolValue === "Select your school") {
          setError(schooE, "Select an option");
          return false;
        } else {
          setSuccess(schooE);
          return true;
        }
      }

      //Validating the department
      function validateDepartment(departmentE) {
        let departmentValue = departmentE.value.trim();

        if (departmentValue === "Select your department") {
          setError(departmentE, "Select an option");
          return false;
        } else {
          setSuccess(departmentE);
          return true;
        }
      }

      //Validating the Course
      function validateCourse(courseE) {
        let courseValue = courseE.value.trim();

        if (courseValue === "Select your specialization") {
          setError(courseE, "Select an option");
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

      let submitForm = submitBtn.addEventListener("click", (event) => {
        event.preventDefault();

        if (isValidAllInputs()) {
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
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          let studentId = localStorage.getItem("studentId");
          console.log(studentId);
          
          let searchedStudentId = localStorage.getItem("searchedNameID");
          fetch(`http://localhost:8080/student/${searchedStudentId}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

          location.reload();

          alert("Successfully Registered!");
          window.location.href = "home.html";
        } else {
          alert("Check the inputs!");
        }
      });
    });
});
