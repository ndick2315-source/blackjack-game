export function calcHand(hand) {
  let total = hand.reduce((t, c) => t + c.value, 0);
  let aces = hand.filter(c => c.code.startsWith("A")).length;

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }
  return total;
}

export function dealerShouldHit(hand) {
  return calcHand(hand) < 17;
}

export function checkBlackjack(hand) {
  return hand.length === 2 && calcHand(hand) === 21;
}
