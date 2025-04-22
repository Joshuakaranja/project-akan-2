document.getElementById("akanForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const birthdate = document.getElementById("birthdate").value;
    const gender = document.querySelector('input[name="gender"]:checked');
  
    if (!birthday) {
        alert('Please enter your birthday');
        return;
    }
    
    if (!gender) {
        alert("Please select a gender.");
        return;
      }
    
      const date = new Date(birthdate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
    
      const dayOfWeek = calculateDayOfWeek(day, month, year);
      const akan = getAkanName(dayOfWeek, gender.value);
      displayResult(akan.name, akan.day);
    });
    
    function calculateDayOfWeek(day, month, year) {
      if (month < 3) {
        month += 12;
        year -= 1;
      }
    
      const CC = Math.floor(year / 100);
      const YY = year % 100;
    
      const dayOfWeek =
        (day +
          Math.floor(26 * (month + 1) / 10) +
          YY +
          Math.floor(YY / 4) +
          Math.floor(CC / 4) +
          5 * CC) %
        7;
    
      return (dayOfWeek + 6) % 7; // Convert to 0=Sunday
    }
    
    function getAkanName(dayOfWeek, gender) {
      const maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
      const femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
      return {
        name: gender === "male" ? maleNames[dayOfWeek] : femaleNames[dayOfWeek],
        day: days[dayOfWeek]
      };
    }
    
    function displayResult(name, day) {
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `
        <h2>Your Akan Name</h2>
        <p>You were born on a <strong>${day}</strong>.</p>
        <p>Your Akan name is <strong>${name}</strong>.</p>
      `;
    }
    