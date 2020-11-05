<template>
  <m-layout class="tags">
    <m-category-header
      :category="category"
      @selected='toggleBtn'
    ></m-category-header>
    <MTagsContainer
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

  gotoTagItem(id: number) {
    this.$router.push(`/tags/${id}`)
  }

  onaddtags() {
    this.$router.push({ name: 'add', })
  }
}
</script>

<style lang='stylus' scoped></style>