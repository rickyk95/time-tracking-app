const confirmation = document.getElementById('confirmation');
const category = document.getElementById('category');
const description = document.getElementById('description');
const time = document.getElementById('time');

function activitySaved(){
    console.log("Activity saved")
    confirmation.classList.remove('hide');
    setTimeout(()=>{
        confirmation.classList.add('hide');
    },1000);
}

const form = document.querySelector('form');
form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        activitySaved();
        let form = new FormData();
        form.append('category',category.value);
        form.append('description',description.value);
        form.append('time',time.value);
        form.append('submit',true);
        let result = await fetch("http://localhost/time-tracking/index.php",{method:"POST",mode:"no-cors", body:form});
        getDay();
});
