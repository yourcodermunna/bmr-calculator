
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
    const unit = document.getElementById('heightUnit').value;

    let height;
    if (unit === 'cm') {
        height = parseFloat(document.getElementById('heightCm').value);
    } else {
        const ft = parseFloat(document.getElementById('heightFt').value);
        const inch = parseFloat(document.getElementById('heightIn').value);
        height = (ft * 30.48) + (inch * 2.54);
    }

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert("দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন।");
        return;
    }

    let bmr;
    if (gender === 'male') {
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    } else {
        bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }

    const tdee = bmr * activity;
    const heightInMeter = height / 100;
    const bmi = weight / (heightInMeter * heightInMeter);

    let bmiStatus = '';
    if (bmi < 18.5) {
        bmiStatus = 'কম ওজন (Underweight)';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiStatus = 'স্বাভাবিক ওজন (Normal)';
    } else if (bmi >= 25 && bmi < 29.9) {
        bmiStatus = 'বেশি ওজন (Overweight)';
    } else {
        bmiStatus = 'মোটা (Obese)';
    }

    const calorieDeficit = tdee - 500;
    const calorieSurplus = tdee + 500;

    document.getElementById('result').innerHTML =
        `✅ আপনার BMR: ${bmr.toFixed(2)} ক্যালোরি/দিন<br>` +
        `✅ আপনার মোট ক্যালোরি চাহিদা (TDEE): ${tdee.toFixed(2)} ক্যালোরি/দিন<br><br>` +
        `💪 আপনার BMI: ${bmi.toFixed(2)}<br>` +
        `📊 ওজনের অবস্থা: ${bmiStatus}<br><br>` +
        `⚠️ ওজন কমাতে (Calorie Deficit): ${calorieDeficit.toFixed(2)} ক্যালোরি/দিন<br>` +
        `🍚 ওজন বাড়াতে (Calorie Surplus): ${calorieSurplus.toFixed(2)} ক্যালোরি/দিন`;
}

function downloadPDF() {
    const resultElement = document.getElementById('result');
    const opt = {
        margin: 0.5,
        filename: 'calculation_result.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(resultElement).set(opt).save();
}
