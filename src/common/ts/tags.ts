import { getAllTags } from "@/api/tags"
import { getComplementarySet, getIds } from "./util"

interface Classify<T = myTypes.TagItem> {
  income: T[]
  outcome: T[]
}

const __TAGS__ = "tags"

// 根据category将将标签分类
function classifyByCategory<T extends { category: myTypes.Categories }>(tags: T[]) {
  const income: T[] = []
  const outcome: T[] = []
  tags.forEach((tag) => {
    if (tag.category === "+") {
      income.push(tag)
    } else {
      outcome.push(tag)
    }
  })
  return { income, outcome }
}

// 获取标签id
const findTagId = (id: number, someTags: myTypes.TagItem[]) => {
  return someTags.findIndex((item) => item.id === id)
}
// 根据id 获取标签
const findTags = (ids: number[], allTags: myTypes.TagItem[]): myTypes.TagItem[] => {
  return ids.map((id) => allTags.filter((tag) => tag.id === id)[0])
}

// 更新标签
const updateTag = (id: number, newTag: string) => {
  // const copy = tags.slice()
  // const ret = copy.map((tag) => {
  //   return tag.id === id ? { ...tag, name: newTag } : tag
  // })
  // setTags(ret)
}

// 删除标签
// const deleteTag = (id: number) => {
//   const tagsCopy = tags.slice()
//   const tagid = findTagId(id)
//   if (tagid === -1) {
//     return
//   }
//   tagsCopy.splice(tagid, 1)
//   setTags(tagsCopy)
// }

// // 添加标签
// const addTag = (val: number[]) => {
//   setTags([...tags, ...findTags(val)])
// }

export { updateTag, findTagId, findTags }
