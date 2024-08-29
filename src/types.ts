export type InputState = {
	scores: number[][];
	skips: number[];
}

export type GameState = InputState & {
	total: number;
	isComplete: boolean;
}

export type GameActions = {
	reset: () => void;
	toggleCheck: (rowIndex: number, index: number) => void;
	toggleSkip: (index: number) => void;
}
