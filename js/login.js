"use strict";

const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFields = document.querySelectorAll(".password");

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