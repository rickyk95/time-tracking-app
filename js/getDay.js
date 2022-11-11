
    var barChart;
    var pieChart;
    var errorMessage = document.getElementById('error-message');
    var totalContainer = document.getElementById("total");
    var date = new Date();
    var currentDay = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const canvasDivs = Array.from(document.querySelectorAll('canvas'));
    async function getDay(e = currentDay){

      if((barChart !== null && barChart !== undefined) || (pieChart !== null && pieChart !== undefined)){
          pieChart.destroy();
          barChart.destroy();
        }
        date = e;
        if(e.currentTarget){
          date = e.currentTarget.innerText.trim();
        }
        let form = new FormData();
        form.append('date',date);
        form.append('submit',true);
        try{
            let result = await fetch("http://localhost/time-tracking/query.php",{method:"POST",mode:"no-cors", body:form});
            let receivedResults = await result.json();
            var table = {
                      "marketing":{
                        amount:0
                      },
                      "website":{
                          amount:0
                      },
                      "meetings":{
                        amount:0
                      }
                    };
              receivedResults.forEach(({name,time})=>{
                table[name]['amount'] === 0 ? table[name]['amount'] = time : table[name]['amount'] = table[name]['amount']+time;
              });
              var total = Object.keys(table).reduce((total,currentValue)=>{
                return table[currentValue]['amount'] + total
              },0);
              const barChartData = {
                      labels: ['Marketing','Website','Meetings'],
                      datasets: [{
                        label: 'Time Tracking',
                        backgroundColor: ['lightblue','gray','blue'],
                        borderColor: 'rgb(255, 99, 132)',
                        data: [(table['marketing']['amount']/60).toFixed(2),(table['website']['amount']/60).toFixed(2),(table['meetings']['amount']/60).toFixed(2)]
                      }]
                    };

                    const barChartConfig = {
                      type: 'bar',
                      data: barChartData,
                      options: {
                        responsive:false
                      }
                    };

                    console.log(table);
                    const pieChartData = {
                      labels:[
                        'Marketing ' + ((table['marketing']['amount']/total)*100).toFixed(2) + "%",
                        'Website ' + ((table['website']['amount']/total)*100).toFixed(2) + "%",
                        'Meetings ' + ((table['meetings']['amount']/total)*100).toFixed(2) + "%"
                      ],
                      datasets:[{
                        label:"Pie Chart Representation",
                        data:[(table['marketing']['amount']/60).toFixed(2),(table['website']['amount']/60).toFixed(2),(table['meetings']['amount']/60).toFixed(2)],
                        backgroundColor: [
                          'lightblue',
                          'gray',
                          'blue'
                        ],
                      }]
                    }
                    const pieChartConfig = {
                      type:'pie',
                      data:pieChartData,
                      options:{responsive:false}
                    }
                   barChart = new Chart(
                    document.getElementById('graph'),
                    barChartConfig
                  );
                   pieChart = new Chart(
                    document.getElementById('graph-2'),
                    pieChartConfig
                  );
                  buttonsContainer.innerHTML="";
                  totalContainer.innerHTML=(total/60).toFixed(2);
                  canvasDivs.forEach((canvasDiv)=>{
                    canvasDiv.style.display="none";
                  })
                    canvasDivs.forEach((canvasDiv)=>{
                      canvasDiv.style.display="block";
                    });
                    errorMessage.style.display="none";  

              }catch(e){
                    errorMessage.style.display='flex';
                    console.log("Error no results",e);
                    // date = new Date();
                    // currentDay = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`;
                    canvasDivs.forEach((canvasDiv)=>{
                      canvasDiv.style.display="none";
                    });
                    totalContainer.innerText='';
              }  
              buttonsContainer.innerHTML="";
              loadRecentDays();
        }

window.onload=getDay(currentDay);