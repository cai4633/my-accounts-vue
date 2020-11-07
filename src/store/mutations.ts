import { StateType } from "./state"

const mutations = {
  setAllTags(state: StateType, tags: myTypes.TagItem[]) {
    state.allTags = tags
  },
  setAllRecords(state: StateType, records: myTypes.RecordItem[]) {
    state.allRecords = records
  },
}

export default mutations
