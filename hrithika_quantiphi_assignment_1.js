/*
AUTHOR: HRITHIKA DODIA
*/

// const response = fetch('./battles.json');
// console.log(response);

const getBattlesInfo = async () => {
    const response = await fetch('http://127.0.0.1:5500/battles.json');
    const data = await response.json();
    return data;
};

getBattlesInfo()
    .then(data => {
        console.log(data);
        result = {
            'most_active':{},
            'attacker_outcome': {},
            'defender_size': {}
        };
        most_active_attacker = getMostFrequent(data, 'attacker_king');
        most_active_defender = getMostFrequent(data, 'defender_king');
        outcome_obj = getAttackerOutcome(data, most_active_attacker);
        defender_obj = getDefenderSize(data, most_active_defender);

        result['most_active']['attacker_king'] = most_active_attacker;
        result['most_active']['defender_king'] = most_active_defender;
        result['most_active']['region'] = getMostFrequent(data, 'region');
        result['most_active']['name'] = getMostFrequent(data, 'name');
        result['attacker_outcome']['win'] = outcome_obj['win'];
        result['attacker_outcome']['loss'] = outcome_obj['loss'];
        result['defender_size']['min'] = defender_obj['min'];
        result['defender_size']['max'] = defender_obj['max'];
        result['defender_size']['average'] = defender_obj['average'];
        result['battle_type'] = getBattleType(data);
        
        console.log(result);
    })
    .catch(err => {
        console.log('error');
    });


const getMostFrequent = (data, key) => {
    king_obj = {};
    
    if(!['attacker_king', 'defender_king', 'name', 'region'].includes(key))
        return 'Invalid Input';

    for(let element in data){
        if(king_obj.hasOwnProperty(data[element][key])){
            king_obj[data[element][key]] ++;
        }
        else{
            king_obj[data[element][key]] = 1;
        }
    }

    var most_frequent;
    var max_count = 0;

    for(let element in king_obj){
        // console.log(`${element} : ${king_obj[element]}`);
        if(king_obj[element] > max_count){
            most_frequent = element;
            max_count = king_obj[element];
        }
    }

    return most_frequent;
}

const getAttackerOutcome = (data, attacker) => {
    var win = 0;
    var loss = 0;
    for(let element in data){
        if(data[element]['attacker_king'] === attacker){
            if(data[element]['attacker_outcome'] === 'win')
                win++;
            else if(data[element]['attacker_outcome'] === 'loss')
                loss++;
        }
    }
    return {'win': win, 'loss': loss};
}

const getDefenderSize = (data, defender) => {
    var sum = 0;
    var max = -Infinity;
    var min = Infinity;
    var count = 0;

    for(let element in data){
        if(data[element]['defender_king'] === defender){
            var size = data[element]['defender_size'];
            if(size == null)
                continue;
            sum += size;
            if(size < min)
                min = size;
            else if(size > max)
                max = size;
            count ++;
        }
    }
    return {'min': min, 'max': max, 'average': sum / count};
}

const getBattleType = data => {
    var battles = new Set();
    for(let element in data){
        if(data[element]['battle_type'] != "")
            battles.add(data[element]['battle_type']);
    }
    // console.log(battles);
    return battles;
}


// const request = new XMLHttpRequest();

// request.addEventListener('readystatechange', () => {
//     if(request.readyState === 4 && request.status === 200){
//         data = JSON.parse(request.responseText);
//         console.log(data);
//     }

//     else if(request.readyState === 4)
//         console.log('error');
// });
// request.open('GET', './battles.json');
// request.send();