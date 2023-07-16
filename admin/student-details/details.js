//STUDENT-Details
const signout = document.getElementById("sign-out-button");
let students;
fetch("/data.json")
  .then((res) => res.json())
  .then((data) => {
    const branch = document.getElementById("branch").innerText;
    if (branch === "cse") {
      students = data.cse;
    } else if (branch === "cst") {
      students = data.cst;
    } else if (branch === "cen") {
      students = data.cen;
    } else {
      students = [];
    }
    const table = document.querySelector("#table");
    const table_2 = document.createElement("table");
    for (let i = 0; i < students.length; i++) {
      const newID = students[i].id;
      const student = students[i];

      const row = document.createElement("tr");

      const id = document.createElement("td");
      id.textContent = student.id;
      console.log(id);
      id.classList.add("id-col");
      row.appendChild(id);

      const name = document.createElement("td");
      name.textContent = student.name;
      name.classList.add("name-col");
      row.appendChild(name);

      const email = document.createElement("td");
      email.textContent = student.email;
      email.classList.add("email-col");
      row.appendChild(email);

      const buttonsCell = document.createElement("td");
      buttonsCell.classList.add("btn-col");

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-button");
      buttonsCell.appendChild(editButton);
      {
        editButton.addEventListener("click", () => {
          const newName = prompt("Enter student name:");
          const newEmail = prompt("Enter student email:");
          // const newData = {
          //   name: newName,
          //   email: newEmail,
          // };
          fetch(`http://localhost:5500/${branch}/${newID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName, email: newEmail }),
          }).then((res) => {
            alert("Updated");
          });
        });
      }

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      buttonsCell.appendChild(deleteButton);
      {
        deleteButton.addEventListener("click", () => {
          fetch(`http://localhost:5500/${branch}/${newID}`, {
            method: "DELETE",
          }).then((res) => {
            alert("DELETED");
          });
        });
      }

      row.appendChild(buttonsCell);
      table_2.appendChild(row);
      table.appendChild(table_2);
      // console.log(table);
    }
  });

//SIGN-OUT
signout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  window.location.href = "/signin/signin.html";
});
