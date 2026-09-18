const $ = selector =>
    document.querySelector(selector);
const $$ = selector =>
    document.querySelectorAll(selector);
const landingPage =
    $("#landingPage");
const authPage =
    $("#authPage");
const dashboardPage =
    $("#dashboardPage");
const adminAuthPage =
    $("#adminAuthPage");
const adminDashboardPage =
    $("#adminDashboardPage");
const toast =
    $("#toast");
/* =========================================================
   TOAST
========================================================= */
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}
/* =========================================================
   PAGE SWITCH
========================================================= */
function showPage(page) {
    landingPage.classList.toggle(
        "hidden",
        page !== "landing"
    );
    authPage.classList.toggle(
        "hidden",
        page !== "auth"
    );
    dashboardPage.classList.toggle(
        "hidden",
        page !== "dashboard"
    );
    adminAuthPage.classList.toggle(
        "hidden",
        page !== "adminAuth"
    );
    adminDashboardPage.classList.toggle(
        "hidden",
        page !== "adminDashboard"
    );
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =========================================================
   AUTH SWITCH
========================================================= */
function showLogin() {
    showPage("auth");
    $("#loginCard")
        .classList.remove("hidden");
    $("#registerCard")
        .classList.add("hidden");
}
function showRegister() {
    showPage("auth");
    $("#loginCard")
        .classList.add("hidden");
    $("#registerCard")
        .classList.remove("hidden");
}
/* =========================================================
   LANDING BUTTONS
========================================================= */
$("#openLogin")
    .addEventListener(
        "click",
        showLogin
    );
$("#openAdminLogin")
    .addEventListener(
        "click",
        showAdminLogin
    );
$("#backHomeAdmin")
    .addEventListener(
        "click",
        () => showPage("landing")
    );
$("#studentPortalBtn")
    .addEventListener(
        "click",
        showLogin
    );
$("#backHome")
    .addEventListener(
        "click",
        () => showPage("landing")
    );
$("#showRegister")
    .addEventListener(
        "click",
        showRegister
    );
$("#showLogin")
    .addEventListener(
        "click",
        showLogin
    );
/* =========================================================
   EXPLORE PROGRAMS
========================================================= */
$("#exploreBtn")
    .addEventListener(
        "click",
        () => {
            document
                .querySelector("#program")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );
/* =========================================================
   LANDING NAVIGATION
========================================================= */
$$("[data-scroll]")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const section =
                    document.querySelector(
                        "#" +
                        button.dataset.scroll
                    );
                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
                $$(".public-nav .nav-link")
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });
                button.classList.add(
                    "active"
                );
            }
        );
    });
/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */
$$(".eye")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const input =
                    $("#" +
                    button.dataset.target);
                if (
                    input.type === "password"
                ) {
                    input.type = "text";
                    button.textContent = "◉";
                }
                else {
                    input.type = "password";
                    button.textContent = "◉";
                }
            }
        );
    });
/* =========================================================
   LOCAL STORAGE
========================================================= */
function getUsers() {
    return JSON.parse(
        localStorage.getItem(
            "cecUsers"
        ) || "[]"
    );
}
function saveUsers(users) {
    localStorage.setItem(
        "cecUsers",
        JSON.stringify(users)
    );
}
/* =========================================================
   DEFAULT DEMO ACCOUNT
========================================================= */
if (
    !localStorage.getItem("cecUsers")
) {
    saveUsers([
        {
            id: "2026-0001",
            password: "student123",
            name: "John"
        }
    ]);
}
/* =========================================================
   REGISTER
========================================================= */
$("#registerForm")
    .addEventListener(
        "submit",
        event => {
            event.preventDefault();
            const id =
                $("#regId")
                    .value
                    .trim();
            const password =
                $("#regPassword")
                    .value;
            const confirmPassword =
                $("#regConfirm")
                    .value;
            const terms =
                $("#termsCheckbox")
                    .checked;
            if (!terms) {
                showToast(
                    "Please accept the terms and conditions."
                );
                return;
            }
            if (
                id.length < 3
            ) {
                showToast(
                    "Please enter a valid Student ID."
                );
                return;
            }
            if (
                password.length < 6
            ) {
                showToast(
                    "Password must be at least 6 characters."
                );
                return;
            }
            if (
                password !== confirmPassword
            ) {
                showToast(
                    "Passwords do not match."
                );
                return;
            }
            const users =
                getUsers();
            const exists =
                users.some(
                    user =>
                        user.id.toLowerCase()
                        ===
                        id.toLowerCase()
                );
            if (exists) {
                showToast(
                    "Student ID is already registered."
                );
                return;
            }
            const newUser = {
                id: id,
                password: password,
                name: "John"
            };
            users.push(
                newUser
            );
            saveUsers(
                users
            );
            $("#registerForm")
                .reset();
            $("#loginId")
                .value = id;
            showLogin();
            showToast(
                "Account created successfully."
            );
        }
    );
