const activitiesBreakdDownContainer = document.querySelector('#activities-breakdown-container');
const tbody = document.querySelector('#activities-breakdown table tbody');
const getActivitiesBtn = document.querySelector('#get-activities-btn');
const fields = ['name','description','time'];
const closeBtn = document.querySelector('#close');

async function getActivities(){
    let form = new FormData();
    form.append('date',date);
    form.append('submit',true);
    console.log("this is date",date);
    try{
        const result = await fetch("http://localhost/time-tracking/activities_breakdown.php",{method:"POST",mode:"no-cors", body:form});
        const parsedResults = await result.json();
        for(var i = 0; i < parsedResults.length;i++){
            let name = parsedResults[i]['name'];
            let description = parsedResults[i]['description'];
            let time = parsedResults[i]['time'];
            let tr = document.createElement('tr');
            for(let j = 0; j < fields.length;j++){
                let td = document.createElement('td');
                let textNode = document.createTextNode(parsedResults[i][fields[j]]);
                td.appendChild(textNode);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
                activitiesBreakdDownContainer.classList.remove('activities-breakdown-hide');
        }
    }catch(e){
        console.log("There is an error",e);
    }
}

getActivitiesBtn.addEventListener('click',getActivities);
closeBtn.addEventListener('click',()=>{
    activitiesBreakdDownContainer.classList.add('activities-breakdown-hide');
    tbody.innerHTML="";
})