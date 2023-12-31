"use strict";
//----------------Function of the eye icon in password section----------------

const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-link");
const logIn = document.querySelector(".login-link");

pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwField) => {
      if (pwField.type === "password") {
        pwField.type = "text";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye-slash", "uil-eye");
        });
      } else {
        pwField.type = "password";

        pwShowHide.forEach((icon) => {
          icon.classList.replace("uil-eye", "uil-eye-slash");
        });
      }
    });
  });
});

//-------------------To appear signup and login---------------------------------
signUp.addEventListener("click", () => {
  container.classList.add("active");
});

logIn.addEventListener("click", () => {
  container.classList.remove("active");
});

//----------------Singning up a new student--------------------------------------
const userNameE = document.getElementById("username");
const studentEmailE = document.getElementById("studentEmail");
const newPasswordE = document.getElementById("newPassword");
const confirmPasswordE = document.getElementById("confirmPassword");

const userName = document.getElementById("username").value;
const studentEmail = document.getElementById("studentEmail").value;
const newPassword = document.getElementById("newPassword").value;
const confirmPassword = document.getElementById("confirmPassword").value;

const signinBtn = document.getElementById("signin-btn");

//---------------Validation Prosses----------------------------
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

//Validating the username
function validateUserName() {
  const userName = document.getElementById("username").value;

  if (userName === "") {
    setError(userNameE, "Username is required");
    return false;
  } else {
    setSuccess(userNameE);
    return true;
  }
}

//Validating the email
function validateStudentEmail() {
  const studentEmail = document.getElementById("studentEmail").value;
  const isValidEmail = (studentEmail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(studentEmail).toLowerCase());
  };

  if (studentEmail === "") {
    setError(studentEmailE, "Email is required");
    return false;
  } else if (!isValidEmail(studentEmail)) {
    setError(studentEmailE, "Provide a valid email address");
    return false;
  } else {
    setSuccess(studentEmailE);
    return true;
  }
}

//Validating the new password
function validateNewPassword() {
  const newPassword = document.getElementById("newPassword").value;
  if (newPassword === "") {
    setError(newPasswordE, "Password is required");
    return false;
  } else {
    setSuccess(newPasswordE);
    return true;
  }
}

//Validating the confirmpassword
function valildateConfirmPassword() {
  const confirmPassword = document.getElementById("confirmPassword").value;
  const newPassword = document.getElementById("newPassword").value;

  if (confirmPassword === "") {
    setError(confirmPasswordE, "Password is required");
    return false;
  } else if (confirmPassword != newPassword) {
    setError(confirmPasswordE, "Password does not match");
    return false;
  } else {
    setSuccess(confirmPasswordE);
    return true;
  }
}

//validating all the inputs
const isValidAllInputs = () => {
  const isValidUserName = validateUserName();
  const isValidStudentEmail = validateStudentEmail();
  const isValidNewPassword = validateNewPassword();
  const isValidConfirmPassword = valildateConfirmPassword();

  return (
    isValidUserName &&
    isValidStudentEmail &&
    isValidNewPassword &&
    isValidConfirmPassword
  );
};

function Student(userName, studentEmail, password) {
  this.userName = userName;
  this.studentEmail = studentEmail;
  this.password = password;
}

let signUpForm = signinBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (isValidAllInputs()) {
    const userNameV = document.getElementById("username").value;
    const studentEmailV = document.getElementById("studentEmail").value;
    const newPasswordV = document.getElementById("newPassword").value;

    let RegStudentOb = new Student(userNameV, studentEmailV, newPasswordV);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(RegStudentOb);

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

    location.reload();

    alert("Signin Success!");
    // document.getElementById("successModal").style.display = "flex";
    // document.getElementById("container").style.display = "none";
  } else {
    alert("Check inputs!");
  }
});

//------------------------Login in ------------------------------------
const loginNameE = document.querySelector(".login-name");
const loginPwE = document.querySelector(".login-pw");

const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {
  const loginName = document.querySelector(".login-name").value;
  const loginPw = document.querySelector(".login-pw").value;

  fetch(`http://localhost:8080/student/${loginName}`)
    .then((response) => response.json())
    .then((json) => {
      let loginSuccessful = false;

      json.forEach((element) => {
        if (loginPw === element.password) {
          loginSuccessful = true;
          localStorage.setItem("studentId", element.id);
        }
      });

      if (loginSuccessful) {
        window.location.href = "reg-form.html";
      } else {
        alert("Login failed. Please check your credentials.");
      }
    });
});
