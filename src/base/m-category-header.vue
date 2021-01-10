<template>
  <div class='m-category-header'>
    <button
      v-for="value in categorys"
      :key="value"
      @click.stop='toggleBtn(value)'
      :class='category===value
        ? "selected"
        : ""'
    >
      {{hash[value]}}
    </button>
    <span
      class="cancel extend-click"
      @click.stop='goback'
    >取消</span>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

type KeyType = keyof MCategoryHeader["hash"]
@Component
export default class MCategoryHeader extends Vue {
  @Provide() hash = { "+": "收入", "-": "支出" }
  @Provide() categorys: KeyType[] = ["-", "+"]
  @Prop({ default: '+' }) category!: KeyType

  toggleBtn(value: KeyType) {
    this.$emit('selected', value)
  }
  goback() {
    this.$router.go(-1)
  }

}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'

.m-category-header
  display flex
  color ($theme.color)
  background-color ($theme.bc)
  justify-content center
  align-items center
  position relative

  button
    font-size 16px
    color $theme.color
    max-width 20%
    line-height 3em
    flex 1
    position relative
    text-align center
    margin 0 10px

    &.selected::after
      content ''
      display block
      position absolute
      background-color $theme.color
      width 100%
      height 4px
      left 0
      bottom 0px

  .cancel
    position absolute
    right 20px
    font-size 12px
    cursor pointer
</style>