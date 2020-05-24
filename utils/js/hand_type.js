//o arquivo hand_type possui funções para detectar o tipo da mão

//função  que detecta o tipo da mão [royal fulsh, flush....]
function handType(hand){
  try{
    var hand_numbers = [];
    var hand_suits = [];

    for(var i = 0; i < 5; i++ ){
      hand_numbers.push(hand[i].value);
      hand_suits.push(hand[i].suit);
    }
    
    hand_numbers.sort(function(a, b){return a-b});

    if (equalSuits(hand_suits)){
      handName = flushes(hand_numbers);
    } else {
      handName = otherHands(hand_numbers);
    }

    return handName;
  } catch(error){
    throw  error;
  }

}

//verifica se todos os naipes da mão são iguais
function equalSuits(hand){
  try{
    var orderedArray = hand.reduce(function (accumulator, currentValue) {
    if (accumulator.indexOf(currentValue) === -1) {
      accumulator.push(currentValue)
    }
    return accumulator
    }, [])
    return orderedArray.length == 1 ? true : false;
  } catch(error) {
    throw 'Erro ao identificar se a mão possui todos os naipes iguais';
  }
}

//caso os naipes sejam iguais essa função identica o flush
function flushes (hand) {
  try{
    hand.sort(function(a, b){return a-b});
    royal_flush = [10, 11, 12, 13, 14];

    if(JSON.stringify(royal_flush)==JSON.stringify(hand)){
      return 'Royal Flush';
    } 

    return sequence(hand) ? 'Straight flush' : 'Flush'; 
  } catch(error){
    throw 'Erro ao identificar se a mão é um dos Flushes';
  }

}

//verifica se a mão é uma sequência
function sequence(hand){
  try {
    var sequence;

    for ( var i = 0; i < (hand.length-1); i++){
      if ( hand[i] != (hand[i+1]-1 ) ){
          sequence = false;
          break;
      }
      sequence = true;
    }

    return sequence;
  } catch(error){
    throw 'Erro ao idenntificar se a mão é uma sequência';
  } 
}

//aqui é gerado um map com as combinações, ex[um pair e um three of a kind]
function combination(hand){
  try{
    var arr = new Map();
    for(var i = 0; i < hand.length; i++){
      const map1 = hand.map(x => x == hand[i]);
      var combination = map1.filter(x => x == true);
      if(combination.length > 1){
        if(combination.length == 2){
            arr.set(hand[i], 'Pair')
        }else if(combination.length == 3){
            arr.set(hand[i], 'Three of a kind')
        }else if(combination.length == 4){
            arr.set(hand[i], 'Four of a kind');
        }
        i = i + (combination.length - 1);
      }else{
        arr.set(hand[i], '');
      }
    }

    return arr;
  } 
  catch(error){
    throw 'Erro ao retornar as combinações da mão';
  }
}


//essa função retorna os outros tipos de mão
function otherHands(hand){
  try{
    var straight = sequence(hand);
    if (straight){
      return 'Straight';
    }

    var combMap = combination(hand);
    let contP = 0;
    let contT = 0;

    for(let value of combMap.values()){
      if (value == 'Four of a kind'){
        return'Four of a kind';
      } else if (value == 'Three of a kind'){
        contT++;
      } else if (value == 'Pair'){
        contP++;
      }
    }

    if(contP == 2){
      return 'Two Pair';
    } else if (contT == 1 && contP == 1){
      return 'Full House';
    } else if (contT == 1){
      return 'Three of a kind';
    } else if(contP == 1){
      return 'Pair';
    } 

    return 'High card';
  } 
  catch(error){
    throw 'Erro ao identificar as mãos onde apenas os valores da carta influenciam';
  }
}
