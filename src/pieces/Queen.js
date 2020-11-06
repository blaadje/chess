import Piece from './Piece';
import { getNumericalPositionFromCoordinates, capitalize } from '../utils';
import { blackQueen, whiteQueen } from '../images';

export default class Queen extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whiteQueen : blackQueen;
    super(appearance, color, 'queen');
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
      nextColumn === currentColumn ||
      nextRow === currentRow ||
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
