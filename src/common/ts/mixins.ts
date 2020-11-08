import { getAllTags } from "@/api/tags"
import { getAllRecords } from "api/records"
import Vue from "vue"
import Component from "vue-class-component"
import { Provide } from "vue-property-decorator"
import { extend } from "vue/types/umd"
import { MutationMethod } from "vuex"
import { Getter, Mutation } from "vuex-class"
import { classifyByCategory } from "./tags"

const hash: { [key: string]: "income" | "outcome" } = { "+": "income", "-": "outcome" }

// 标签
@Component
export class TagMixin extends Vue {
  @Provide() category: myTypes.Categories = "-"
  @Getter("allTags") allTags!: myTypes.TagItem[]
  @Mutation("setAllTags") setAllTags!: MutationMethod

  get classify(): myTypes.TagItem[] {
    return classifyByCategory(this.allTags)[hash[this.category]]
  }

  toggleBtn(value: TagMixin["category"]) {
    this.category = value
  }

  mounted() {
    if (!this.allTags.length) {
      getAllTags().then((res) => {
        this.setAllTags(res)
      })
    }
  }
}

// 记录
@Component
export class RecordMixin extends Vue {
  @Getter("allRecords") allRecords!: myTypes.RecordItem[]
  @Mutation("setAllRecords") setAllRecords!: MutationMethod

  mounted() {
    console.log(1)

    if (!this.allRecords.length) {
      console.log(2)

      getAllRecords().then((res) => {
        this.setAllRecords(res)
        console.log(3)
      })
    }
  }
}
