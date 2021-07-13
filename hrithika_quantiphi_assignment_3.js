/*
AUTHOR: HRITHIKA DODIA
*/
/************************************** PROMISE ****************************************/
var getNobelPrizeData = function(){

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200){
                data = JSON.parse(request.responseText);
                // console.log(data);
                resolve(data);
            }

            else if(request.readyState === 4)
                reject('error');
        });

        request.open('GET', 'http://api.nobelprize.org/v1/prize.json');
        request.send();

    });
};

var cleanedNoblePrizeData = function(data, year1, year2, category){

    clean_data = [];

    if(year1 && year2){
        for(let element in data['prizes']){
            year = data['prizes'][element]['year'];
            if(year >= year1 && year <= year2){
                clean_data.push(data['prizes'][element]);
            }
        }
        // console.log(clean_data);
        // for(let element in data['prizes']){
        //     console.log(data['prizes'][element]);
        // }
    }
    
    else if(category){
        for(let element in data){
            obj_category = data[element]['category'];        
            if(obj_category == category){
                clean_data.push(data[element]);
            }
        }
    }

    return clean_data;
}


getNobelPrizeData().then(data => {
    year_wise = cleanedNoblePrizeData(data, 2000, 2019, undefined);
    category_wise = cleanedNoblePrizeData(year_wise, undefined, undefined, 'chemistry');
    console.log('PROMISE');
    console.log(year_wise);
    console.log(category_wise);
    document.getElementById('year').innerHTML = JSON.stringify(year_wise);
    document.getElementById('category').innerHTML = JSON.stringify(category_wise);
}).catch(err => {
    console.log(err);
});


/********************************************** ASYNC - AWAIT **************************************************/

const getNobelPrizeDataAsyncAwait = async () => {
    const response = await fetch('http://api.nobelprize.org/v1/prize.json');
    const data = await response.json();
    return data;
}

getNobelPrizeDataAsyncAwait()
    .then(data => {
        year_wise = cleanedNoblePrizeData(data, 2000, 2019, undefined);
        category_wise = cleanedNoblePrizeData(year_wise, undefined, undefined, 'chemistry');
        console.log('ASYNC-AWAIT')
        console.log(year_wise);
        console.log(category_wise);
    })
    .catch(err => {
        console.log('error');
    });
