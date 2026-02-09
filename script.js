function calculateAge(){

    const dob = document.getElementById("dob").value;
    const result = document.getElementById("result");

    if(!dob){
        result.innerHTML = "⚠️ Please select your date of birth.";
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if(days < 0){
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if(months < 0){
        years--;
        months += 12;
    }

    result.innerHTML =
        `You are <span style="color:#667eea">${years}</span> years,
         <span style="color:#667eea">${months}</span> months,
         and <span style="color:#667eea">${days}</span> days old 🎉`;
}