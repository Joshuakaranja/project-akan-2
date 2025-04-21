document.getElementById('akanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get user input
    const birthday = document.getElementById('birthday').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    // Validate input
    if (!birthday) {
        alert('Please enter your birthday');
        return;
    }
    
    if (!gender) {
        alert('Please select your gender');
        return;
    }
    
    // Parse date
    const date = new Date(birthday);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-indexed
    const year = date.getFullYear();
    
    // Validate date
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert('Please enter a valid date');
        return;
    }
    
    // Calculate day of the week
    const dayOfWeek = calculateDayOfWeek(day, month, year);
    
    // Get Akan name
    const akanName = getAkanName(dayOfWeek, gender);
    
    // Display result
    displayResult(dayOfWeek, akanName);
});

function calculateDayOfWeek(day, month, year) {
    // Adjust month for Zeller's congruence (March=3, April=4, ..., February=14)
    if (month < 3) {
        month += 12;
        year--;
    }
    
    const century = Math.floor(year / 100);
    const yearInCentury = year % 100;
    
    // Zeller's congruence algorithm
    const dayOfWeek = (day + Math.floor((13 * (month + 1)) / 5) + yearInCentury + Math.floor(yearInCentury / 4) + Math.floor(century / 4) + 5 * century) % 7;
    
    // Adjust result to match JavaScript's day numbering (0=Saturday, 1=Sunday, ..., 6=Friday)
    return (dayOfWeek + 5) % 7;
}

function getAkanName(dayOfWeek, gender) {
    const maleNames = ['Kwasi', 'Kwadwo', 'Kwabena', 'Kwaku', 'Yaw', 'Kofi', 'Kwame'];
    const femaleNames = ['Akosua', 'Adwoa', 'Abenaa', 'Akua', 'Yaa', 'Afua', 'Ama'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return {
        name: gender === 'male' ? maleNames[dayOfWeek] : femaleNames[dayOfWeek],
        day: days[dayOfWeek]
    };
}

function displayResult(dayOfWeek, akanName) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
        <h2>Your Akan Name Result</h2>
        <p>You were born on a <strong>${akanName.day}</strong>.</p>
        <p>Your Akan name is <strong>${akanName.name}</strong>!</p>
    `;
    resultContainer.style.display = 'block';
}