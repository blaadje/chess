import React from 'react';
import Square from './Square';
import { letterCoordinates, piecesPlacementsBySide } from './utils';

export default class Board extends React.Component {
  constructor() {
    super();

    this.shouldCheckMouse = false;
    this.context = null;
    this.width = 600;
    this.height = 600;
    this.projectionX = this.width / 2;
    this.projectionY = this.height / 2;
    this.squares = {};
    this.lineAmount = letterCoordinates.length;
    this.hoveredSquare = null;
  }

  squaresArray = () => Object.values(this.squares);

  componentDidMount() {
    const canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.context.translate(this.projectionX, this.projectionY);

    canvas.width = this.width;
    canvas.height = this.height;

    this.init();
  }

  init() {
    for (let y = 0; y < this.lineAmount; y++) {
      for (let x = 0; x < this.lineAmount; x++) {
        const size = this.width / this.lineAmount;
        const coordinate = `${letterCoordinates[x]}${this.lineAmount - y}`;
        const square = new Square({
          size,
          position: { x: size * x, y: size * y },
          coordinate,
          context: this.context,
          isBlack: (y + x) % 2 === 0,
        });
        this.squares[coordinate] = square;

        square.draw();
      }
    }

    this.createTeams(this.props.players);
  }

  createTeams(players) {
    piecesPlacementsBySide.forEach((side, index) => {
      Object.entries(side).forEach(([coordinate, pieceType]) => {
        const player = players[index];
        const pieces = player.getPieces()[pieceType];
        const hasMultiplePiece = pieces.length > 1;

        if (hasMultiplePiece) {
          const piece = pieces.find((piece) => !piece.getCoordinate());

          piece.setCoordinate(coordinate);
          this.squares[coordinate].setPiece(piece);
          return;
        }

        const piece = player.getPieces()[pieceType][0];

        piece.setCoordinate(coordinate);
        this.squares[coordinate].setPiece(piece);
      });
    });

    this.props.onUpdatePlayers(players);
  }

  mouseEnter = () => {
    this.shouldCheckMouse = true;
  };

  mouseLeave = () => {
    this.shouldCheckMouse = false;
  };

  mouseMove = ({ clientX, clientY }) => {
    if (!this.shouldCheckMouse) {
      return;
    }

    this.squaresArray().forEach((square) => {
      const position = square.getPosition();
      const size = square.getSize();
      const currentSquare =
        clientX >= position.x &&
        clientX <= position.x + size &&
        clientY >= position.y &&
        clientY <= position.y + size;

      if (!currentSquare) {
        return;
      }

      this.hoveredSquare?.setHovered(false);
      this.hoveredSquare = square;
      square.setHovered(true);
    });
  };

  playerByColor(color) {
    return this.props.players.find((player) => player.getColor() === color);
  }

  mouseClick = ({ clientX, clientY }) => {
    const squares = this.squaresArray();
    const index = squares.findIndex((square) => {
      const position = square.getPosition();
      const size = square.getSize();

      return (
        clientX >= position.x &&
        clientX <= position.x + size &&
        clientY >= position.y &&
        clientY <= position.y + size
      );
    });
    // @TODO: checker les autres squares pas selectionnes qui sont actives
    const unselectedSquares = squares.slice();
    const [selectedSquare] = unselectedSquares.splice(index, 1);
    const selectedPiece = selectedSquare.getPiece();

    // cas ou on a pas de piece deja selectionnee
    if (!this.props.currentSelectedPiece) {
      // cas ou le joueur clic sur une case vide
      if (!selectedPiece) {
        return
      }
      // cas ou le joueur actif selectionne une piece de l'adversaire
      if (
        this.props.playingPlayer.getId() !==
        this.playerByColor(selectedPiece.getColor()).getId()
      ) {
        return;
      }

      selectedSquare.removePiece();
      selectedSquare.setActive(true);
      this.props.onAction({
        playerId: this.playerByColor(selectedPiece?.getColor()).getId(),
        selectedPiece: selectedPiece,
      });
    }

    // cas ou on a deja une piece selectionnee
    if (this.props.currentSelectedPiece) {
      // cas ou le mec annule son deplacement
      if(selectedSquare?.getCoordinate() === this.props.currentSelectedPiece.getCoordinate()) {
        this.props.currentSelectedPiece.setCoordinate(selectedSquare.getCoordinate())
        selectedSquare.setPiece(this.props.currentSelectedPiece);
        selectedSquare.setActive(false);
        this.props.onAction({
          playerId: null,
          selectedPiece: null,
        });
      }
      // cas ou le mec effectue un deplacement non autorise
      if (
        !this.props.currentSelectedPiece.isDisplacementAllowed({
          currentCoordinate: this.props.currentSelectedPiece.getCoordinate(),
          nextCoordinate: selectedSquare.getCoordinate(),
          willTakePiece: Boolean(selectedPiece)
        })
      ) {
        return;
      }

      // cas ou le mec clique sur une case avec son pion
      if (
        this.props.currentSelectedPiece.getColor() === selectedPiece?.getColor()
      ) {
        return;
      }

      // cas ou le mec prend le pion de l'adversaire
      if (selectedPiece) {
        this.props.onAction({
          playerId: this.playerByColor(
            this.props.currentSelectedPiece?.getColor()
          ).getId(),
          selectedPiece: selectedPiece,
          hasTakenPiece: true,
        });
        this.props.currentSelectedPiece.setCoordinate(selectedSquare.getCoordinate())
        selectedSquare.setPiece(this.props.currentSelectedPiece);
      }

      // cas ou le mec clique sur une case vide
      if (!selectedPiece) {
        this.props.onAction({
          playerId: this.playerByColor(
            this.props.currentSelectedPiece?.getColor()
          ).getId(),
        });
        this.props.currentSelectedPiece.setCoordinate(selectedSquare.getCoordinate())
        selectedSquare.setPiece(this.props.currentSelectedPiece);
      }
    }

    // on reset les autres cases
    unselectedSquares.forEach((square) => {
      square.setActive(false);
    });
  };

  render = () => (
    <canvas
      onMouseEnter={this.mouseEnter}
      onMouseMove={this.mouseMove}
      onMouseLeave={this.mouseLeave}
      onClick={this.mouseClick}
      id="canvas"
    />
  );
}
