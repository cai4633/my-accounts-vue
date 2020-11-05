import { getAllTags } from "@/api/tags"
import Vue from "vue"
import Component from "vue-class-component"
import { Provide } from "vue-property-decorator"
import { MutationMethod } from "vuex"
import { Getter, Mutation } from "vuex-class"
import { classifyByCategory } from "./tags"

const hash: { [key: string]: "income" | "outcome" } = { "+": "income", "-": "outcome" }

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
