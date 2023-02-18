
// Mobile menu functionality
var navBar = document.getElementById("navBar")

function showMenu() {
  navBar.style.top = "0";
}

function hideMenu() {
  navBar.style.top = "-1000px";
}



// Course dropdown menu functionality
var fieldSelect = document.getElementById("fieldSelect");
var selectedCourse = document.getElementById("selectedCourse");
var choices = document.getElementsByClassName("choices");
var courseList = document.getElementById("courseList");


fieldSelect.onclick = function() {
  courseList.classList.toggle("hide-list");
}

for (choice of choices) {
  choice.onclick = function() {
    selectedCourse.innerHTML = this.textContent;
    courseList.classList.toggle("hide-list");
  }
}




const studentRegistrationData = JSON.parse(localStorage.getItem("students")) || []
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const ageInput = document.getElementById("age")
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const verifyPasswordInput = document.getElementById("verify-password");
const studentsContainer = document.querySelector(".student-record-display-container");
const studentInputForm = document.getElementById("student-record-input");


function addStudent( id, fname, lname, age, email, course ) {
  studentRegistrationData.push ({
    id,
    fname,
    lname,
    age,
    email,
    course
  })
  localStorage.setItem("students", JSON.stringify(studentRegistrationData))
  return { id, fname, lname, age, email, course };
}

function createStudentElement({ fname, lname, email, course }) {
  const studentDiv = document.createElement('div');
  const studentName = document.createElement('h3');
  const studentEmail = document.createElement('p');
  const studentCourse = document.createElement('p');

  studentDiv.classList.add('student-box');

  studentName.innerHTML = `Name: ${fname} ${lname}`;
  studentEmail.innerText = `Email: ${email}`;
  studentCourse.innerText = `Course: ${course}`;

  studentDiv.append(studentName, studentEmail, studentCourse);
  studentsContainer.appendChild(studentDiv);
}

// Sets age input to required depending on which course user selects
document.querySelectorAll('.choices').forEach(choice => {
  choice.addEventListener('click', e => {
    if (e.target.innerHTML === "Teen's Kitchen") {
      ageInput.required = true;
    }else {
      ageInput.required = false;
    }
  })
})

// Function that checks and then submits form
function updateRegistrationData(e) {
  e.preventDefault();
  const fname = firstNameInput.value;
  const lname = lastNameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const verifyPassword = verifyPasswordInput.value;
  const course = selectedCourse.innerHTML;
  const id = studentRegistrationData.length + 1; //[studentRegistrationData.length -1].id + 1
  const courseError = document.querySelector(".course-warning-msg");
  const passError = document.querySelector(".password-error");
  const verifyPassError = document.querySelector(".verify-password-error");
  const ageError = document.querySelector(".age-error");
  ageInput.required = false;
  document.getElementById("register-complete").innerHTML = "";
  if(password.length < 6) {
    passError.innerHTML = "*Passwords must be at least 6 characters in length";
  }else if(verifyPassword != password) {
    verifyPassError.innerHTML = "*Your passwords have to match"
    passError.innerHTML = "";
  }else if(course == "Select a Course") {
    courseError.innerHTML = "*Please select a course from the drop menu";
    verifyPassError.innerHTML = "";
  }else if(course === "Teen's Kitchen" && age > 18) {
    ageError.innerHTML = "*You must be 18 or younger for Teen's Kitchen";
    courseError.innerHTML = "";
  }else {
    const newRecord = addStudent(id, fname, lname, age, email, course);
    createStudentElement(newRecord);
    ageError.innerHTML = "";
    document.getElementById("register-complete").innerHTML = `Congratulations You've successfully registered for ${course}!`;
  }
}

studentRegistrationData.forEach(createStudentElement)
studentInputForm.addEventListener("submit", updateRegistrationData);


function resetFields() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  verifyPasswordInput.value = "";
  selectedCourse.innerHTML = "Select a Course";
}