/* ========================================
   TERMS AND CONDITIONS
======================================== */
const openTerms = document.getElementById(
    "openTerms"
);
const closeTerms = document.getElementById(
    "closeTerms"
);
const agreeTerms = document.getElementById(
    "agreeTerms"
);
const termsModal = document.getElementById(
    "termsModal"
);
const termsCheckbox = document.getElementById(
    "termsCheckbox"
);
/* ========================================
   OPEN TERMS
======================================== */
if (openTerms) {
    openTerms.addEventListener(
        "click",
        function () {
            termsModal.classList.add(
                "active"
            );
        }
    );
}
/* ========================================
   CLOSE TERMS
======================================== */
if (closeTerms) {
    closeTerms.addEventListener(
        "click",
        function () {
            termsModal.classList.remove(
                "active"
            );
        }
    );
}
/* ========================================
   AGREE TO TERMS
======================================== */
if (agreeTerms) {
    agreeTerms.addEventListener(
        "click",
        function () {
            termsCheckbox.checked = true;
            termsModal.classList.remove(
                "active"
            );
        }
    );
}
/* ========================================
   CLOSE WHEN CLICKING OUTSIDE
======================================== */
if (termsModal) {
    termsModal.addEventListener(
        "click",
        function (event) {
            if (
                event.target === termsModal
            ) {
                termsModal.classList.remove(
                    "active"
                );
            }
        }
    );
}
/* =========================================================
   LOGIN
========================================================= */
$("#loginForm")
    .addEventListener(
        "submit",
        event => {
            event.preventDefault();
            const id =
                $("#loginId")
                    .value
                    .trim();
            const password =
                $("#loginPassword")
                    .value;
            const users =
                getUsers();
            const user =
                users.find(
                    item =>
                        item.id
                            .toLowerCase()
                        ===
                        id.toLowerCase()
                        &&
                        item.password
                        ===
                        password
                );
            if (!user) {
                showToast(
                    "Invalid Student ID or password."
                );
                return;
            }
            localStorage.setItem(
                "cecCurrentUser",
                JSON.stringify(user)
            );
            updateUserInfo(
                user
            );
            showPage(
                "dashboard"
            );
            showToast(
                "Login successful. Welcome!"
            );
        }
    );
/* =========================================================
   FORGOT PASSWORD
========================================================= */
$("#forgotBtn")
    .addEventListener(
        "click",
        () => {
            showToast(
                "For this demo, use the password you registered with."
            );
        }
    );
/* =========================================================
   UPDATE USER INFORMATION
========================================================= */
function updateUserInfo(user) {
    const name =
        user.name || "John";
    $("#studentName")
        .textContent =
        name;
    $("#sidebarStudentName")
        .textContent =
        name;
}
/* =========================================================
   LOGOUT
========================================================= */
function logout() {
    localStorage.removeItem(
        "cecCurrentUser"
    );
    $("#loginPassword")
        .value = "";
    showLogin();
    showToast(
        "You have been logged out."
    );
}
$("#logoutBtn")
    .addEventListener(
        "click",
        logout
    );
$("#logoutBtn2")
    .addEventListener(
        "click",
        logout
    );
/* =========================================================
   PROFILE BUTTON
========================================================= */
$("#profileBtn")
    .addEventListener(
        "click",
        () => {
            openView(
                "profile"
            );
        }
    );
/* =========================================================
   PAYMENT
========================================================= */
$("#payBtn")
    .addEventListener(
        "click",
        () => {
            showToast(
                "Payment page opened. Demo mode."
            );
        }
    );
