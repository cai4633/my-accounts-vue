import { Avatar } from "ant-design-vue"
import { AV, Query } from "./index"

// 向leancloud 添加标签
function addTags(data: myTypes.TagItem[]) {
  const Tags = AV.Object.extend("tags") //获取tags 类
  const objs = data.map((item) => {
    const tags = new Tags()
    const keys = Object.keys(item) as (keyof typeof item)[]
    keys.map((key) => {
      tags.set(key, item[key]) //添加tags
    })
    return tags
  })

  AV.Object.saveAll(objs).then(() => {
    console.log("保存成功")
  })
}

// 获取leancloud标签
function getAllTags(): Promise<myTypes.TagItem[]> {
  const query = new Query("tags")
  return query.find().then((todo: any) => todo.map((item: { attributes: myTypes.TagItem }) => item.attributes))
}

function updateTag(id: number, item: Partial<myTypes.TagItem>): Promise<myTypes.TagItem> {
  const query = new Query("tags")
  return query
    .equalTo("id", id)
    .first()
    .then((tag) => {
      let key: keyof typeof item
      for (key in item) {
        tag?.set(key, item[key])
      }
      tag?.save()
      return tag?.toJSON()
    })
}

export { addTags, updateTag, getAllTags }
