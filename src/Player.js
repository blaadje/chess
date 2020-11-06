import { generateId } from './utils';
export default class Player {
  constructor(color, canPlay = false) {
    this.pieces = {
      rook: [],
      knight: [],
      bishop: [],
      king: [],
      queen: [],
      pawn: [],
    };
    this.wonPieces = []
    this.score = 0;
    this.canPlay = canPlay;
    this.color = color;
    this.id = generateId();
  }

  getCanPlay() {
    return this.canPlay;
  }

  toggleCanPlay() {
    this.canPlay = !this.canPlay;
  }

  getScore() {
    return this.score;
  }

  getId() {
    return this.id;
  }

  incrementScore() {
    this.score = this.score + 1;
  }

  getColor() {
    return this.color;
  }

  getPieces() {
    return this.pieces;
  }

  getWonPieces() {
    return this.wonPieces;
  }

  setPieces(pieces) {
    this.pieces = pieces;
  }

  removePiece(pieceId, type) {
    this.pieces[type] = this.pieces[type].filter(piece => piece.getId() !== pieceId)
  }

  setWonPiece(piece) {
    this.wonPieces = [...this.wonPieces, piece];
  }
}
