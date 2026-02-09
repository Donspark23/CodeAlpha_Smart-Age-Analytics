const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
});

let interval;

function startLiveAge(dob){
    clearInterval(interval);

    interval = setInterval(()=>{

        const now = new Date();
        const diff = now - dob;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const years = Math.floor(days / 365.25);

        document.getElementById("age").innerHTML =
        `${years} Years | ${hours % 24} Hours | ${minutes % 60} Minutes | ${seconds % 60} Seconds`;

    },1000);
}

function getZodiac(month, day){

    const signs = [
        ["Capricorn",19],
        ["Aquarius",18],
        ["Pisces",20],
        ["Aries",19],
        ["Taurus",20],
        ["Gemini",20],
        ["Cancer",22],
        ["Leo",22],
        ["Virgo",22],
        ["Libra",22],
        ["Scorpio",21],
        ["Sagittarius",21],
        ["Capricorn",31]
    ];

    return day > signs[month][1] 
        ? signs[month+1][0] 
        : signs[month][0];
}

function triggerBirthdayConfetti(dob){

    const today = new Date();

    if(
        today.getDate() === dob.getDate() &&
        today.getMonth() === dob.getMonth()
    ){

        confetti({
            particleCount:150,
            spread:90,
            origin:{ y:0.6 }
        });

        setTimeout(()=>{
            confetti({
                particleCount:100,
                spread:120
            });
        },400);

        document.getElementById("birthdayMessage").innerHTML =
        "🎉 Happy Birthday! Enjoy your special day!";
    }
}

function calculateAge(){

    const dobInput = document.getElementById("dob").value;

    if(!dobInput){
        alert("Please select your date of birth!");
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();

    if(dob > today){
        alert("You cannot select a future date!");
        return;
    }

    startLiveAge(dob);
    triggerBirthdayConfetti(dob);

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if(days < 0){
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    const diffTime = today - dob;
    const totalDays = Math.floor(diffTime / (1000*60*60*24));
    const totalHours = Math.floor(diffTime / (1000*60*60));
    const totalMinutes = Math.floor(diffTime / (1000*60));

    document.getElementById("days").innerHTML =
    `${totalDays.toLocaleString()} days<br>
     ${totalHours.toLocaleString()} hours<br>
     ${totalMinutes.toLocaleString()} minutes`;

    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());

    if(nextBirthday < today){
        nextBirthday.setFullYear(today.getFullYear()+1);
    }

    const daysLeft = Math.ceil(
        (nextBirthday - today) / (1000*60*60*24)
    );

    document.getElementById("birthday").innerHTML =
        `${daysLeft} days left 🎉`;

    const zodiac = getZodiac(dob.getMonth(), dob.getDate());
    document.getElementById("zodiac").innerHTML = zodiac;

    const avgLifespan = 80;

    const lifePercent =
        ((years + months/12) / avgLifespan) * 100;

    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = lifePercent + "%";

    let color = "#00c6ff";

    if(lifePercent > 50) color = "#ffa502";
    if(lifePercent > 75) color = "#ff4757";

    progressBar.style.background = color;

    document.getElementById("lifePercent").innerHTML =
    `You have lived ${lifePercent.toFixed(1)}% of an average ${avgLifespan}-year lifespan.`;

    document.getElementById("output").classList.remove("hidden");
}
