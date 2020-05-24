//o arquivo index é destinado ao front, apenas para imprimir a mão e quem ganhou

var buttonPlayerOne = document.querySelector('#player1 button');
var buttonPlayerTwo = document.querySelector('#player2 button');
var buttonCompare = document.getElementById('btnCompare');

function writeHand(id, hands, result, player){
    var obj = turnObjPrint(hands);
    var listElement = document.querySelector(id);
    listElement.innerHTML = '';

    for ( var i = 0; i < 5; i++ ){
        var listItem = document.createElement('li');
        var listText = document.createTextNode(obj[i].value + ' ');
        var listSuit = document.createTextNode(obj[i].suit);

        listItem.appendChild(listText);
        listItem.appendChild(listSuit);
        listElement.appendChild(listItem);
        listElement.style.display = 'block';
    }

    var hand = document.getElementById(player);
    var text = document.createElement('p');
    var textRes = document.createTextNode('Hand type: ' + result);
    text.appendChild(textRes);
    hand.appendChild(text);

}

function writeResult(result){
    var element = document.getElementById('result');

    var text = document.createElement('h1');
    var textRes = document.createTextNode(result);
    text.appendChild(textRes);
    element.appendChild(text);
}

function turnObjPrint(hand){
    for (var i = 0; i < 5; i ++){
        switch(hand[i].suit){
            case 'hearts':
                hand[i].suit = '♥️';
                break;
            case 'diamonds':
                hand[i].suit = '♦️';
                break;
            case 'clubs':
                hand[i].suit = '♣️';
                break;
            case 'spades':
                hand[i].suit = '♠️';
                break;
        }

        if(hand[i].value > 10){
            switch(hand[i].value){
                case 11:
                    hand[i].value = 'J';
                    break;
                case 12:
                    hand[i].value = 'Q';
                    break;
                case 13:
                    hand[i].value = 'K';
                    break;
                case 14:
                    hand[i].value = 'A';
                    break;
            }
        }
    }

    return hand;
}

var handOne = randomHand();
var handTwo = randomHand();
var handTypeOne = handType(handOne);
var handTypeTwo = handType(handTwo);
var result = betterHand(handOne,handTwo);

buttonPlayerOne.addEventListener('click', function(){
    buttonPlayerOne.disabled = true;
    writeHand('#cardListOne', handOne, handTypeOne, 'player1');
});


buttonPlayerTwo.addEventListener('click', function(){
    buttonPlayerTwo.disabled = true;
    writeHand('#cardListTwo', handTwo, handTypeTwo, 'player2');
});


buttonCompare.addEventListener('click', function(){
    var cardsOne = document.getElementById('cardListOne').children.length;
    var cardsTwo = document.getElementById('cardListTwo').children.length;
    if(cardsOne > 0 && cardsTwo > 0)
        writeResult(result);
});