import { create } from "zustand";

const emptyBoard = () =>
  new Array(19).fill(null).map(() => new Array(19).fill("#000000"));

export const useStore = create((set, get) => ({
  matrix: emptyBoard(),
  saved: emptyBoard(),
  previous: emptyBoard(),
  penultim: emptyBoard(),
  savedMatrix: emptyBoard(),
  matrixStates: [{ matrix: emptyBoard() }],
  loadMatrixStates: (matrixStates) => { console.log("ceva");set({ matrixStates, matrix: matrixStates[0].matrix })},
  currentStateIndex: 0,
  setCurrentStateIndex: (currentStateIndex) => set({ currentStateIndex }),
  selectedColor: "#ff0000",
  setSelectedColor: (selectedColor) => set({ selectedColor }),

  isDragging: false,
  setIsDragging: (isDragging) => set({ isDragging }),
  changed: false,

  mode: "single",
  setMode: (mode) => set({ mode }),

  frameInterval: 100,
  setFrameInterval: (frameInterval) => set({ frameInterval }),

  //---------------------> Navigation <---------------------

  navigateBack: () => {
    if (get().currentStateIndex > 0)
      set((state) => {
        return {
          ...state,
          matrix: state.matrixStates[state.currentStateIndex - 1].matrix,
          currentStateIndex: state.currentStateIndex - 1,
        };
      });
  },
  navigateForward: () => {
    if (get().currentStateIndex < get().matrixStates.length - 1)
      set((state) => {
        return {
          ...state,
          matrix: state.matrixStates[state.currentStateIndex + 1].matrix,
          currentStateIndex: state.currentStateIndex + 1,
        };
      });
  },

  handleSelectorChange: (value) => {
    set((state) => {
      return {
        ...state,
        matrix: state.matrixStates[value].matrix,
        currentStateIndex: value,
      };
    });
  },

  //---------------------> Drawing <---------------------

  handleUndo: () =>
    set((state) => ({
      matrix: JSON.parse(JSON.stringify(state.previous)),
      previous: JSON.parse(JSON.stringify(state.penultim)),
    })),
  handleMouseDown: (event) => {
    set((state) => ({
      saved: JSON.parse(JSON.stringify(state.matrix)),//for undo
      isDragging: true,
    }));
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  },
  handleMouseUp: () => {
    if (get().changed) {
      set((state) => ({
        changed: false,
        penultim: JSON.parse(JSON.stringify(state.previous)),//for undo
        previous: JSON.parse(JSON.stringify(state.saved)),//for undo
      }));
    }
    set(() => ({ isDragging: false }));
  },
  drag: (x, y) => {
    // update the color of the square at position (x, y) in the matrix
    const newMatrix = get().matrix.slice(); // make a copy of the matrix
    newMatrix[x][y] = get().selectedColor; // update the color at position (x, y)
    set(() => ({ matrix: newMatrix, changed: true }));
    get().saveMatrix();
  },
  saveMatrix: () => {
    const newMatrixStates = get().matrixStates.slice(); // make a copy of the matrixStates array
    const newMatrix = JSON.parse(JSON.stringify(get().matrix)); // make a deep copy of the matrix object
    newMatrixStates[get().currentStateIndex] = { matrix: newMatrix }; // update the matrix state at the current index
    set(() => ({ matrixStates: newMatrixStates }));
  },
  clicked: (x, y) => {
    const newMatrix = get().matrix.slice();
    set((state) => ({
      penultim: JSON.parse(JSON.stringify(state.previous)),
      previous: JSON.parse(JSON.stringify(state.matrix)),
    }));
    const selectedColor = get().selectedColor;
    const matrix = get().matrix;
    const mode = get().mode;
    if (mode === "single") {
      // update only the square at position (x, y)
      newMatrix[x][y] = selectedColor;
    } else if (mode === "column") {
      // update all of the squares in the same column as (x, y)
      for (let i = 0; i < matrix.length; i++) {
        newMatrix[i][y] = selectedColor;
      }
    } else if (mode === "row") {
      // update all of the squares in the same row as (x, y)
      for (let j = 0; j < matrix[0].length; j++) {
        newMatrix[x][j] = selectedColor;
      }
    } else if (mode === "diagonalS") {
      // update all of the squares in the same diagonal as (x, y)
      let i = x;
      let j = y;
      while (i > 0 && j > 0) {
        i--;
        j--;
      }
      while (i < matrix.length && j < matrix[0].length) {
        newMatrix[i][j] = selectedColor;
        i++;
        j++;
      }
    } else if (mode === "diagonalP") {
      // update all of the squares in the same diagonal as (x, y)
      let i = x;
      let j = y;
      while (i > 0 && j < matrix[0].length - 1) {
        i--;
        j++;
      }
      while (i < matrix.length && j >= 0) {
        newMatrix[i][j] = selectedColor;
        i++;
        j--;
      }
    }

    set(() => ({ matrix: newMatrix }));
    get().saveMatrix();
  },

  //---------------------> Frame Management <---------------------

  addBlankFrame: () => {
    const newMatrixStates = get().matrixStates.slice(); // make a copy of the matrixStates array
    newMatrixStates.splice(get().currentStateIndex + 1, 0, {
      matrix: new Array(19).fill(null).map(() => new Array(19).fill("#000000")),
    }); // insert a new blank frame after the current index
    set((state) => ({
      matrixStates: newMatrixStates,
      currentStateIndex: state.currentStateIndex + 1,
      matrix: newMatrixStates[state.currentStateIndex + 1].matrix,
    }));
  },
  addState: () => {
    const newMatrixStates = get().matrixStates.slice();
    newMatrixStates.splice(get().currentStateIndex + 1, 0, {
      matrix: JSON.parse(JSON.stringify(get().matrix)),
    });
    set((state) => ({
      matrixStates: newMatrixStates,
      currentStateIndex: state.currentStateIndex + 1,
      matrix: newMatrixStates[state.currentStateIndex + 1].matrix,
    }));
  },
  removeCurrentFrame: () => {
    const newMatrixStates = get().matrixStates.slice();
    newMatrixStates.splice(get().currentStateIndex, 1);
    set((state) => ({
      matrixStates: newMatrixStates,
      currentStateIndex: state.currentStateIndex,
      matrix: newMatrixStates[state.currentStateIndex].matrix,
    }));
  },
  handleCopyMatrix: () =>
    set((state) => ({
      saved: JSON.parse(JSON.stringify(state.matrix)),
    })),
  handlePasteMatrix: () =>
    set((state) => {
      let newMatrixStates = state.matrixStates.slice();
      newMatrixStates[state.currentStateIndex] = {
        matrix: JSON.parse(JSON.stringify(state.saved)),
      }; // update the matrix state at the current index

      return {
        ...state,
        matrixStates: newMatrixStates, // update the matrixStates state variable
        matrix: newMatrixStates[state.currentStateIndex].matrix,
      };
    }),

  //---------------------> Playback <---------------------
  isPlaying: false,
  handlePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playFrame: () => {
    set((state) => ({
      currentStateIndex: (state.currentStateIndex + 1) % state.matrixStates.length,
      matrix: state.matrixStates[state.currentStateIndex].matrix,
    }));
  },
}));
