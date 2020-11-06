export const letterCoordinates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export const piecesPlacementsBySide = [
  {
    A8: 'rook',
    B8: 'knight',
    C8: 'bishop',
    D8: 'king',
    E8: 'queen',
    F8: 'bishop',
    G8: 'knight',
    H8: 'rook',
    A7: 'pawn',
    B7: 'pawn',
    C7: 'pawn',
    D7: 'pawn',
    E7: 'pawn',
    F7: 'pawn',
    G7: 'pawn',
    H7: 'pawn',
  },
  {
    A1: 'rook',
    B1: 'knight',
    C1: 'bishop',
    D1: 'king',
    E1: 'queen',
    F1: 'bishop',
    G1: 'knight',
    H1: 'rook',
    A2: 'pawn',
    B2: 'pawn',
    C2: 'pawn',
    D2: 'pawn',
    E2: 'pawn',
    F2: 'pawn',
    G2: 'pawn',
    H2: 'pawn',
  },
];

export const getNumericalPositionFromCoordinates = (coordinates) => {
  const [column, row] = coordinates;

  return [
    Number(letterCoordinates.findIndex((item) => item === column) + 1),
    Number(row),
  ];
};

export const capitalize = (string) => {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
};

export const loadImageWithPromise = (src, width, height) =>
  new Promise((resolve) => {
    const image = new Image(width, height);
    image.onload = () => {
      resolve(image);
    };

    image.src = src;
  });

export const generateId = () => {
  let d = new Date().getTime();

  d += window.performance.now();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);

    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
