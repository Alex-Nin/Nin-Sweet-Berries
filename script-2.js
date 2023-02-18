
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




const studentRegistrationData = [
  {
    id: 1,
    fname: "Alexander",
    lname: "Nin",
    age: "28",
    email: "alex@you.com",
    password: "12345678",
    course: "Chef skills",
    
  },
]

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const ageInput = document.getElementById("age")
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const verifyPasswordInput = document.getElementById("verify-password");
const studentInputForm = document.getElementById("student-record-input");



function updateRegistrationData(e) {
  e.preventDefault();
  const fname = firstNameInput.value;
  const lname = lastNameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const verifyPassword = verifyPasswordInput.value;
  const course = selectedCourse.innerHTML;
  const id = studentRegistrationData[studentRegistrationData.length -1].id + 1
  const courseError = document.querySelector(".course-warning-msg");
  const passError = document.querySelector(".password-error");
  const verifyPassError = document.querySelector(".verify-password-error");
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
  }else {
    const newRecord = { id, fname, lname, age, email, course };
    studentRegistrationData.push(newRecord);
    courseError.innerHTML = "";
    document.getElementById("register-complete").innerHTML = `Congratulations You've successfully registered for ${course}!`;
  }
  
}

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