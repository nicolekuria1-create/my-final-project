
// Akan names (no DOM access here)
const akannames = {
    sunday: { male: "Kwasi", female: "Akosua" },
    monday: { male: "Kwadwo", female: "Adowa" },
    tuesday: { male: "Kwabena", female: "Abenaa" },
    wednesday: { male: "Kwaku", female: "Akua" },
    thursday: { male: "Yaw", female: "Yaa" },
    friday: { male: "Kofi", female: "Afua" },
    saturday: { male: "Kwame", female: "Ama" }
};

// Calculate day of the week
function calculateDayOfWeek(year, month, day) {
    let adjustedYear = year;
    let adjustedMonth = month;

    if (month <= 2) {
        adjustedYear--;
        adjustedMonth += 12;
    }

    const CC = Math.floor(adjustedYear / 100);
    const YY = adjustedYear % 100;

    const total =
        Math.floor(CC / 4) -
        (2 * CC - 1) +
        Math.floor(5 * YY / 4) +
        Math.floor(26 * (adjustedMonth + 1) / 10) +
        day;

    let dayIndex = total % 7;
    if (dayIndex < 0) dayIndex += 7;
return  dayIndex;   

};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('akanForm'); 
    const btn = document.getElementById('calculate'); 

    function readGender() {
        const radio = document.querySelector('input[name="gender"]:checked');
        if (radio) return radio.value;
        const sel = document.getElementById('gender');
        return sel ? sel.value : null;
    }

    function calculateAndShow(e) {
        if (e) e.preventDefault();

        const day = Number(document.getElementById("date").value);
        const month = Number(document.getElementById("month").value);
        const year = Number(document.getElementById("year").value);
        const gender = readGender();

        if (!gender) {
            document.getElementById("result").innerHTML = "Please select a gender";
            return;
        }

        if (
            isNaN(day) || isNaN(month) || isNaN(year) ||
            day < 1 || day > 31 ||
            month < 1 || month > 12
        ) {
            document.getElementById("result").innerHTML = "Please enter valid values";
            return;
        }

        const dayIndex = calculateDayOfWeek(year, month, day);
        const days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
        const akan = akannames[days[dayIndex]][gender];

        document.getElementById("result").innerHTML =
            `Your Akan name is <strong>${akan}</strong>`;
    }

    if (form) form.addEventListener('submit', calculateAndShow);
    else if (btn) btn.addEventListener('click', calculateAndShow);
    else {
        const anyBtn = document.querySelector('button[type="submit"], button#calculate');
        if (anyBtn) anyBtn.addEventListener('click', calculateAndShow);
    }
});

