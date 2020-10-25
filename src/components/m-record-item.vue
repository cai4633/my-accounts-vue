<template>
  <div class="m-record-item">
    <div class="tag-wrap" v-if="allTags.length">
      <span
        class="tag"
        v-for="id in item.selected"
        :key="id"
      >
        <m-icon :name="findTags([id]).icon"></m-icon>
        <span class="text">{{findTags([id]).name}}</span>
      </span>
    </div>
    <span class="note no-wrap">{{item.note}}</span>
    <span class="amount">
      {{item.category}}
      {{item.output}}
    </span>
  </div>
</template>

<script lang='ts'>
import MIcon from '@/base/m-icon.vue'
import { findTags } from '@/common/ts/tags';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MIcon,
  }
})
export default class MRecordItem extends Vue {
  @Prop() allTags!: myTypes.TagItem[]
  @Prop() item!: myTypes.RecordItem

  findTags(ids: number[]) {
    return findTags(ids, this.allTags)[0]
  }
}
</script>

<style lang='stylus' scoped>
.m-record-item
  width 100%
  display flex
  justify-content space-between
  align-items center
  font-size 16px
  line-height 22px

  .tag
    margin 0 1em
    display flex
    align-items center

    >>>svg
      width 1.5em
      height @width

    .text
      margin-left 10px

  .note
    flex 1
    width 10px
    margin 0 10px
    color #aaa
    font-size 14px
    text-align left

  .amount
    margin 0 1em

  .text
    margin 0 1em
</style>