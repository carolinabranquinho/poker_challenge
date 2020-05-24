//random_hand é para a geração da mão aleatória

//função responsavel por gerar random a mão
function randomHand(){
    try{
        var hand = [];

        while(hand.length != 5){
            var card = generateCard();
            if(hand.length > 0 && !cardRepeat(card, hand)){
                hand.push(card);
            } else if (hand.length == 0){
              hand.push(card);
            }
        }

        return hand;
    } catch(error){
        throw error;
    }
}

//verifico se carta é repetida na mão
function cardRepeat(card, hand){
  for(var i = 0; i < hand.length; i++){
    if(hand[i].value == card.value && hand[i].suit == card.suit){
        return true;
      }
  }
  return false;        
}

//gero uma carta aleatória
function generateCard(){
    var suit = ['hearts', 'diamonds', 'clubs', 'spades'];
    var value = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];

    var card = {value: value[Math.floor(Math.random()*value.length)],  suit: suit[Math.floor(Math.random()*suit.length)]}
    return card;
}


function turnObj(hand){
    try{
        var arr = [];

        for (var i = 0; i < 5; i++){
            var obj = {value: hand[0][i], suit: hand[1][i]};
            arr.push(obj);
        }

        return arr; 
    } catch(error){
        throw 'Erro ao tornar a mão um objeto';
    }      
}