"use strict";
//----------------fetching data from the backend to front end--------------------
let studentCard = document.getElementById("main-div");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/student/all")
    .then((response) => response.json())
    .then((json) => {
      let studentCard = document.getElementById("main-div");

      let studentDiv = ``;

      json.forEach((student) => {
        studentDiv += `
        <div class="container">
            <div class="pro-image">
                <img
                src="/assets/blank-profile-picture-973460_1280.webp"
                alt="pro-pic"
                />
            </div>
   
   
            <div class="personal-info">
                <span>${student.name}</span>
                <div class="info">
                    <table>
                        <tr>
                        <td>Date of Birth</td>
                        <td>${student.dob}</td>
                        </tr>
                        <tr>
                        <td>Sex</td>
                        <td>${student.sex}</td>
                        </tr>
                        <tr>
                        <td>Email</td>
                        <td>${student.email}</td>
                        </tr>
                        <tr>
                        <td>Telephone Number</td>
                        <td>${student.tpNumber}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>${student.address}</td>
                        </tr>
                        <tr>
                        <td>Nic</td>
                        <td>${student.nic}</td>
                        </tr>
                    </table>
                </div>
            </div>
   
   
            <div class="course-details">
                <span>Course Details</span>
                <div class="info">
                    <table>
                        <tr>
                        <td>School</td>
                        <td>${student.school}</td>
                        </tr>
                        <tr>
                        <td>Department</td>
                        <td>${student.department}</td>
                        </tr>
                        <tr>
                        <td>Specialization</td>
                        <td>${student.course}</td>
                        </tr>
                    </table>
                </div>
            </div>
   
        </div>
 
          `;
      });

      studentCard.innerHTML = studentDiv;
    });
});

//--------------------Search a student-------------------------
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  const studentName = document.querySelector(".search-text").value;

  fetch(`http://localhost:8080/student/search/${studentName}`)
    .then((response) => response.json())
    .then((json) => {
      let studentCard = document.getElementById("main-div");

      let studentDiv = ``;

      json.forEach((element) => {
        localStorage.setItem("searchedNameID", element.id);
        localStorage.setItem("searchedStudentName",element.name);
        studentDiv += `
          <div class="container">
              <div class="pro-image">
                  <img
                  src="/assets/blank-profile-picture-973460_1280.webp"
                  alt="pro-pic"
                  />
              </div>
  
              <div class="personal-info">
                  <span>${element.name}</span>
                  <div class="info">
                      <table>
                          <tr>
                          <td>Date of Birth</td>
                          <td>${element.dob}</td>
                          </tr>
                          <tr>
                          <td>Sex</td>
                          <td>${element.sex}</td>
                          </tr>
                          <tr>
                          <td>Email</td>
                          <td>${element.email}</td>
                          </tr>
                          <tr>
                          <td>Telephone Number</td>
                          <td>${element.tpNumber}</td>
                          </tr>
                          <tr>
                              <td>Address</td>
                              <td>${element.address}</td>
                          </tr>
                          <tr>
                          <td>Nic</td>
                          <td>${element.nic}</td>
                          </tr>
                      </table>
                  </div>
              </div>
  
  
              <div class="course-details">
                  <span>Course Details</span>
                  <div class="info">
                      <table>
                          <tr>
                          <td>School</td>
                          <td>${element.school}</td>
                          </tr>
                          <tr>
                          <td>Department</td>
                          <td>${element.department}</td>
                          </tr>
                          <tr>
                          <td>Specialization</td>
                          <td>${element.course}</td>
                          </tr>
                      </table>
                  </div>
              </div>
          </div>

          
  
              `;
      });

      studentCard.innerHTML = studentDiv;
    });
});

//-----------------Deleting a student--------------------------
const deleteBtn = document.querySelector(".delete-btn");

deleteBtn.addEventListener("click", () => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  let searchedStudentId = localStorage.getItem("searchedNameID");

  fetch(
    `http://localhost:8080/student/delete/${searchedStudentId}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  alert("Student Deleted");
  window.location.href = "admin-card.html";
});


