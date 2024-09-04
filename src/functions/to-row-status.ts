import { LockableLength, Row, RowStatus } from '../types'

export function toRowStatus(row: Row, len: LockableLength): RowStatus {
	// completed, implicitly locked
	if (row.slice(-len).some(Boolean)) return 'complete'

	// explicitly locked
	if (row[0]) return 'locked'

	return false
}
