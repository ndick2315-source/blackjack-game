export function createDeck() {
  const suits = ["S", "H", "D", "C"];
  const values = [
    ["A", 11], ["2", 2], ["3", 3], ["4", 4],
    ["5", 5], ["6", 6], ["7", 7], ["8", 8],
    ["9", 9], ["10", 10], ["J", 10], ["Q", 10], ["K", 10]
  ];

  let deck = [];

  for (const suit of suits) {
    for (const [v, p] of values) {
      deck.push({ code: `${v}${suit}`, value: p });
    }
  }

  return deck.sort(() => Math.random() - 0.5);
}
