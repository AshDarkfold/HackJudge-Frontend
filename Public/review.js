

$(function(){

    $('input[type="number"]').niceNumber();
    
    fetch("https://hackjudge-api.herokuapp.com/evaluate/", {
        headers: new Headers({
            "Authorization":sessionStorage.getItem('admin-token')
        })
    })
    .then(res=>res.json)
    .then(data=> {
        console.log(data)
    })
    .catch(err=>console.error(err))

});
