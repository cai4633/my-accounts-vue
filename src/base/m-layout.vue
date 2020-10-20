<template>
  <div class='m-layout'>
    <div class="container">
      <main>
        <slot></slot>
      </main>
      <div class="nav-wrap">
        <m-nav></m-nav>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import MNav from '@/components/m-nav.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MNav
  }
})
export default class MLayout extends Vue { }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'

.m-layout
  display flex
  flex-direction column
  height 100%
  justify-content center
  text-align center
  background-color ($theme.appBc)
  position relative

  .container
    height 100%

    main
      min-height 100%
      padding-bottom 55px
      text-align left
      display flex
      flex-direction column

    .nav-wrap
      position fixed
      z-index 1000
      width 100%
      bottom 0px
      max-width ($theme.maxWidth)
</style>