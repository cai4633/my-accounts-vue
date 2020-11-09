<template>
  <div class='not-found'>
    <p>您访问的地址不存在！</p>
    <router-link to="/">返回主页</router-link>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class NotFound extends Vue { }
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'

.not-found
  height 100%
  background-color ($theme.appBc)

  p
    padding 3em 0
    font-size 2em
  a
    border-bottom  1px solid #000
    padding-bottom 4px
</style>