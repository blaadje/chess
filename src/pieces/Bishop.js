import Piece from './Piece';
import { getNumericalPositionFromCoordinates } from '../utils';
import { blackBishop, whiteBishop } from '../images';

export default class Bishop extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whiteBishop : blackBishop;

    super(appearance, color, 'bishop');
  }

  isDisplacementAllowed({ currentCoordinate, nextCoordinate }) {
    const [currentColumn, currentRow] = getNumericalPositionFromCoordinates(
      currentCoordinate
    );
    const [nextColumn, nextRow] = getNumericalPositionFromCoordinates(
      nextCoordinate
    );
    const difference = nextColumn - currentColumn;

    return (
      (nextColumn === currentColumn + difference &&
        nextRow === currentRow + difference) ||
      (nextColumn === currentColumn + difference &&
        nextRow === currentRow - difference) ||
      (nextColumn === currentColumn - difference &&
        nextRow === currentRow + difference) ||
      (nextColumn === currentColumn - difference &&
        nextRow === currentRow - difference) ||
      (nextColumn === currentColumn - difference &&
        nextRow === currentRow - difference) ||
      (nextColumn === currentColumn + difference &&
        nextRow === currentRow + difference)
    );
  }
}
