/*
AUTHOR: HRITHIKA DODIA
*/ 
/************************************* CALLBACK *******************************/
var getGithubRepoData = (callback) => {
    const request = new XMLHttpRequest();

    // request.open('GET', 'https://developer.github.com/v3/search/');
    // request.send();

    // const response = fetch('https://developer.github.com/v3/search/');
    // console.log(response);

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4 && request.status === 200){
            data = JSON.parse(request.responseText);
            callback(data);
        }

        else if(request.readyState === 4)
            callback('error');
    });
    const queryString = 'q=' + encodeURIComponent('node in:name nodejs/node in:full_name is:public org:nodejs created:2014-11-26');
    request.open('GET', 'https://api.github.com/search/repositories?' + queryString);
    request.send();
}

getGithubRepoData((data) => {
    console.log(data);
});

/*************************************** PROMISE **********************************/
const getGithubRepoDataPromise = () => {
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
        const queryString = 'q=' + encodeURIComponent('node in:name nodejs/node in:full_name is:public org:nodejs created:2014-11-26');
        request.open('GET', 'https://api.github.com/search/repositories?' + queryString);
        request.send();
    });
};

getGithubRepoDataPromise()
    .then(data => {
        console.log('PROMISE');
        console.log(data);
    })
    .catch(err => {
        console.log('error');
    });

/********************************************* ASYNC AWAIT ******************************************/
const getGithubRepoDataAsyncAwait = async () => {
    const queryString = 'q=' + encodeURIComponent('node in:name nodejs/node in:full_name is:public org:nodejs created:2014-11-26');
    const response = await fetch('https://api.github.com/search/repositories?' + queryString);
    const data = await response.json();
    return data;
};

getGithubRepoDataAsyncAwait()
    .then(data => {
        console.log('ASYNC AWAIT');
        console.log(data);
    })
    .catch(err => {
        console.log('error');
    });