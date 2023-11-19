// Array to store player data (correct/incorrect answers)
var PlayersData = [];

// Function to register a player
function Register() {
    // Retrieve input values
    var firstname = document.PersonalInformation.fname.value;
    var lastname = document.PersonalInformation.lname.value;
    var email = document.PersonalInformation.email.value;
    var dob = document.PersonalInformation.dob.value;
    var maleCount = 0;
    var femalCount = 0; // Typo: should be femaleCount

    // Validate input values
    if (firstname.length < 3) {
        alert("First Name should be at least 3 characters long.");
        return false;
    }
    if (lastname.length < 3) {
        alert("Last Name should be at least 3 characters long.");
        return false;
    }

    // Calculate age and validate
    calculateAge();
    var age = parseInt(document.getElementById("age").value);
    if (age < 8 || age >= 12 || isNaN(age)) {
        alert("Age must be between 8 and 12 inclusive.");
        return false;
    }

    // Hide and disable the registration form
    hideForm();
    updateChart();
    DisableEntryForm();

    return true;
}

// Function to calculate age based on date of birth
function calculateAge() {
    var userinput = document.getElementById("dob").value;
    var parts = userinput.split("-");
    var dob1 = new Date(parts[0], parts[1] - 1, parts[2]);
    var today = new Date();
    var age = today.getFullYear() - dob1.getFullYear();

    if (today.getMonth() < dob1.getMonth() || (today.getMonth() === dob1.getMonth() && today.getDate() < dob1.getDate())) {
        age--;
    }

    document.getElementById("age").value = age;
}

// Function to display percentage score
function findPercentageScore() {
    var name1 = document.getElementById("fname").value;
    var name2 = document.getElementById("lname").value;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var totalAnswers = PlayersData.length;

    // Count correct and incorrect answers
    for (var i = 0; i < totalAnswers; i++) {
        if (PlayersData[i].correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
    }

    // Calculate and display percentage score
    var percentageScore = (correctAnswers / totalAnswers) * 100;
    var resultText = `Name: ${name1} ${name2}\nCorrect Answers: ${correctAnswers}\nIncorrect Answers: ${incorrectAnswers}\nTotal Answers: ${totalAnswers}\nPercentage Score: ${percentageScore.toFixed(2)}%`;
    document.getElementById("showallplayers").value = resultText;
}

function updateChart() {
    var genderSelect = document.getElementById("gender");
    var selectedGender = genderSelect.value;

    if (selectedGender === "m" && femaleCount > 0) {
        maleCount++;
        femaleCount--; // Typo: should be femaleCount++
    } else if (selectedGender === "f" && maleCount > 0) {
        maleCount--; // Typo: should be maleCount++
        femaleCount++;
    }

    document.getElementById("maleCount").innerText = maleCount;
}

// Function to start the game
function PlayGame() {
    // Hide start button, show game field, and set up random numbers
    var showStartButton = document.getElementById("start");
    showStartButton.style.display = "none";

    var gameField = document.getElementById("f2");
    gameField.style.display = "block";

    var clearAns = document.getElementById("ans");
    clearAns.value = "";

    // Enable game controls
    document.getElementById("accept").disabled = false;
    document.getElementById("next").disabled = false;
    document.getElementById("ans").disabled = false;
    document.getElementById('num1').value = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    document.getElementById('num2').value = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
}

// Function to disable the registration form
function DisableEntryForm() {
    // Disable form elements
    document.getElementById("fname").disabled = true;
    document.getElementById("lname").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("dob").disabled = true;
    document.getElementById("register").disabled = true;
    document.getElementById("end").disabled = false;
    document.getElementById("gender1").disabled = true;
    document.getElementById("gender2").disabled = true;
    document.getElementById("start").disabled = false;
}

// Function to enable the registration form
function EnableEntryForm() {
    var form = document.getElementById("info");
    form.style.display = "block";

    var gameField = document.getElementById("f2");
    gameField.style.display = "none";

    // Enable form elements
    document.getElementById("fname").disabled = false;
    document.getElementById("lname").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("dob").disabled = false;
    document.getElementById("register").disabled = false;
    document.getElementById("end").disabled = true;
    document.getElementById("gender1").disabled = false;
    document.getElementById("gender2").disabled = false;
    document.getElementById("start").disabled = false;
}

// Function to hide the registration form
function hideForm() {
    var form = document.getElementById("info");
    form.style.display = "none";

    var showStartButton = document.getElementById("start");
    showStartButton.style.display = "block";
}

// Function to check the answer and update player data
function CheckAnswer() {
    let num1 = document.forms["Game"]["num1"].value;
    let num2 = document.forms["Game"]["num2"].value;
    let ans = document.forms["Game"]["ans"].value;

    // Check the correctness of the answer and update player data
    if (num1 * num2 == ans) {
        alert("Good job! Your answer is correct.");
        PlayersData.push({ correct: true });
    } else {
        alert("Uh Oh, your answer is incorrect.");
        PlayersData.push({ correct: false });
    }
}

// Function to display all player data
function showAll() {
    var a = "<hr/>";
    for (var y = 0; y < PlayersData.length; y++) {
        a += "Element " + y + " = " + PlayersData[y] + "\n";
    }
    document.getElementById("showallplayers").innerHTML = a;
}

// Function to end the game
function EndGame() {
    findPercentageScore();
    showAll();
    EnableEntryForm();
}

// Event listener for preloader
document.addEventListener("DOMContentLoaded", function () {
    var preloader = document.querySelector(".preloader");
    setTimeout(function () {
        preloader.style.display = "none";
    }, 1000);
});
