<template>
  <div class='tag-item'>
    <m-layout className="tag">
      <m-header onOk={onOk}>编辑标签</m-header>
      <main><span
          className="noTag"
          v-if="!hasTag"
        >标签不存在或者已删除</span></main>
      <div className="button-wrapper">
        <Button
          title={tagMap.value}
          onClick={tagMap.clickHandle}
        ></Button>
      </div>
    </m-layout>
  </div>
</template>

<script lang='ts'>
import MLayout from 'base/m-layout.vue'
import MHeader from 'base/m-header.vue'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { findTagId } from '@/common/ts/tags';
import { Getter, Mutation } from 'vuex-class'
import { getAllTags } from '@/api/tags';
import { MutationMethod } from 'vuex';

@Component({
  components: {
    MLayout,
    MHeader
  }
})
export default class TagItem extends Vue {
  @Getter("allTags") allTags!: myTypes.TagItem[]
  @Mutation('setAllTags') setAllTags !: MutationMethod

  get hasTag(): boolean {
    return findTagId(window.parseInt(this.$route.params.id), this.allTags) > -1
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

<style lang='stylus' scoped>
.tag-item
  position fixed
  width 100%
  height 100%
</style>