/* =========================================================
   DASHBOARD VIEWS
========================================================= */
const views = {
    /* =====================================================
       GRADES
    ===================================================== */
    grades: `
        <div class="content-panel">
            <h2>
                Grades & GPA
            </h2>
            <div class="metric-grid">
                <div class="metric">
                    <b>
                        1.75
                    </b>
                    <span>
                        Current GPA
                    </span>
                </div>
                <div class="metric">
                    <b>
                        18
                    </b>
                    <span>
                        Units Completed
                    </span>
                </div>
                <div class="metric">
                    <b>
                        Good
                    </b>
                    <span>
                        Academic Standing
                    </span>
                </div>
            </div>
            <br>
            <table>
                <tr>
                    <th>
                        Subject
                    </th>
                    <th>
                        Units
                    </th>
                    <th>
                        Grade
                    </th>
                </tr>
                <tr>
                    <td>
                        Information Security
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        1.50
                    </td>
                </tr>
                <tr>
                    <td>
                        System Integration
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        1.75
                    </td>
                </tr>
                <tr>
                    <td>
                        Multimedia Workshop
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        2.00
                    </td>
                </tr>
            </table>
        </div>
    `,
    /* =====================================================
       ATTENDANCE
    ===================================================== */
    attendance: `
        <div class="content-panel">
            <h2>
                Attendance Records
            </h2>
            <div class="metric-grid">
                <div class="metric">
                    <b>
                        96%
                    </b>
                    <span>
                        Present
                    </span>
                </div>
                <div class="metric">
                    <b>
                        2
                    </b>
                    <span>
                        Late
                    </span>
                </div>
                <div class="metric">
                    <b>
                        1
                    </b>
                    <span>
                        Absent
                    </span>
                </div>
            </div>
            <br>
            <table>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Subject
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
                <tr>
                    <td>
                        Sep 04
                    </td>
                    <td>
                        Information Security
                    </td>
                    <td>
                        Present
                    </td>
                </tr>
                <tr>
                    <td>
                        Sep 05
                    </td>
                    <td>
                        System Integration
                    </td>
                    <td>
                        Present
                    </td>
                </tr>
                <tr>
                    <td>
                        Sep 06
                    </td>
                    <td>
                        Multimedia Workshop
                    </td>
                    <td>
                        Late
                    </td>
                </tr>
            </table>
        </div>
    `,
    /* =====================================================
       SUBJECTS
    ===================================================== */
    subjects: `
        <div class="content-panel">
            <h2>
                Subject Enlistment
            </h2>
            <p>
                Next term enrollment opens September 20.
            </p>
            <table>
                <tr>
                    <th>
                        Code
                    </th>
                    <th>
                        Subject
                    </th>
                    <th>
                        Units
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                <tr>
                    <td>
                        IT 402
                    </td>
                    <td>
                        Information Assurance
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        <button
                            class="small-action"
                            onclick="enlistSubject('IT 402')"
                        >
                            Enlist
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        IT 403
                    </td>
                    <td>
                        Web Development
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        <button
                            class="small-action"
                            onclick="enlistSubject('IT 403')"
                        >
                            Enlist
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        IT 404
                    </td>
                    <td>
                        Database Management
                    </td>
                    <td>
                        3
                    </td>
                    <td>
                        <button
                            class="small-action"
                            onclick="enlistSubject('IT 404')"
                        >
                            Enlist
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    `,
    /* =====================================================
       SYLLABI
    ===================================================== */
    syllabi: `
        <div class="content-panel">
            <h2>
                Syllabi & Materials
            </h2>
            <div class="material">
                <span>
                    Information Security —
                    Course Syllabus.pdf
                </span>
                <button
                    class="small-action"
                    onclick="downloadDemo('Information Security Syllabus')"
                >
                    Download
                </button>
            </div>
            <div class="material">
                <span>
                    System Integration —
                    Group Presentation.pdf
                </span>
                <button
                    class="small-action"
                    onclick="downloadDemo('System Integration Material')"
                >
                    Download
                </button>
            </div>
            <div class="material">
                <span>
                    Multimedia Workshop —
                    Learning Materials.pdf
                </span>
                <button
                    class="small-action"
                    onclick="downloadDemo('Multimedia Material')"
                >
                    Download
                </button>
            </div>
        </div>
    `,
    /* =====================================================
       CALENDAR
    ===================================================== */
    calendar: `
        <div class="content-panel">
            <h2>
                Calendar & Events
            </h2>
            <div class="calendar-grid">
                ${Array.from(
                    { length: 28 },
                    (_, index) => {
                        const day =
                            index + 1;
                        let event = "";
                        if (day === 5) {
                            event = "Midterm";
                        }
                        if (day === 6) {
                            event = "Defense";
                        }
                        if (day === 12) {
                            event = "School Event";
                        }
                        if (day === 20) {
                            event = "Enrollment";
                        }
                        return `
                            <div class="day">
                                <b>
                                    ${day}
                                </b>
                                ${
                                    event
                                    ?
                                    `
                                    <div class="event">
                                        ${event}
                                    </div>
                                    `
                                    :
                                    ""
                                }
                            </div>
                        `;
                    }
                ).join("")}
            </div>
        </div>
    `,
    /* =====================================================
       TUITION
    ===================================================== */
    tuition: `
        <div class="content-panel">
            <h2>
                Tuition & Payments
            </h2>
            <div class="metric-grid">
                <div class="metric">
                    <b>
                        ₱4,000
                    </b>
                    <span>
                        Outstanding Balance
                    </span>
                </div>
                <div class="metric">
                    <b>
                        ₱2,500
                    </b>
                    <span>
                        Next Installment
                    </span>
                </div>
                <div class="metric">
                    <b>
                        ₱850
                    </b>
                    <span>
                        Paid Miscellaneous
                    </span>
                </div>
            </div>
            <br>
            <button
                class="small-action"
                onclick="openPayment()"
            >
                Make Payment
            </button>
        </div>
    `,
    /* =====================================================
       PROFILE
    ===================================================== */
    profile: `
        <div class="content-panel">
            <h2>
                Profile & Contact
            </h2>
            <table>
                <tr>
                    <th>
                        Student ID
                    </th>
                    <td id="profileId">
                        —
                    </td>
                </tr>
                <tr>
                    <th>
                        Name
                    </th>
                    <td id="profileName">
                        John
                    </td>
                </tr>
                <tr>
                    <th>
                        Program
                    </th>
                    <td>
                        Bachelor of Science in
                        Information Technology
                    </td>
                </tr>
                <tr>
                    <th>
                        Email
                    </th>
                    <td>
                        student@cec.edu.ph
                    </td>
                </tr>
                <tr>
                    <th>
                        Contact
                    </th>
                    <td>
                        +63 900 000 0000
                    </td>
                </tr>
            </table>
        </div>
    `
};
/* =========================================================
   OPEN VIEW
========================================================= */
function openView(view) {
    $("#dashboardHome")
        .classList.add("hidden");
    $("#contentView")
        .classList.remove("hidden");
    $("#contentView").innerHTML =
        views[view] || views.grades;
    $$(".side-link")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.view === view
            );
        });
    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "cecCurrentUser"
            ) || "null"
        );
    if (
        currentUser &&
        $("#profileId")
    ) {
        $("#profileId")
            .textContent =
            currentUser.id;
        $("#profileName")
            .textContent =
            currentUser.name || "John";
    }
}
/* =========================================================
   HOME VIEW
========================================================= */
function openHome() {
    $("#contentView")
        .classList.add("hidden");
    $("#dashboardHome")
        .classList.remove("hidden");
    $$(".side-link")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.view === "home"
            );
        });
}
/* =========================================================
   SIDEBAR NAVIGATION
========================================================= */
$$(".side-link")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const view =
                    button.dataset.view;
                if (
                    view === "home"
                ) {
                    openHome();
                }
                else {
                    openView(
                        view
                    );
                }
            }
        );
    });
