
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

    // ----- Join form: persist and render members list -----
    function getMembers() {
        const raw = localStorage.getItem('members');
        return raw ? JSON.parse(raw) : [];
    }

    function saveMembers(members) {
        localStorage.setItem('members', JSON.stringify(members));
    }

    function deleteMember(index) {
        const members = getMembers();
        members.splice(index, 1);
        saveMembers(members);
        renderMembers();
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => toast.classList.remove('show'), 2400);
        setTimeout(() => toast.remove(), 3000);
    }

    function renderMembers() {
        const list = document.getElementById('membersList');
        if (!list) return;

        const countEl = document.getElementById('memberCount');
        const clubFilter = clubSelect ? clubSelect.value : '';
        const members = getMembers();
        const filtered = clubFilter ? members.filter(m => m.club === clubFilter) : members;

        if (countEl) countEl.textContent = String(filtered.length);

        if (filtered.length === 0) {
            list.innerHTML = '<li>No members yet.</li>';
            return;
        }
        list.innerHTML = filtered.map((m, idx) => {
            const activity = m.activity ? ` (${m.activity})` : '';
            return `
                <li>
                    <span>${m.name} — ${m.club}${activity}</span>
                    <button type="button" class="delete-btn" data-index="${idx}">Exit</button>
                </li>
            `;
        }).join('');
        
        // Attach delete event listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const idx = parseInt(this.getAttribute('data-index'));
                const members = getMembers();
                const clubFilteredMembers = clubFilter ? members.filter(m => m.club === clubFilter) : members;
                const target = clubFilteredMembers[idx];
                if (!target) return;
                const targetIndex = members.findIndex(m => m.joined === target.joined && m.name === target.name);
                if (targetIndex > -1) deleteMember(targetIndex);
            });
        });
    }

    const joinForm = document.getElementById('joinForm');
    const sportSelect = document.getElementById('sportOption');
    const clubSelect = document.getElementById('club');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const joinBtn = document.getElementById('joinBtn');

    // show/hide sports sub-options when Sports Club is selected
    if (clubSelect && sportSelect) {
        clubSelect.addEventListener('change', function () {
            if (this.value === 'Sports Club') {
                sportSelect.style.display = 'block';
            } else {
                sportSelect.style.display = 'none';
                sportSelect.value = '';
            }
            renderMembers();
        });
    }
    if (joinForm) {
        joinForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameEl = document.getElementById('name');
            const clubEl = document.getElementById('club');
            const msg = document.getElementById('message');
            const toastToggle = document.getElementById('toastToggle');
            const name = nameEl ? nameEl.value.trim() : '';
            const club = clubEl ? clubEl.value : '';
            const activity = (club === 'Sports Club' && sportSelect) ? (sportSelect.value || '') : '';

            if (!name || !club) {
                if (msg) msg.textContent = 'Please enter your name and choose a club.';
                return;
            }

            const members = getMembers();
            const joinedStamp = new Date().toISOString();
            members.push({ name: name, club: club, activity: activity, joined: joinedStamp });
            saveMembers(members);
            renderMembers();

            const clubMembers = members.filter(m => m.club === club);
            const updatedCount = clubMembers.length;
            if (!toastToggle || toastToggle.checked) {
                showToast(`Registered successfully! ${club} now has ${updatedCount} participant${updatedCount === 1 ? '' : 's'}.`);
            }
            if (msg) msg.textContent = activity ? `Thanks ${name}, you joined ${club} (${activity}).` : `Thanks ${name}, you joined ${club}.`;
            joinForm.reset();
            // hide sport select after reset
            if (sportSelect) sportSelect.style.display = 'none';
        });
    }

    if (joinBtn && joinForm) {
        joinBtn.addEventListener('click', function () {
            joinForm.requestSubmit();
        });
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function () {
            saveMembers([]);
            renderMembers();
            showToast('All members cleared.');
        });
    }

    // render persisted members on load
    renderMembers();
});

