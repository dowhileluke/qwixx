export type DieFaces = 6 | 8;
export type ColorScheme = 'light' | 'dark' | 'auto';
export type ColorOption = 'red' | 'yellow' | 'green' | 'blue';
export type Row = boolean[];
export type LockableLength = 1 | 2;
export type RowStatus = 'locked' | 'complete' | false

export type BoardState = {
	d: DieFaces;
	scores: Row[];
	skips: Row;
}

export type Prefs = {
	d: DieFaces;
	colorScheme: ColorScheme;
	boardColors: ColorOption[];
}

export type UserState = {
	board: BoardState;
	prefs: Prefs;
	isMenuOpen: boolean;
}

export type GameState = {
	lockableLength: LockableLength;
	totals: number[];
	isComplete: boolean;
}

export type AppState = UserState & {
	game: GameState;
}

export type UserActions = {
	resetBoard: () => void;
	toggleMenu: (isMenuOpen: boolean) => void;
	setPref: <K extends keyof Prefs>(pref: K, value: Prefs[K]) => void;
	setColor: (index: number, color: ColorOption) => void;
}








export type InputState = {
	scores: number[][];
	skips: number[];
	d: DieFaces;
}

export type GameActions = {
	reset: () => void;
	toggleCheck: (rowIndex: number, index: number) => void;
	toggleSkip: (index: number) => void;
}


// export type AppState = {
// 	isMenuOpen: boolean;
// 	prefs: Prefs;
// 	game: InputState;
// }

export type AppActions = {
	resetGame: () => void;
	toggleCheck: (rowIndex: number, boxIndex: number) => void;
	toggleMenu: (isMenuOpen: boolean) => void;
	setPref: <K extends keyof Prefs>(pref: K, value: Prefs[K]) => void;
}