/* =========================================================
   DASHBOARD SHORTCUTS
========================================================= */
$$("[data-view-jump]")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                openView(
                    button.dataset.viewJump
                );
            }
        );
    });
/* =========================================================
   SUBJECT ENLISTMENT
========================================================= */
function enlistSubject(code) {
    showToast(
        code +
        " has been selected for enlistment."
    );
}
/* =========================================================
   DOWNLOAD DEMO
========================================================= */
function downloadDemo(name) {
    showToast(
        name +
        " download started. Demo mode."
    );
}
/* =========================================================
   PAYMENT
========================================================= */
function openPayment() {
    showToast(
        "Payment page opened. Demo mode."
    );
}
/* =========================================================
   DATE
========================================================= */
function updateDate() {
    const date =
        new Date();
    const weekday =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );
    const month =
        date.toLocaleDateString(
            "en-US",
            {
                month: "long"
            }
        );
    const day =
        date.getDate();
    $("#dashDate")
        .innerHTML =
        `${weekday.toUpperCase()}<br>
         ${month.toUpperCase()} ${day}`;
}
updateDate();
/* =========================================================
   ADMIN AUTHENTICATION & ADMIN DASHBOARD
========================================================= */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
function showAdminLogin(){showPage("adminAuth");$("#adminUsername").focus();}
function showAdminDashboard(){const admin=JSON.parse(localStorage.getItem("cecCurrentAdmin")||"null");updateAdminInfo(admin||{name:"Administrator"});updateAdminDate();showPage("adminDashboard");}
$("#adminLoginForm").addEventListener("submit",event=>{event.preventDefault();const username=$("#adminUsername").value.trim();const password=$("#adminPassword").value;if(username===ADMIN_USERNAME&&password===ADMIN_PASSWORD){const admin={username,name:"Administrator",role:"admin"};localStorage.setItem("cecCurrentAdmin",JSON.stringify(admin));showAdminDashboard();showToast("Admin login successful. Welcome!");}else{showToast("Invalid admin username or password.");}});
function updateAdminInfo(admin){const name=admin.name||"Administrator";$("#adminName").textContent=name;$("#adminSidebarName").textContent=name;$("#adminStudentCount").textContent=getUsers().length+" registered";}
function updateAdminDate(){const date=new Date();const weekday=date.toLocaleDateString("en-US",{weekday:"long"});const month=date.toLocaleDateString("en-US",{month:"long"});if($("#adminDashDate"))$("#adminDashDate").innerHTML=`${weekday.toUpperCase()}<br>${month.toUpperCase()} ${date.getDate()}`;}
function escapeAdminHtml(value){return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");}
function adminDemoAction(action){showToast(action+" opened. Demo mode.");}
const adminViews={
 students:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Student Management</h2><button onclick="adminDemoAction('Add Student')">+ Add Student</button></div><div class="admin-info-box">Manage registered student accounts, review student information, and activate or deactivate accounts.</div><table><tr><th>Student ID</th><th>Name</th><th>Program</th><th>Status</th><th>Action</th></tr>${getUsers().map(u=>`<tr><td>${escapeAdminHtml(u.id)}</td><td>${escapeAdminHtml(u.name||"John")}</td><td>BS Information Technology</td><td><span class="admin-status">Active</span></td><td><div class="admin-table-actions"><button class="admin-table-btn light" onclick="adminDemoAction('Edit Student')">Edit</button><button class="admin-table-btn" onclick="adminDemoAction('View Student')">View</button></div></td></tr>`).join("")}</table></div>`,
 teachers:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Teacher Management</h2><button onclick="adminDemoAction('Add Teacher')">+ Add Teacher</button></div><table><tr><th>Teacher ID</th><th>Name</th><th>Department</th><th>Subject</th><th>Status</th></tr><tr><td>T-001</td><td>Prof. Sadora</td><td>Information Technology</td><td>Information Security</td><td><span class="admin-status">Active</span></td></tr><tr><td>T-002</td><td>Prof. Vince</td><td>Multimedia</td><td>Multimedia Workshop</td><td><span class="admin-status">Active</span></td></tr><tr><td>T-003</td><td>Prof. Reyes</td><td>Computer Studies</td><td>System Integration</td><td><span class="admin-status">Active</span></td></tr></table></div>`,
 subjects:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Subject Management</h2><button onclick="adminDemoAction('Add Subject')">+ Add Subject</button></div><table><tr><th>Code</th><th>Subject</th><th>Units</th><th>Year Level</th><th>Action</th></tr><tr><td>IT 402</td><td>Information Assurance</td><td>3</td><td>4th Year</td><td><button class="admin-table-btn light" onclick="adminDemoAction('Edit Subject')">Edit</button></td></tr><tr><td>IT 403</td><td>Web Development</td><td>3</td><td>4th Year</td><td><button class="admin-table-btn light" onclick="adminDemoAction('Edit Subject')">Edit</button></td></tr><tr><td>IT 404</td><td>Database Management</td><td>3</td><td>4th Year</td><td><button class="admin-table-btn light" onclick="adminDemoAction('Edit Subject')">Edit</button></td></tr></table></div>`,
 classes:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Classes & Sections</h2><button onclick="adminDemoAction('Add Section')">+ Add Section</button></div><table><tr><th>Section</th><th>Year Level</th><th>Adviser</th><th>Students</th><th>Status</th></tr><tr><td>BSIT 4A</td><td>4th Year</td><td>Prof. Sadora</td><td>32</td><td><span class="admin-status">Active</span></td></tr><tr><td>BSIT 4B</td><td>4th Year</td><td>Prof. Reyes</td><td>29</td><td><span class="admin-status">Active</span></td></tr><tr><td>BSIT 3A</td><td>3rd Year</td><td>Prof. Vince</td><td>35</td><td><span class="admin-status">Active</span></td></tr></table></div>`,
 enrollment:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Enrollment Management</h2><button onclick="adminDemoAction('Enrollment Settings')">Enrollment Settings</button></div><div class="admin-info-box">Review applications before assigning students to their grade level and section.</div><table><tr><th>Application ID</th><th>Student</th><th>Program</th><th>Status</th><th>Action</th></tr><tr><td>ENR-001</td><td>Maria Santos</td><td>BSIT</td><td><span class="admin-status pending">Pending</span></td><td><button class="admin-table-btn" onclick="adminDemoAction('Approve Enrollment')">Approve</button></td></tr><tr><td>ENR-002</td><td>Juan Dela Cruz</td><td>BSIT</td><td><span class="admin-status pending">Pending</span></td><td><button class="admin-table-btn" onclick="adminDemoAction('Approve Enrollment')">Approve</button></td></tr></table></div>`,
 grades:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Grades Management</h2><button onclick="adminDemoAction('Grade Reports')">Grade Reports</button></div><div class="admin-info-box">Monitor submitted grades and review academic records. Grade entry is normally handled by authorized teachers.</div><table><tr><th>Student</th><th>Student ID</th><th>Subject</th><th>Grade</th><th>Status</th></tr><tr><td>John</td><td>2026-0001</td><td>Information Security</td><td>1.50</td><td><span class="admin-status">Submitted</span></td></tr><tr><td>Maria Santos</td><td>2026-0002</td><td>System Integration</td><td>1.75</td><td><span class="admin-status">Submitted</span></td></tr></table></div>`,
 attendance:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Attendance Management</h2><button onclick="adminDemoAction('Attendance Report')">Generate Report</button></div><div class="metric-grid"><div class="metric"><b>96%</b><span>Average Present</span></div><div class="metric"><b>18</b><span>Late Records</span></div><div class="metric"><b>7</b><span>Absent Records</span></div></div><br><table><tr><th>Date</th><th>Section</th><th>Present</th><th>Absent</th><th>Status</th></tr><tr><td>Today</td><td>BSIT 4A</td><td>30</td><td>2</td><td><span class="admin-status">Recorded</span></td></tr><tr><td>Today</td><td>BSIT 4B</td><td>27</td><td>2</td><td><span class="admin-status">Recorded</span></td></tr></table></div>`,
 announcements:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Announcements</h2><button onclick="adminDemoAction('Create Announcement')">+ New Announcement</button></div><div class="admin-info-box">Publish important school updates that can be shown to students and teachers through the portal.</div><div class="material"><span>Enrollment for the new semester is now open.</span><button class="small-action" onclick="adminDemoAction('Edit Announcement')">Edit</button></div><div class="material"><span>Midterm grades are now posted.</span><button class="small-action" onclick="adminDemoAction('Edit Announcement')">Edit</button></div><div class="material"><span>Library extended hours during finals week.</span><button class="small-action" onclick="adminDemoAction('Edit Announcement')">Edit</button></div></div>`,
 reports:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Reports</h2><button onclick="adminDemoAction('Generate Report')">Generate Report</button></div><div class="metric-grid"><div class="metric"><b>${getUsers().length}</b><span>Registered Students</span></div><div class="metric"><b>24</b><span>Active Teachers</span></div><div class="metric"><b>12</b><span>Active Sections</span></div></div><br><table><tr><th>Report</th><th>Description</th><th>Action</th></tr><tr><td>Student Report</td><td>List of registered students.</td><td><button class="admin-table-btn" onclick="adminDemoAction('Student Report')">Generate</button></td></tr><tr><td>Attendance Report</td><td>Attendance summary by section.</td><td><button class="admin-table-btn" onclick="adminDemoAction('Attendance Report')">Generate</button></td></tr><tr><td>Grade Report</td><td>Academic grade summary.</td><td><button class="admin-table-btn" onclick="adminDemoAction('Grade Report')">Generate</button></td></tr></table></div>`,
 users:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>User Management</h2><button onclick="adminDemoAction('Create User')">+ Create User</button></div><div class="admin-info-box">Manage the portal accounts for students, teachers, and administrators.</div><table><tr><th>Username / ID</th><th>Name</th><th>Role</th><th>Status</th><th>Action</th></tr>${getUsers().map(u=>`<tr><td>${escapeAdminHtml(u.id)}</td><td>${escapeAdminHtml(u.name||"John")}</td><td>Student</td><td><span class="admin-status">Active</span></td><td><button class="admin-table-btn light" onclick="adminDemoAction('Manage User')">Manage</button></td></tr>`).join("")}<tr><td>admin</td><td>Administrator</td><td>Admin</td><td><span class="admin-status">Active</span></td><td><button class="admin-table-btn light" onclick="adminDemoAction('Admin Account')">Manage</button></td></tr></table></div>`,
 profile:()=>`<div class="content-panel"><div class="admin-panel-header"><h2>Admin Profile</h2><button onclick="adminDemoAction('Edit Admin Profile')">Edit Profile</button></div><table><tr><th>Username</th><td>admin</td></tr><tr><th>Name</th><td>Administrator</td></tr><tr><th>Role</th><td>System Administrator</td></tr><tr><th>Access</th><td>Full School Portal Management</td></tr></table></div>`
};
function openAdminView(view){if(view==="home"){$("#adminContentView").classList.add("hidden");$("#adminDashboardHome").classList.remove("hidden");}else{$("#adminDashboardHome").classList.add("hidden");$("#adminContentView").classList.remove("hidden");$("#adminContentView").innerHTML=adminViews[view]?adminViews[view]():"";}$$('.admin-side-link').forEach(b=>b.classList.toggle('active',b.dataset.adminView===view));$$('.admin-dashboard-page .dash-nav button').forEach(b=>b.classList.toggle('active',b.dataset.adminTopView===view));}
$$('.admin-side-link').forEach(b=>b.addEventListener('click',()=>openAdminView(b.dataset.adminView)));
$$('[data-admin-top-view]').forEach(b=>b.addEventListener('click',()=>openAdminView(b.dataset.adminTopView)));
$$('[data-admin-view-jump]').forEach(b=>b.addEventListener('click',()=>openAdminView(b.dataset.adminViewJump)));
$("#adminProfileBtn").addEventListener('click',()=>openAdminView('profile'));
$("#adminNotificationsBtn").addEventListener('click',()=>showToast('No new admin notifications.'));
$("#adminSettingsBtn").addEventListener('click',()=>showToast('Admin settings opened. Demo mode.'));
function adminLogout(){localStorage.removeItem('cecCurrentAdmin');$("#adminPassword").value="";showPage('landing');showToast('Admin has been logged out.');}
$("#adminLogoutBtn").addEventListener('click',adminLogout);$("#adminQuickLogout").addEventListener('click',adminLogout);
/* =========================================================
   AUTO LOGIN
========================================================= */
const savedAdmin =
    localStorage.getItem(
        "cecCurrentAdmin"
    );
const savedUser =
    localStorage.getItem(
        "cecCurrentUser"
    );
if (savedAdmin) {
    try {
        const admin = JSON.parse(savedAdmin);
        updateAdminInfo(admin);
        updateAdminDate();
        showPage("adminDashboard");
    }
    catch (error) {
        localStorage.removeItem("cecCurrentAdmin");
        showPage("landing");
    }
}
else if (savedUser) {
    try {
        const user =
            JSON.parse(
                savedUser
            );
        updateUserInfo(
            user
        );
        showPage(
            "dashboard"
        );
    }
    catch (error) {
        localStorage.removeItem(
            "cecCurrentUser"
        );
        showPage(
            "landing"
        );
    }
}
else {
    showPage(
        "landing"
    );
}