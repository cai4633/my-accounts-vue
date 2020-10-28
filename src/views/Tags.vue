<template>
  <m-layout class="tags">
    <m-category-header
      :category="category"
      @selected='toggleBtn'
    ></m-category-header>
    <MTagsContainer
      hasAddBtn='true'
      :tags='classify'
    ></MTagsContainer>
    <router-view></router-view>
  </m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import MCategoryHeader from '@/base/m-category-header.vue'
import MTagsContainer from '@/base/m-tags-container.vue'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { getAllTags } from '@/api/tags';
import { classifyByCategory } from 'common/ts/tags';

interface Classify<T = myTypes.TagItem> {
  income: T[]
  outcome: T[]
}

@Component({
  components: {
    MLayout,
    MCategoryHeader,
    MTagsContainer
  }
})

export default class Tags extends Vue {
  @Provide() category: keyof Tags["hash"] = '+'
  @Provide() hash: { [key: string]: 'income' | 'outcome' } = { "+": "income", "-": "outcome" }
  @Provide() allTags: myTypes.TagItem[] = []

  toggleBtn(value: Tags['category']) {
    this.category = value
  }

  get classify(): myTypes.TagItem[] {
    return classifyByCategory(this.allTags)[this.hash[this.category]]
  }

  mounted() {
    getAllTags().then((res) => {
      this.allTags = res
    })
  }
}
</script>

<style lang='stylus' scoped></style>