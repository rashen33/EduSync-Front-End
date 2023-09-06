"use strict";

const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");
const signUp = document.querySelector(".signup-link");
const logIn = document.querySelector(".login-link");

//Function of the eye icon in password section
pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if(pwField.type === "password"){
                pwField.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash","uil-eye");
                })
            }else{
                pwField.type = "password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye","uil-eye-slash");
                })
            }
        })
    })
});

//To appear signup and login
signUp.addEventListener("click", () =>{
    container.classList.add("active");
});

logIn.addEventListener("click", () =>{
    container.classList.remove("active");
});