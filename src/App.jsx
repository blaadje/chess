import React from 'react';
import Board from './Board';
import Player from './Player';
import King from './pieces/King';
import Queen from './pieces/Queen';
import Knight from './pieces/Knight';
import Bishop from './pieces/Bishop';
import Rook from './pieces/Rook';
import Pawn from './pieces/Pawn';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [new Player('black'), new Player('white', true)],
      currentSelectedPiece: null,
    };

    this.setPieces(this.state.players);
  }

  setPieces(players) {
    players.forEach((player) => {
      const color = player.getColor();

      player.setPieces({
        rook: [new Rook({ color }), new Rook({ color })],
        knight: [new Knight({ color }), new Knight({ color })],
        bishop: [new Bishop({ color }), new Bishop({ color })],
        king: [new King({ color })],
        queen: [new Queen({ color })],
        pawn: [
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
          new Pawn({ color }),
        ],
      });
    });
  }

  handleAction = ({ playerId, selectedPiece, hasTakenPiece = false }) => {
    if (!playerId && !selectedPiece) {
      this.setState({ currentSelectedPiece: null });
      return
    }

    const pieceType = selectedPiece?.getType();
    const newPlayers = this.state.players.map((player) => {
      if (hasTakenPiece) {
        if (playerId === player.getId()) {
          player.incrementScore();
          player.setWonPiece(selectedPiece);
        } else {
          player.removePiece(selectedPiece.getId(), pieceType);
        }

        player.toggleCanPlay();
      } else if (this.state.currentSelectedPiece) {
        player.toggleCanPlay();
      }

      return player;
    });

    if (hasTakenPiece) {
      this.setState({ players: newPlayers, currentSelectedPiece: null });
      return;
    }
    this.setState({ players: newPlayers, currentSelectedPiece: selectedPiece });
  };

  handleUpdatePlayers = (players) => {
    this.setState({ players });
  };

  render = () => {
    const playingPlayer = this.state.players.find((player) =>
      player.getCanPlay()
    );

    return (
      <>
        <Board
          onUpdatePlayers={this.handleUpdatePlayers}
          playingPlayer={playingPlayer}
          currentSelectedPiece={this.state.currentSelectedPiece}
          players={this.state.players}
          onAction={this.handleAction}
        />
        <div>
          Playing player: <strong>{playingPlayer.getColor()}</strong>
          <ul>
            {this.state.players.map((player) => {
              return (
                <li key={player.getId()}>
                  <div>
                    {player.getColor()}: {player.getScore()}
                  </div>
                  <div>
                    <div>
                      {player.getWonPieces().map((piece) => {
                        return (
                          <div key={piece.getId()}>
                            <strong>{piece.getType()}</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };
}
