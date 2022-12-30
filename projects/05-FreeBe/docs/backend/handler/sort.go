package handler

type TaskRecordSortSlice []TaskRecordBase

func (s TaskRecordSortSlice) Len() int {
	return len(s)
}

func (s TaskRecordSortSlice) Swap(i, j int) {
	s[i], s[j] = s[j], s[i]
}

func (s TaskRecordSortSlice) Less(i, j int) bool {
	// return s[i].OnLineNum > s[j].OnLineNum
	return s[i].OperationType < s[j].OperationType
}
