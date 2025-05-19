function toggleHeightUnit() {
    const unit = document.getElementById('heightUnit').value;
    document.getElementById('cmInput').style.display = unit === 'cm' ? 'block' : 'none';
    document.getElementById('ftinInput').style.display = unit === 'ftin' ? 'block' : 'none';
}

function calculateAll() {
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const heightUnit = document.getElementById('heightUnit').value;

    let height = 0;
    if (heightUnit === 'cm') {
        height = parseFloat(document.getElementById('heightCm').value);
    } else {
        const ft = parseFloat(document.getElementById('heightFt').value);
        const inch = parseFloat(document.getElementById('heightIn').value);
        height = (ft * 30.48) + (inch * 2.54); // 1ft = 30.48cm, 1in = 2.54cm
    }

    // BMR Calculation
    let bmr = 0;
    if (gender === 'male') {
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }

    // TDEE Calculation
    const tdee = bmr * activity;

    // BMI Calculation
    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter ** 2);
    let status = '';
    if (bmi < 18.5) status = 'কম ওজন';
    else if (bmi < 24.9) status = 'স্বাভাবিক ওজন';
    else if (bmi < 29.9) status = 'বেশি ওজন';
    else status = 'স্থূলতা';

    // Local Storage Save
    localStorage.setItem('bmrData', JSON.stringify({ weight, height, age, bmr, tdee, bmi }));

    document.getElementById('result').innerHTML =
        `আপনার BMR: ${bmr.toFixed(2)} ক্যালোরি/দিন<br>` +
        `আপনার TDEE: ${tdee.toFixed(2)} ক্যালোরি/দিন<br>` +
        `আপনার BMI: ${bmi.toFixed(2)} (${status})`;
}

// PDF ডাউনলোড
function downloadPDF() {
    const result = document.getElementById('result').innerText;
    const blob = new Blob([result], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'result.pdf';
    link.click();
}
    // Ideal Weight Calculation
    const idealWeight = 22.5 * (heightInMeter ** 2);

    // Calorie Deficit Suggestion
    const deficitCalorie = tdee - 500;
    const surplusCalorie = tdee + 500;

    // Final Output
    document.getElementById('result').innerHTML =
        `আপনার BMR: ${bmr.toFixed(2)} ক্যালোরি/দিন<br>` +
        `আপনার TDEE: ${tdee.toFixed(2)} ক্যালোরি/দিন<br>` +
        `আপনার BMI: ${bmi.toFixed(2)} (${status})<br><br>` +
        `<strong>👉 আদর্শ ওজন:</strong> ${idealWeight.toFixed(1)} কেজি<br>` +
        `<strong>👉 ওজন কমাতে:</strong> দৈনিক ${deficitCalorie.toFixed(0)} ক্যালোরি খেতে পারেন<br>` +
        function downloadPDF() {
            const result = document.getElementById('result').innerText;
            const blob = new Blob([result], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        }
    // Ideal Weight Calculation
        