let addBtn = document.querySelector('.add');
let card = document.querySelector('.card');
let overlay = document.querySelector('.overlay');
let closeBtn = document.querySelector('.close');
let createBtn  = document.querySelector('.create1');
let dateDisplay  = document.querySelector('.date');

addBtn.addEventListener('click', function(){
    card.classList.add('active');
    overlay.classList.add('active');
});

overlay.addEventListener('click', function(){
    card.classList.remove('active');
    overlay.classList.remove('active');
});

closeBtn.addEventListener('click', function(){
    card.classList.remove('active');
    overlay.classList.remove('active');
});




// ################ JQUERY #############
// ################ JQUERY #############

let addStatements = $('.add-statements');
let wrapper = $('.problem-statements');
const max = 5;
const min = 2;
let i = 3;

addStatements.on('click', function(e){
    e.preventDefault();
    console.log('clicked');
    if(i<=max)
    {
        console.log(i);
        wrapper.append("<div class='new-div'><label for='problem-'"+i+">Problem Statement "+i+"</label><input style='margin-left: 3px' type='text' id='problem-"+i+"'><span class='remove'>-</span></div>");
        if(i <= max)
        {
            i++;
        }

        let removeStatements = $('.remove');

        removeStatements.on('click', function(e){
            e.preventDefault();
            console.log('clicked');
            $(this).parents('.new-div').remove();
            if(i>min+1)
            {
                i--;
            }
        });
    }

});


let addMetrics = $('.add-metrics');
let wrapper2 = $('.judgement');
let j = 3;

addMetrics.on('click', function(e){
    e.preventDefault();
    console.log('clicked');
    if(j<=max)
    {
        console.log(i);
        wrapper2.append("<div class='metric-main'><label for='metric-"+j+"'>Metric "+j+"</label><input style='margin-left: 3px' type='text' id='metric-"+j+"'><label for='max-score-"+j+"' class='max' style='margin-right: 8px'>Max Score "+j+"</label><input type='number' value='0' id='max-score-'"+j+"><span class='remove-metrics'>-</span></div>")
        if(j <= max)
        {
            j++;
        }

        let removeMetrics = $('.remove-metrics');
        removeMetrics.on('click', function(e){
            e.preventDefault();
            $(this).parents('.metric-main').remove();
            if(j > min+1)
            {
                j--;
            }
        }); 

    }

    
    $(function(){

        $('input[type="number"]').niceNumber();
  
    });
});


$(function(){

    $('input[type="number"]').niceNumber();
  
});

createBtn.addEventListener('click', function(e){
    e.preventDefault();
    let eventName = $('#event-name');
    let totalRounds = $('#rounds');

    let metricz = []
    let metBool = false
    let metNum = 1

    while(!metBool) {
        if(document.querySelector(`#metric-${metNum}`)) {
            console.log($(`#metric-${metNum}`))
            metricz.push({
                metricName: $(`#metric-${metNum}`).val(),
                maxScore: $(`#max-score-${metNum}`).val()
            })
            metNum += 1
        }else {
            metBool = true
        }
    }


    
    let problemStatements = []
    let plBool = false
    let plNum = 1

    while(!plBool) {
        if(document.querySelector(`#problem-${plNum}`)) {
            problemStatements.push($(`#problem-${plNum}`).val())
            plNum += 1
        }else {
            plBool = true
        }
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", sessionStorage.getItem("admin-token"));

    let data = {
        name: eventName.val(),
        metric: metricz,
        rounds: totalRounds.val(),
        problemStatements: problemStatements
    };

    console.log(data)

    let raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      fetch("https://hackjudge-api.herokuapp.com/events", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
      })
      .catch(error => console.log('error', error));

});

function goToReview(str) {
    console.log(str)
}

window.onload = function() {
    fetch("https://hackjudge-api.herokuapp.com/events", {
        headers: new Headers({
            "Authorization":sessionStorage.getItem("admin-token")
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        var hol = document.getElementById("event-holder")
        inner = ''
        result.forEach(el => {
            inner += `
                <div class="event-1"> 
                    <h1>${el.name}<span class="date">Date</span></h1>

                    <div class="event-detail-holder">
                        <div class="event-detail-child">
                            <div class="teams">
                                <p>No. of Enrolled Teams - <span class="number">100</span></p>
                            </div>
                
                            <div class="reviews">
                                <p>No. of Reviews - <span class="number">${el.rounds}</span></p>
                            </div>
                        </div>
                        <div class="view">
                            <button onClick="goToReview(${})">View <i class="fa fa-angle-right"></i></button>
                        </div>
                    </div>
                </div>
            `
        });
        hol.innerHTML=inner
    })
    .catch(error => console.log('error', error));
}
