import Piece from './Piece';
import { getNumericalPositionFromCoordinates, capitalize } from '../utils';
import { blackKnight, whiteKnight } from '../images';

export default class Knight extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whiteKnight : blackKnight;

    super(appearance, color, 'knight');
  }

  isDisplacementAllowed({ currentCoordinate, nextCoordinate }) {
    const [currentColumn, currentRow] = getNumericalPositionFromCoordinates(
      currentCoordinate
    );
    const [nextColumn, nextRow] = getNumericalPositionFromCoordinates(
      nextCoordinate
    );

    return (
      (nextColumn === currentColumn + 1 && nextRow === currentRow + 2) ||
      (nextColumn === currentColumn + 1 && nextRow === currentRow - 2) ||
      (nextColumn === currentColumn + 2 && nextRow === currentRow + 1) ||
      (nextColumn === currentColumn + 2 && nextRow === currentRow - 1) ||
      (nextColumn === currentColumn - 1 && nextRow === currentRow - 2) ||
      (nextColumn === currentColumn - 1 && nextRow === currentRow + 2) ||
      (nextColumn === currentColumn - 2 && nextRow === currentRow - 1) ||
      (nextColumn === currentColumn - 2 && nextRow === currentRow + 1)
    );
  }
}
