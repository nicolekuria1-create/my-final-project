// ---------- CLUB STORAGE ----------
function getMembers(){
return JSON.parse(localStorage.getItem("members")) || [];
}

function saveMembers(data){
localStorage.setItem("members", JSON.stringify(data));
}

// ---------- DISPLAY MEMBERS ----------
const list = document.getElementById("clubList");

if(list){
const members = getMembers();

if(members.length===0){
list.innerHTML="<p>No members yet</p>";
}

members.forEach(member=>{
const li = document.createElement("li");
li.textContent = member.name + " joined " + member.club;
list.appendChild(li);
});
}

// ---------- FORM ----------
const form = document.getElementById("joinForm");

if(form){
form.addEventListener("submit", e=>{
e.preventDefault();

const name = document.getElementById("name").value.trim();
const club = document.getElementById("club").value;
const msg = document.getElementById("message");

if(name==="" || club===""){
msg.textContent="Please fill all fields";
msg.style.color="red";
return;
}

const members = getMembers();
members.push({name, club});
saveMembers(members);

msg.textContent="Successfully Joined!";
msg.style.color="green";

form.reset();
});
}
