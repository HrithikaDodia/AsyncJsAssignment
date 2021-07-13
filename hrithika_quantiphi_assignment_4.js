/*
AUTHOR: HRITHIKA DODIA
*/

/******************************* ASYNC-AWAIT *********************************/
const getFlightDataAsyncAwait = async () => {
    const response = await fetch('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json');
    const data = await response.json();
    return data;
}

getFlightDataAsyncAwait()
    .then(data => {
        console.log('ASYNC AWAIT');
        console.log(data);
        getCleanStatistics(data);
    })
    .catch(err => {
        console.log('error');
    });

/******************************** PROMISE *************************************/
const getFlightDataPromise = () => {
    
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if(request.readyState === 4 && request.status === 200){
                data = JSON.parse(request.responseText);
                resolve(data);
            }

            else if(request.readyState === 4)
                reject('error');
        });

        request.open('GET', 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json');
        request.send();

    });
};


getFlightDataPromise()
    .then(data => {
        console.log('PROMISE');
        getCleanStatistics(data);
    })
    .catch(err => {
        console.log(err);
    });


/******************************** CLEAN DATA *********************************/
const getCleanStatistics = data => {
    clean_data = {'onTime': 0, 'delayed': 0, 'cancelled': 0, 'diverted': 0, 'total': 0};
    for(let element in data){
        let stats = data[element]['Statistics']['Flights'];
        clean_data['onTime'] += stats['On Time'];
        clean_data['diverted'] += stats['Diverted'];
        clean_data['delayed'] += stats['Delayed'];
        clean_data['cancelled'] += stats['Cancelled'];
        clean_data['total'] += stats['Total'];
    }
    let sum = 0;
    for(let element in clean_data){
        if(element != 'total')
            sum += clean_data[element];
    }
    console.log(clean_data);
    console.log(`Is sum equal to total? ${sum === clean_data.total}`);
}