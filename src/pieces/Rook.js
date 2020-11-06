import Piece from './Piece';
import { getNumericalPositionFromCoordinates, capitalize } from '../utils';
import { blackRook, whiteRook } from '../images';

export default class Rook extends Piece {
  constructor({ color }) {
    const appearance = color === 'white' ? whiteRook : blackRook;
    super(appearance, color, 'rook');
  }

  isDisplacementAllowed({ currentCoordinate, nextCoordinate }) {
    const [currentColumn, currentRow] = getNumericalPositionFromCoordinates(
      currentCoordinate
    );
    const [nextColumn, nextRow] = getNumericalPositionFromCoordinates(
      nextCoordinate
    );

    return nextColumn === currentColumn || nextRow === currentRow;
  }
}
