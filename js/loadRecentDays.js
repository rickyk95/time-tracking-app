

var buttonsContainer = document.body.querySelector('#buttons-container');
var currentDate;
var currentYear;
var currentMonth;
var day;
var today;
var button;

function isFirstDayOfMonth(date){ 
    if(date === 0){
      console.log('kfisodfj')
      return true;
    }else{

    }
}
function loadRecentDays(){
    currentDate = new Date();
    currentMonth = currentDate.getMonth()+1;
    day = currentDate.getDate();
    for(let i = 0 ;i < 7; i++){
      if(isFirstDayOfMonth(day)){
        currentMonth = currentMonth-1;
        switch(currentMonth){
        	case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
          day = 31
          break;
          case 2:
          day = 28;
          break;
          default:
          day = 30;
          break;
        }
      }
      today = `${currentDate.getFullYear()}-${currentMonth}-${day}`;
      day--;
            button = document.createElement('button');
            button.appendChild(document.createTextNode(today));
            button.addEventListener('click',(e)=>{
                getDay(e);
              });
            buttonsContainer.appendChild(button);
          } 
  }

window.onload=loadRecentDays;
