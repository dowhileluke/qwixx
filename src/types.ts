export type DieFaces = 6 | 8;
export type ColorScheme = 'light' | 'dark' | 'auto';
export type ColorOption = 'red' | 'yellow' | 'green' | 'blue';
// export type LockableLength = 1 | 2;
// export type RowStatus = 'locked' | 'complete' | false
export type Row = {
	boxes: boolean[];
	isLocked: boolean;
}

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
	// prefs: Prefs;
	isMenuOpen: boolean;
	isQrCodeVisible: boolean;
}
export type RowDetails = {
	tally: number;
	score: number;
	isFinished: boolean;
}

export type Calculations = {
	// lockableLength: LockableLength;
	totals: number[];
	rowDetails: RowDetails[];
	isGameComplete: boolean;
}

export type AppState = UserState & {
	calcs: Calculations;
}

export type AppActions = {
	resetBoard: () => void;
	setBox: (rowIndex: number, boxIndex: number, isChecked: boolean) => void;
	toggleMenu: (isMenuOpen: boolean) => void;
	toggleQrCode: (isQrCodeVisible: boolean) => void;
	// setPref: <K extends keyof Prefs>(pref: K, value: Prefs[K]) => void;
	// setColor: (index: number, color: ColorOption) => void;
}
