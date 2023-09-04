"use strict";

const viewStudentBtn = document.querySelector('.viewStudent-btn');

viewStudentBtn.addEventListener("click", () => {
    fetch("http://localhost:8080/student")
    .then((response) => response.json())
    .then((json) => {
    //   let studentCard = document.getElementById("main-div");

      let studentDiv = ``;

      json.forEach((element) => {
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
    
            <div class="buttons">
                <div class="update-btn">
                    <button>Update</button>
                </div>
        
                <div class="delete-btn">
                    <button>Delete</button>
                </div>
            </div>
        </div>
  
          `
      });
    let x = "local storage  thing is working";

    //   studentCard.innerHTML = studentDiv;
    localStorage.setItem('student-div',studentDiv);
    localStorage.setItem('x',x);

    window.location.href = "student-card.html";
    })
});