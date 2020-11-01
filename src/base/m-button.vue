<template>
  <div
    class='m-button'
    @click="onclick"
  >
    <span :style="{ backgroundColor,color }">{{title}}</span>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class MButtn extends Vue {
  @Prop({ default: '确认' }) title!: string
  @Prop({ default: 'red' }) backgroundColor!: string
  @Prop({ default: '#fff' }) color!: string
  onclick() {
    this.$emit('btnclick')
  }
} 
</script>

<style lang='stylus' scoped>
.m-button
  text-align center
  padding 44px

  span
    vertical-align top
    display inline-block
    color #fff
    font-size 17px
    line-height 22px
    padding 9px 15px
    border-radius 4px
    background-color #767676
</style>