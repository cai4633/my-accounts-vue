<template>
  <div class='tag-item'>
    <m-layout class="tag">
      <m-header @ok='onok'>编辑标签</m-header>
      <main>
        <m-note
          v-if="hasTag"
          :defaultValue="tag.name"
          title="标签名"
          @change='onchange'
        ></m-note>
        <span
          class="noTag"
          v-else
        >标签不存在或者已删除
        </span>
      </main>
      <!-- <div class="button-wrapper">
        <Button
          title={tagMap.value}
          onClick={tagMap.clickHandle}
        ></Button>
      </div> -->
    </m-layout>
  </div>
</template>

<script lang='ts'>
import MLayout from 'base/m-layout.vue'
import MHeader from 'base/m-header.vue'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { findTagId, findTags, updateLocalTag } from '@/common/ts/tags';
import { Getter, Mutation } from 'vuex-class'
import { getAllTags, updateTag } from '@/api/tags';
import { MutationMethod } from 'vuex';
import MNote from 'base/m-note.vue'

@Component({
  components: {
    MLayout, MHeader, MNote
  }
})
export default class TagItem extends Vue {
  @Provide() tagname: string = ''
  @Provide() id: number = window.parseInt(this.$route.params.id)
  @Getter("allTags") allTags!: myTypes.TagItem[]
  @Mutation('setAllTags') setAllTags !: MutationMethod

  get hasTag(): boolean {
    return findTagId(this.id, this.allTags) > -1
  }
  get tag(): myTypes.TagItem {
    return findTags([this.id], this.allTags)[0]
  }
  onok() {
    if (!this.tagname) {
      this.tagname = this.tag.name
    }
    updateTag(this.id, this.tagname).then((res) => {
      // TODO: 通过vuex改变状态后 back路由 页面不刷新
      this.setAllTags(updateLocalTag(res, this.allTags))
      this.$router.go(-1)
    })
  }
  onchange(value: string) {
    this.tagname = value
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
  position absolute
  width 100%
  height 100%
</style>