import Piece from './Piece';
import { getNumericalPositionFromCoordinates, capitalize } from '../utils';
import { blackPawn, whitePawn } from '../images';

export default class Pawn extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whitePawn : blackPawn;
    super(appearance, color, 'pawn');
  }

  isDisplacementAllowed({ currentCoordinate, nextCoordinate, willTakePiece = false }) {
    const [currentColumn, currentRow] = getNumericalPositionFromCoordinates(
      currentCoordinate
    );
    const [nextColumn, nextRow] = getNumericalPositionFromCoordinates(
      nextCoordinate
    );
    const isGoingUp = this.getColor() === 'white';

    if (this.getHasMoved()) {
      if (willTakePiece) {
        console.log('willTakePiece', willTakePiece);
        if (isGoingUp) {
          return (
            nextRow === currentRow + 1 &&
            (nextColumn === currentColumn - 1 ||
              nextColumn === currentColumn + 1)
          );
        }

        return (
          nextRow === currentRow - 1 &&
          (nextColumn === currentColumn - 1 || nextColumn === currentColumn + 1)
        );
      }

      if (isGoingUp) {
        return nextRow === currentRow + 1 && nextColumn === currentColumn;
      }

      return nextRow === currentRow - 1 && nextColumn === currentColumn;
    }

    if (isGoingUp) {
      return nextRow <= currentRow + 2 && nextColumn === currentColumn;
    }

    return nextRow >= currentRow - 2 && nextColumn === currentColumn;
  }
}
