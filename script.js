// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the calculate button and attach an event listener to it
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", function(event) {
        myFunction(event);
    });

    // Get the input fields for day, month, and year
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    // Add event listeners to input fields to clear validation messages when they change
    dayInput.addEventListener('input', clearValidationMessage);
    monthInput.addEventListener('input', clearValidationMessage);
    yearInput.addEventListener('input', clearValidationMessage);

    // Function to check if a year is a leap year
    function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    // Function to calculate age based on birth date
    function ageCalculator(birthDate) {
        const currentDate = new Date();

        // Months with 30 or 31 days
        const daysInMonth = [31, 28 + (isLeapYear(currentDate.getFullYear()) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth() + 1; // Adjust to 1-based
        let days = currentDate.getDate() - birthDate.getDate();
        
        // Adjust negative days
        if (days < 0) {
            months--;
            days += daysInMonth[birthDate.getMonth()];
        }
        
        if (months < 0) {
            years--;
            months += 12;
        }

        // Update the HTML elements with the calculated age
        document.getElementById('calculated_year').textContent = years;
        document.getElementById('calculated_month').textContent = months;
        document.getElementById('calculated_day').textContent = days;
    }

    // Function to handle form submission
    function myFunction(event) {
        let day = dayInput.value.trim();
        let month = monthInput.value.trim();
        let year = yearInput.value.trim();

        let isValid = true;

        // Regular expression to match only numeric characters
        const numericRegex = /^[0-9]+$/;

        // Validate day input
        if (!dayInput.value) {
            document.getElementById("day_alert").innerHTML = "This field is required";
            document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        } else if (parseInt(day) < 1 || parseInt(day) > 31 || !numericRegex.test(day)) {
            document.getElementById("day_alert").innerHTML = "Must be a valid day";
            document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        }

        // Validate month input
        if (!monthInput.value) {
            document.getElementById("month_alert").innerHTML = "This field is required";
            document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        } else if (parseInt(month) < 1 || parseInt(month) > 12 ||!numericRegex.test(month)) {
            document.getElementById("month_alert").innerHTML = "Must be a valid month";
            document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        }

        // Validate year input
        if (!yearInput.value) {
            document.getElementById("year_alert").innerHTML = "This field is required";
            document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
            document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        } else if (parseInt(year) < 1753 || !numericRegex.test(year)) {
            document.getElementById("year_alert").innerHTML = "Must be a valid year";
            document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
            document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        } else if (parseInt(year) > new Date().getFullYear()) {
            document.getElementById("year_alert").innerHTML = "Must be in the past";
            document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
            document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        }

        // Validate days for February
        if (parseInt(month) == 2) {
            if (!isLeapYear(parseInt(year))) {
                if (parseInt(day) > 28) {
                    document.getElementById("day_alert").innerHTML = "Must be a valid date";
                    document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
                    document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
                    document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
                    document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
                    document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
                    document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
                    isValid = false;
                }
            } else {
                if (parseInt(day) > 29) {
                    document.getElementById("day_alert").innerHTML = "Must be a valid date";
                    document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
                    document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
                    document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
                    document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
                    document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
                    document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
                    isValid = false;
                }
            }
        }

        // Validate days for months with 30 days
        if (![1, 3, 5, 7, 8, 10, 12].includes(parseInt(month))) {
            if (parseInt(day) > 30) {
                document.getElementById("day_alert").innerHTML = "Must be a valid date";
                document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
                document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
                document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
                document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
                document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
                document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
                isValid = false;
                event.preventDefault();
                return;
            }
        }

        let currentDate = new Date();
        // Check if the input date is ahead of the current date
        if (parseInt(year) > currentDate.getFullYear() || (parseInt(year) === currentDate.getFullYear() && parseInt(month) > currentDate.getMonth() + 1) || (parseInt(year) === currentDate.getFullYear() && parseInt(month) === currentDate.getMonth() + 1 && parseInt(day) > currentDate.getDate())) {
            document.getElementById("day_alert").innerHTML = "Must be in the past";
            document.querySelector('.l_day').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#day').style.borderColor = 'hsl(0, 100%, 67%)';
            document.querySelector('.l_month').style.color = 'hsl(0, 100%, 67%)'; 
            document.querySelector('#month').style.borderColor = 'hsl(0, 100%, 67%)';
            document.querySelector('.l_year').style.color = 'hsl(0, 100%, 67%)';
            document.querySelector('#year').style.borderColor = 'hsl(0, 100%, 67%)';
            isValid = false;
        }

        // If all inputs are valid, calculate the age
        if (isValid) {
            ageCalculator(new Date(parseInt(year), parseInt(month), parseInt(day)));
            event.preventDefault();
            return false;
        } else {
            event.preventDefault();
            return false;
        }
    }

    // Function to clear validation messages
    function clearValidationMessage() {
        document.getElementById("day_alert").innerHTML = "";
        document.getElementById("month_alert").innerHTML = "";
        document.getElementById("year_alert").innerHTML = "";
        document.querySelector('.l_day').style.color = 'hsl(0, 1%, 44%)';
        document.querySelector('.l_month').style.color = 'hsl(0, 1%, 44%)';
        document.querySelector('.l_year').style.color = 'hsl(0, 1%, 44%)';
        document.querySelector('#day').style.borderColor = 'hsl(0, 0%, 86%)';
        document.querySelector('#month').style.borderColor = 'hsl(0, 0%, 86%)';
        document.querySelector('#year').style.borderColor = 'hsl(0, 0%, 86%)';
        document.getElementById('calculated_year').textContent = '--';
        document.getElementById('calculated_month').textContent = '--';
        document.getElementById('calculated_day').textContent = '--';
        document.querySelector('input:focus').style.borderColor = 'hsl(259, 100%, 65%)';
    }
});
