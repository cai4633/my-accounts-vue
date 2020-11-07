export interface StateType {
  allTags: myTypes.TagItem[]
  allRecords: myTypes.RecordItem[]
}

const state: StateType = {
  allTags: [],
  allRecords: [],
}

export default state
