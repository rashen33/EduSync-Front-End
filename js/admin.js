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

//----------Login in functionallity-------------------------
const loginBtn = document.querySelector(".login-btn");

loginBtn.addEventListener("click", () => {
  const userName = document.querySelector(".login-name").value;
  const password = document.querySelector(".login-pw").value;
  if (userName === "admin" && password === "admin") {
    alert("Success");
    window.location.href = "admin-card.html";
  } else {
    alert("Enter valid credentials!");
  }
});
