import { StateType } from "./state"

const mutations = {
  setAllTags(state: StateType, tags: myTypes.TagItem[]) {
    state.allTags = tags
  },
}

export default mutations
