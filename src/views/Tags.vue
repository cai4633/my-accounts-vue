<template>
  <m-layout class="tags">
    <m-category-header
      :category="category"
      @selected='toggleBtn'
    ></m-category-header>
    <MTagsContainer
      hasAddBtn='true'
      @selected='gotoTagItem'
      @addtags='onaddtags'
      :tags='classify'
    ></MTagsContainer>
    <router-view></router-view>
  </m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import MCategoryHeader from '@/base/m-category-header.vue'
import MTagsContainer from '@/base/m-tags-container.vue'
import { Component, Mixins, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { getAllTags } from '@/api/tags';
import { classifyByCategory } from 'common/ts/tags';
import { Getter, Mutation } from 'vuex-class';
import { MutationMethod } from 'vuex';
import { TagMixin } from 'common/ts/mixins'

interface Classify<T = myTypes.TagItem> {
  income: T[]
  outcome: T[]
}

@Component({
  components: {
    MLayout,
    MCategoryHeader,
    MTagsContainer
  },
})

export default class Tags extends Mixins(TagMixin) {
  toggleBtn(value: Tags['category']) {
    this.category = value
  }

  gotoTagItem(id: number) {
    this.$router.push(`/tags/${id}`)
  }

  onaddtags() {
    this.$router.push({
      name: 'add',
      params: {
        classify: JSON.stringify(this.classify)
      }
    })
  }

  mounted() {
    if (!this.allTags.length) {
      getAllTags().then((res) => {
        this.setAllTags(res)
      })
    }

  }
}
</script>

<style lang='stylus' scoped></style>