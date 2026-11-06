// ==========================================
// STUDENT MANAGEMENT SYSTEM
// ==========================================


// GET STUDENTS FROM LOCAL STORAGE

let students =
    JSON.parse(localStorage.getItem("students")) || [

        {
            id: 1,
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            phone: "9876543210",
            course: "Computer Science",
            year: "3rd Year",
            age: 21
        },

        {
            id: 2,
            name: "Priya Patil",
            email: "priya@gmail.com",
            phone: "9876543211",
            course: "Data Science",
            year: "2nd Year",
            age: 20
        },

        {
            id: 3,
            name: "Amit Verma",
            email: "amit@gmail.com",
            phone: "9876543212",
            course: "Information Technology",
            year: "4th Year",
            age: 22
        }

    ];


// SAVE DATA

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ==========================================
// SECTION NAVIGATION
// ==========================================

function showSection(sectionId) {

    // Get all sections

    let sections =
        document.querySelectorAll(".section");


    // Hide all sections

    sections.forEach(section => {

        section.classList.add("hidden");

    });


    // Show selected section

    document
        .getElementById(sectionId)
        .classList.remove("hidden");


    // Update navigation

    let links =
        document.querySelectorAll(".sidebar a");

    links.forEach(link => {

        link.classList.remove("active");

    });


    // Refresh data

    updateDashboard();

    displayStudents();

}


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents() {

    let table =
        document.getElementById("studentTable");


    table.innerHTML = "";


    // Search

    let search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    // Course filter

    let course =
        document
            .getElementById("courseFilter")
            .value;


    // Filter students

    let filteredStudents =
        students.filter(student => {

            let matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(search) ||

                student.email
                    .toLowerCase()
                    .includes(search);


            let matchesCourse =
                course === "" ||
                student.course === course;


            return matchesSearch &&
                   matchesCourse;

        });


    // Display students

    filteredStudents.forEach(student => {

        let row =
            document.createElement("tr");


        row.innerHTML = `

            <td>#${student.id}</td>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>${student.year}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });

}


// ==========================================
// ADD STUDENT
// ==========================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        let id =
            document.getElementById("studentId").value;


        let name =
            document.getElementById("name").value;

        let email =
            document.getElementById("email").value;

        let phone =
            document.getElementById("phone").value;

        let course =
            document.getElementById("course").value;

        let year =
            document.getElementById("year").value;

        let age =
            document.getElementById("age").value;


        // EDIT STUDENT

        if (id !== "") {

            let student =
                students.find(
                    student => student.id == id
                );


            student.name = name;
            student.email = email;
            student.phone = phone;
            student.course = course;
            student.year = year;
            student.age = Number(age);


            alert("Student updated successfully!");

        }


        // ADD NEW STUDENT

        else {

            let newStudent = {

                id:
                    students.length > 0
                    ? Math.max(
                        ...students.map(
                            student => student.id
                        )
                    ) + 1
                    : 1,

                name: name,

                email: email,

                phone: phone,

                course: course,

                year: year,

                age: Number(age)

            };


            students.push(newStudent);


            alert("Student added successfully!");

        }


        // Save data

        saveData();


        // Reset form

        this.reset();

        document
            .getElementById("studentId")
            .value = "";


        document
            .getElementById("formTitle")
            .innerText = "Add New Student";


        // Go to students

        showSection("students");

    });


// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(id) {

    let confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation) {

        return;

    }


    students =
        students.filter(
            student => student.id !== id
        );


    saveData();


    displayStudents();


    updateDashboard();


    alert("Student deleted successfully!");

}


// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(id) {

    let student =
        students.find(
            student => student.id === id
        );


    if (!student) {

        return;

    }


    document
        .getElementById("studentId")
        .value = student.id;


    document
        .getElementById("name")
        .value = student.name;


    document
        .getElementById("email")
        .value = student.email;


    document
        .getElementById("phone")
        .value = student.phone;


    document
        .getElementById("course")
        .value = student.course;


    document
        .getElementById("year")
        .value = student.year;


    document
        .getElementById("age")
        .value = student.age;


    document
        .getElementById("formTitle")
        .innerText = "Edit Student";


    showSection("addStudent");

}



// DASHBOARD


function updateDashboard() {


    // Total students

    document
        .getElementById("totalStudents")
        .innerText = students.length;


    // Courses

    let courses =
        new Set(
            students.map(
                student => student.course
            )
        );


    document
        .getElementById("totalCourses")
        .innerText = courses.size;


    // Average age

    let averageAge = 0;


    if (students.length > 0) {

        let totalAge =
            students.reduce(
                (sum, student) =>
                    sum + Number(student.age),
                0
            );


        averageAge =
            (totalAge / students.length)
                .toFixed(1);

    }


    document
        .getElementById("averageAge")
        .innerText = averageAge;


    // Active students

    document
        .getElementById("activeStudents")
        .innerText = students.length;


    // Recent students

    let recentTable =
        document
            .getElementById("recentStudentsTable");


    recentTable.innerHTML = "";


    students
        .slice(-5)
        .reverse()
        .forEach(student => {

            let row =
                document.createElement("tr");


            row.innerHTML = `

                <td>#${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.course}</td>

                <td>${student.year}</td>

            `;


            recentTable.appendChild(row);

        });

}




updateDashboard();

displayStudents();