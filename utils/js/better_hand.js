//em better hand eu comparo as duas mãos e retorno qual ganha

const poker_hands = ['High card', 'Pair', 'Two Pair', 'Three of a kind', 'Straight', 'Flush', 'Full House', 'Four of a kind', 'Straight flush', 'Royal Flush'];

function betterHand(handOne, handTwo){
    try{
    let oneHand = poker_hands.indexOf(handType(handOne));
    let secHand = poker_hands.indexOf(handType(handTwo));

    if( oneHand == secHand){
        return draw(handOne, handTwo);
    } else if ( oneHand > secHand){
        return 'Player One Wins!';
    } else {
        return 'Player Two Wins!';
    }
    } catch(error) {
        alert(error);
    }
}
