import blackBishopImage from './black/bishop.svg';
import blackKingImage from './black/king.svg';
import blackKnightImage from './black/knight.svg';
import blackPawnImage from './black/pawn.svg';
import blackQueenImage from './black/queen.svg';
import blackRookImage from './black/rook.svg';
import whiteBishopImage from './white/bishop.svg';
import whiteKingImage from './white/king.svg';
import whiteKnightImage from './white/knight.svg';
import whitePawnImage from './white/pawn.svg';
import whiteQueenImage from './white/queen.svg';
import whiteRookImage from './white/rook.svg';
import { loadImageWithPromise } from '../utils';

const width = 45;
const height = 45;

const blackBishop = (async () =>
  await loadImageWithPromise(blackBishopImage, width, height))();

const whiteBishop = (async () =>
  await loadImageWithPromise(whiteBishopImage, width, height))();

const blackKing = (async () =>
  await loadImageWithPromise(blackKingImage, width, height))();

const whiteKing = (async () =>
  await loadImageWithPromise(whiteKingImage, width, height))();

const blackKnight = (async () =>
  await loadImageWithPromise(blackKnightImage, width, height))();

const whiteKnight = (async () =>
  await loadImageWithPromise(whiteKnightImage, width, height))();

const blackPawn = (async () =>
  await loadImageWithPromise(blackPawnImage, width, height))();

const whitePawn = (async () =>
  await loadImageWithPromise(whitePawnImage, width, height))();

const blackQueen = (async () =>
  await loadImageWithPromise(blackQueenImage, width, height))();

const whiteQueen = (async () =>
  await loadImageWithPromise(whiteQueenImage, width, height))();

const blackRook = (async () =>
  await loadImageWithPromise(blackRookImage, width, height))();

const whiteRook = (async () =>
  await loadImageWithPromise(whiteRookImage, width, height))();

export {
  blackBishop,
  whiteBishop,
  blackKing,
  whiteKing,
  blackKnight,
  whiteKnight,
  blackPawn,
  whitePawn,
  blackQueen,
  whiteQueen,
  blackRook,
  whiteRook
};
