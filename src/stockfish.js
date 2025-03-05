// src/stockfish.js
const stockfish = new Worker('/stockfish.js'); // Make sure the path is correct

export const initStockfish = () => {
  return new Promise((resolve) => {
    stockfish.onmessage = (event) => {
      if (event.data === 'uciok') {
        resolve();
      }
    };

    stockfish.postMessage('uci');
  });
};

// The rest of your Stockfish functions...


export const getBestMove = (fen, depth) => {
  return new Promise((resolve) => {
    stockfish.onmessage = (event) => {
      if (event.data.startsWith('bestmove')) {
        const bestMove = event.data.split(' ')[1];
        resolve(bestMove);
      }
    };

    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage(`go depth ${depth}`);
  });
};

export const quitStockfish = () => {
  stockfish.postMessage('quit');
};
