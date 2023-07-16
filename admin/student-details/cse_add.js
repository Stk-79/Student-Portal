document.addEventListener("DOMContentLoaded", function () {
  var addStudentButton = document.getElementById("add-student-button");
  addStudentButton.addEventListener("click", function () {
    var name = prompt("Enter student name:");
    var email = prompt("Enter student email:");

    var newStudent = {
      name: name,
      email: email,
    };
    fetch("http://localhost:5500/cse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    }).then(function (response) {
      if (response.ok) {
        console.log(response);
        alert("Student added successfully!");
      } else {
        console.log(response);
        alert("Failed to add student.");
      }
    });
  });
});
