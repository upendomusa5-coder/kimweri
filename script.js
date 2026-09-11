// ======================================
// IYUNGA SECONDARY SCHOOL
// STUDENT MANAGEMENT SYSTEM
// FRONTEND CRUD SIMULATION
// ======================================


// ======================================
// 1. CREATE STUDENTS ARRAY
// ======================================

let students = [];


// ======================================
// 2. GET HTML ELEMENTS
// ======================================

const form =
    document.getElementById("studentForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const phoneInput =
    document.getElementById("phone");

const levelInput =
    document.getElementById("level");

const genderInput =
    document.getElementById("gender");

const studentIdInput =
    document.getElementById("studentId");

const submitButton =
    document.getElementById("submitButton");

const clearButton =
    document.getElementById("clearButton");

const studentsTableBody =
    document.getElementById("studentsTableBody");

const emptyMessage =
    document.getElementById("emptyMessage");

const searchInput =
    document.getElementById("searchInput");


// ======================================
// 3. CREATE
// ADD NEW STUDENT
// ======================================

form.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();


    // Get values from the form

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const phone =
        phoneInput.value.trim();

    const level =
        levelInput.value;

    const gender =
        genderInput.value;


    // Check if we are updating
    // an existing student

    const studentId =
        studentIdInput.value;


    if (studentId === "") {

        // ==================================
        // CREATE NEW STUDENT
        // ==================================

        const student = {

            id: Date.now(),

            name: name,

            email: email,

            phone: phone,

            level: level,

            gender: gender

        };


        // Add student to array

        students.push(student);


        alert(
            "Student added successfully!"
        );

    }

    else {

        // ==================================
        // UPDATE EXISTING STUDENT
        // ==================================

        updateStudent(
            Number(studentId)
        );

    }


    // Clear form

    clearForm();


    // Display students

    displayStudents();

});


// ======================================
// 4. READ
// DISPLAY STUDENTS
// ======================================

function displayStudents(
    searchTerm = ""
) {

    // Clear old table rows

    studentsTableBody.innerHTML = "";


    // Convert search text to lowercase

    const search =
        searchTerm.toLowerCase();


    // Filter students

    const filteredStudents =
        students.filter(function(student) {

            return (

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.email
                    .toLowerCase()
                    .includes(search)

                ||

                student.phone
                    .toLowerCase()
                    .includes(search)

                ||

                student.level
                    .toLowerCase()
                    .includes(search)

            );

        });


    // Check if there are no students

    if (filteredStudents.length === 0) {

        emptyMessage.style.display =
            "block";

        return;

    }


    emptyMessage.style.display =
        "none";


    // Create table rows

    filteredStudents.forEach(
        function(student, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${student.name}
                </td>

                <td>
                    ${student.email}
                </td>

                <td>
                    ${student.phone}
                </td>

                <td>
                    ${student.level}
                </td>

                <td>
                    ${student.gender}
                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="
                            editStudent(${student.id})
                        "
                    >
                        Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="
                            deleteStudent(${student.id})
                        "
                    >
                        Delete
                    </button>

                </td>

            `;


            // Add row to table

            studentsTableBody.appendChild(row);

        }
    );

}


// ======================================
// 5. UPDATE
// EDIT STUDENT
// ======================================

function editStudent(id) {

    // Find student

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    // Check if student exists

    if (!student) {

        return;

    }


    // Put student information
    // back into the form

    studentIdInput.value =
        student.id;

    nameInput.value =
        student.name;

    emailInput.value =
        student.email;

    phoneInput.value =
        student.phone;

    levelInput.value =
        student.level;

    genderInput.value =
        student.gender;


    // Change button text

    submitButton.textContent =
        "Update Student";


    // Scroll to form

    document
        .getElementById("student-form")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ======================================
// 6. UPDATE STUDENT DATA
// ======================================

function updateStudent(id) {

    // Find the student index

    const studentIndex =
        students.findIndex(
            function(student) {

                return student.id === id;

            }
        );


    // Check if student exists

    if (studentIndex === -1) {

        return;

    }


    // Replace old information

    students[studentIndex] = {

        id: id,

        name:
            nameInput.value.trim(),

        email:
            emailInput.value.trim(),

        phone:
            phoneInput.value.trim(),

        level:
            levelInput.value,

        gender:
            genderInput.value

    };


    alert(
        "Student updated successfully!"
    );

}


// ======================================
// 7. DELETE
// DELETE STUDENT
// ======================================

function deleteStudent(id) {

    // Find student

    const student =
        students.find(function(student) {

            return student.id === id;

        });


    if (!student) {

        return;

    }


    // Ask for confirmation

    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "?"
        );


    if (confirmDelete) {

        // Remove student

        students =
            students.filter(
                function(student) {

                    return student.id !== id;

                }
            );


        // Refresh table

        displayStudents();


        alert(
            "Student deleted successfully!"
        );

    }

}


// ======================================
// 8. CLEAR FORM
// ======================================

function clearForm() {

    // Reset form

    form.reset();


    // Clear hidden ID

    studentIdInput.value = "";


    // Restore button text

    submitButton.textContent =
        "Add Student";

}


// ======================================
// 9. CLEAR BUTTON
// ======================================

clearButton.addEventListener(
    "click",
    function() {

        clearForm();

    }
);


// ======================================
// 10. SEARCH STUDENTS
// ======================================

searchInput.addEventListener(
    "input",
    function() {

        displayStudents(
            searchInput.value
        );

    }
);


// ======================================
// 11. INITIAL DISPLAY
// ======================================

displayStudents();