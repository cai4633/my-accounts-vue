<template>
  <div class='m-header'>
    <h1>
      <m-icon
        name="left"
        @click.native.stop="goback"
        class="back"
      ></m-icon>
      <span class="title">
        <slot></slot>
      </span>
      <span
        class="btn ok"
        @click.stop='onok'
      >
        完成
      </span>
    </h1>
  </div>
</template>

<script lang='ts'>
import MIcon from 'base/m-icon.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MIcon
  }
})
export default class Mheader extends Vue {
  goback() {
    this.$router.back()
  }
  onok() {
    this.$emit('ok')
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'

.m-header
  text-align center
  background-color ($theme.bc)
  color #fff

  h1
    display flex
    justify-content space-between
    align-items center
    font-size 16px
    font-weight normal
    padding 0 20px
    margin 0

    .back, .ok
      extend-click()

    >>>svg
      width 1.5em
      height @width
      margin-bottom 0

    .title
      line-height 3em
</style>