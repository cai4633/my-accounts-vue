<template>
  <span class="m-record-item tag">
    <m-icon :name="findTags([id]).icon"></m-icon>
    <span class="text">{{findTags([id]).name}}</span>
  </span>
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
  @Prop() id!: number

  findTags(ids: number[]) {
    return findTags(ids, this.allTags)[0]
  }
}
</script>

<style lang='stylus' scoped>
.m-record-item
  display flex
  justify-content center
  align-items center
  font-size 14px

  svg
    width 1.5em
    height @width

  .text
    margin 0 1em
</style>