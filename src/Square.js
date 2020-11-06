export default class Square {
  constructor({ position, size, context, isBlack, coordinate }) {
    this.coordinate = coordinate;
    this.isBlack = isBlack;
    this.size = size;
    this.position = position;
    this.context = context;
    this.hovered = false;
    this.active = false;
    this.piece = null;
  }

  removePiece() {
    this.piece = null;

    this.draw();
  }

  getPiece() {
    return this.piece;
  }

  getSize() {
    return this.size;
  }

  getCoordinate() {
    return this.coordinate;
  }

  getPosition() {
    return this.position;
  }

  setHovered(state) {
    this.hovered = state;

    this.draw();
  }

  setActive(state) {
    this.active = state;

    this.draw();
  }

  toggleActive() {
    this.active = !this.active;

    this.draw();
  }

  setPiece(piece) {
    this.piece = piece;

    this.draw();
  }

  getBackgroundColor() {
    if (this.active) {
      return 'green';
    } else if (this.hovered) {
      return 'red';
    } else if (this.isBlack) {
      return 'rgb(218, 138, 48)';
    }

    return 'rgb(255, 206, 149)';
  }

  async draw() {
    this.context.beginPath();
    this.context.fillStyle = this.getBackgroundColor();
    this.context.rect(this.position.x, this.position.y, this.size, this.size);
    this.context.fill();

    // coordinate
    // this.context.font = '12px serif';
    // this.context.fillStyle = !this.isBlack ? 'black' : 'white';
    // this.context.fillText(
    //   this.coordinate,
    //   this.position.x + this.size / 2,
    //   this.position.y + this.size / 2
    // );

    if (!this.piece) {
      return;
    }

    const appearance = await this.piece.getAppearance();

    this.context.drawImage(
      appearance,
      this.position.x + this.size / 2 - appearance.width / 2,
      this.position.y + this.size / 2 - appearance.height / 2
    );
  }
}
