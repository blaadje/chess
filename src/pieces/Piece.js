import { generateId } from '../utils';
export default class Piece {
  constructor(appearance, color, type) {
    this.appearance = appearance;
    this.type = type
    this.color = color;
    this.coordinate = null;
    this.hasMoved = false;
    this.id = generateId();
    this.coordinateHistory = []
  }

  getHasMoved() {
    return this.coordinateHistory.length > 1
  }

  getId() {
    return this.id
  }

  getColor() {
    return this.color;
  }

  getType() {
    return this.type;
  }

  getAppearance() {
    return this.appearance;
  }

  getCoordinate() {
    return this.coordinate;
  }

  setCoordinate(coordinate) {
    this.coordinateHistory = [...this.coordinateHistory, coordinate]
    this.coordinate = coordinate;
  }
}
