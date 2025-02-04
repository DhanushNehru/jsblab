import { INPUT_EVENT_TYPE, Chessboard } from "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/src/Chessboard.js";
import { Markers } from "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/src/extensions/markers/Markers.js";
import { BoardActionsDropdown, HistoryButtons, OpeningTable, SanMovesInline } from '../src/index.js';

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

let movetext = '1.e4 e5 2.Nf3';

let fen = [
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -',
  'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3',
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6',
  'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq -'
];

const chessboard = new Chessboard(
  document.getElementById('chessboard'),
  {
    assetsUrl: "https://cdn.jsdelivr.net/npm/cm-chessboard@8.5.0/assets/",
    position: fen[fen.length - 1],
    style: {pieces: {file: "pieces/staunty.svg"}},
    extensions: [{class: Markers}]
  }
);

const inputHandler = (event) => {
  switch (event.type) {
    case INPUT_EVENT_TYPE.moveInputStarted:
      return true;
    case INPUT_EVENT_TYPE.validateMoveInput:
      return true;
    case INPUT_EVENT_TYPE.moveInputCanceled:
      break;
    case INPUT_EVENT_TYPE.moveInputFinished:
      break;
    case INPUT_EVENT_TYPE.movingOverSquare:
      break;
  }
}

chessboard.enableMoveInput(inputHandler);

const sanMovesInline = new SanMovesInline(
  document.querySelector('#sanMovesInline'),
  {
    chessboard: chessboard,
    movetext: movetext,
    fen: fen
  }
);

const historyButtons = new HistoryButtons(
  document.querySelector('#historyButtons'),
  {
    moves: sanMovesInline
  }
);

const openingTable = new OpeningTable(
  document.querySelector('#openingTable tbody'),
  {
    movetext: movetext
  }
);

const boardActionsDropdown = new BoardActionsDropdown(
  document.querySelector('#boardActionsDropdown ul'),
  {
    moves: sanMovesInline
  }
);

// -----------------------------------------------------------------------------
// Update the chessboard and the moves table
// -----------------------------------------------------------------------------

const position = 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq -';

chessboard.setPosition(position, true);

movetext = '1.e4 e5 2.Nf3 Nc6';

fen.push(position);

sanMovesInline.props = {
  ...sanMovesInline.props,
  movetext: movetext,
  fen: fen
};

sanMovesInline.mount();
