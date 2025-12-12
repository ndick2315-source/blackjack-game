export const rooms = new Map();

export function getRoom(id) {
  if (!rooms.has(id)) {
    rooms.set(id, {
      players: {},
      deck: null,
      dealer: [],
      started: false
    });
  }
  return rooms.get(id);
}
