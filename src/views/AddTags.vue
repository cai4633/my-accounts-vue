<template>
  <div class='addTags'>
    <m-layout class="tag">
      <m-header @ok='onok'>添加标签</m-header>
      <MTagsContainer
        :hasAddBtn='false'
        :tags='classify'
        @selected='onselected'
        :selected="selected"
      ></MTagsContainer>
    </m-layout>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import MLayout from 'base/m-layout.vue'
import MHeader from 'base/m-header.vue'
import MTagsContainer from 'base/m-tags-container.vue'
import { updateTag } from '@/api/tags';
import { updateLocalTag } from '@/common/ts/tags';
import { Getter, Mutation } from 'vuex-class';
import { MutationMethod } from 'vuex';
@Component({
  components: { MLayout, MHeader, MTagsContainer }
})
export default class AddTags extends Vue {
  @Provide() classify: myTypes.TagItem[] = []
  @Provide() selected: number[] = []
  @Getter("allTags") allTags!: myTypes.TagItem[]
  @Mutation('setAllTags') setAllTags!: MutationMethod

  onok() {
    this._updateTag({ deleted: false })
  }
  onselected(id: number) {
    const index: number = this.selected.indexOf(id)
    if (index === -1) {
      this.selected.push(id)
    } else {
      this.selected.splice(index, 1)
    }
  }

  _updateTag(item: Partial<myTypes.TagItem>) {
    updateTag(this.selected, item).then((res) => {
      this.setAllTags(updateLocalTag(res, this.allTags))
      this.$router.push({ name: 'Tags', params: { category: '+' } })
    })
  }


  mounted() {
    if (this.$route.params.classify) {
      this.classify = JSON.parse(this.$route.params.classify)
    }
  }
}
</script>

<style lang='stylus' scoped>
.addTags
  height 100%
  position absolute
  top 0 
  left 0
  width 100%
</style>