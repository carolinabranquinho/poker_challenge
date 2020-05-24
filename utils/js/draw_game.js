//draw_game é destinado aos casos de empate


//nessa fução separamos para ver qual função é necessária chamar, isso depende do handType
function draw(handOne, handTwo){
    try{
        var hand_numbers1 = [];
        var hand_numbers2 = [];

        for(var i = 0; i < 5; i++ ){
            hand_numbers1.push(handOne[i].value);
            hand_numbers2.push(handTwo[i].value);
        }

        var typeHand = handType(handOne);
        var oneMap = combination(hand_numbers1);
        var secMap = combination(hand_numbers2);
        if( typeHand == 'Royal Flush'){
            return 'Draw'
        } else if( typeHand === 'Full House' ){
            let three = greaterCardMap('Three of a kind', oneMap, secMap);
            return three == 'Draw' ? greaterCardMap('Pair', oneMap, secMap) : three;
        } else if ( typeHand === 'Four of a kind' ){
            return greaterCardMap('Four of a kind', oneMap, secMap);
        } else if ( typeHand === 'Three of a kind' ){
            return greaterCardMap('Three of a kind', oneMap, secMap);
        } else if ( typeHand == 'Two Pair' ) {
            return greaterCardMap ('Pair', oneMap, secMap);
        } else if ( typeHand == 'Pair' ){
            return greaterCardMap('Pair', oneMap, secMap);
        } else if ( typeHand == 'Straight' || typeHand == 'Straight flush' || typeHand == 'High card' || typeHand == 'Flush'){
            return greaterCard(hand_numbers1, hand_numbers2);
        } 
    } catch(error){
        error;
    }
}

//função de desempate para maps onde é necessário verificar trinca, dupla por ex, antes da carta alta
function greaterCardMap(type, oneMap, secMap){
    try {
        let one = [], two = [];
        let oneSingleCards = [], twoSingleCards = [];

        for (let [key, value] of oneMap.entries()){
            if (value == type){
                one.push(key);
            }else if(value == ""){
                oneSingleCards.push(key);
            }
        }

        for (let [key, value] of secMap.entries()){
            if(value == type){
                two.push(key);
            }else if(value == ""){
                twoSingleCards.push(key);
            }
        }

        if (one.length > 1) {
            if( one[1] != two[1] ){
                return resolveDrawCards(one[1],two[1]);
            }else if(one[0] != two[0]){
                return resolveDrawCards(one[0],two[0]);
            } else {
                if(oneSingleCards[0] != twoSingleCards[0]){
                    return resolveDrawCards(oneSingleCards[0],twoSingleCards[0]);
                }else{
                    return 'Draw';
                }
            }
        } else if (one[0] != two[0]){
            return resolveDrawCards(one[0],two[0]); 
        } else if (oneSingleCards.length > 0){
            oneSingleCards.sort(function(a, b){return a+b});
            twoSingleCards.sort(function(a, b){return a+b});
            for(let i = 0;i < oneSingleCards.length; i++){
                if(oneSingleCards[i] != twoSingleCards[i]){
                    return resolveDrawCards(oneSingleCards[i],twoSingleCards[i]);
                }
            }
            return 'Draw';
        } 
        return 'Draw';
    } catch(error){
        throw 'Erro no critério de desempate';
    }
}


function resolveDrawCards(numberOne,numberTwo){
    if (numberOne > numberTwo){
        return 'Player one wins';
    }else{
        return 'Player two wins';
    }
}

//essa função é basicamente para critério de desempate de sequências onde apenas cartas maiores contam 
function greaterCard(oneHand, secHand){
    try{
        var oneH = oneHand.sort(function(a, b){return a+b});
        var secH = secHand.sort(function(a, b){return a+b});
        for(let i = 0;i < oneH.length; i++){
            if(oneH[i] != secH[i]){
                return resolveDrawCards(oneH[i],secH[i]);
            }
        }
        return 'Draw';

    } catch(error){
        throw 'Erro no critério de desempate - carta alta (mãos com sequência)';
    }
}
