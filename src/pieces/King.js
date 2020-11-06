import Piece from './Piece';
import { getNumericalPositionFromCoordinates, capitalize } from '../utils';
import { blackKing, whiteKing } from '../images';

export default class King extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whiteKing : blackKing;

    super(appearance, color, 'king');
  }

  isDisplacementAllowed({ currentCoordinate, nextCoordinate }) {
    const [currentColumn, currentRow] = getNumericalPositionFromCoordinates(
      currentCoordinate
    );
    const [nextColumn, nextRow] = getNumericalPositionFromCoordinates(
      nextCoordinate
    );

    return (
      nextColumn <= currentColumn + 1 &&
      nextColumn >= currentColumn - 1 &&
      nextRow <= currentRow + 1 &&
      nextRow >= currentRow - 1
    );
  }
}
