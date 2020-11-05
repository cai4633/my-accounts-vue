<template>
  <div class='m-numberpad'>
    <div class="value">
      <input v-model="money" />
    </div>
    <div class="pad">
      <div
        class="button-wrapper clearfix"
        @click="onclick"
      >
        <button class="white-1">1</button>
        <button class="white-2">2</button>
        <button class="white-3">3</button>
        <button class="white-4">删除</button>
        <button class="white-2">4</button>
        <button class="white-3">5</button>
        <button class="white-4">6</button>
        <button class="white-5">清空</button>
        <button class="white-3">7</button>
        <button class="white-4">8</button>
        <button class="white-5">9</button>
        <button class="white-7">OK</button>
        <button class="white-5">0</button>
        <button class="dot white-6">.</button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { isInputType, generateOutput } from 'common/ts/money'
@Component
export default class MNumberpad extends Vue {
  @Provide() money = ''
  onclick(e: MouseEvent) {
    const value = (e.target as HTMLDivElement).textContent
    if (!value) {
      return
    }
    if (value === "OK") {
      this.$emit('ok', this.money)
      return
    }
    if (isInputType(value)) {
      this.money = generateOutput(value, this.money)
    }
  }
}
</script>

<style lang='stylus' scoped>
.m-numberpad
  background-color #fff
  flex 1
  display flex
  flex-direction column
  min-height 180px

  .value
    width 100%

    input
      font-size 26px
      text-align right
      width 100%
      box-sizing border-box
      line-height 1.5em
      padding 0px 10px
      box-shadow inset 0px -5px 5px -5px rgba(0, 0, 0, 0.25), inset 0px 5px 5px -5px rgba(0, 0, 0, 0.25)
      pointer-events none
      -moz-user-select none
      -webkit-user-select none
      -ms-user-select none
      user-select none

  .pad
    width 100%
    flex-grow 1
    min-height 100px
    display flex
    box-sizing border-box

    .button-wrapper
      width 100%

      button
        box-sizing border-box
        background-color #eee
        width 25%
        float left
        height 25%

        &.white-1
          background-color #f2f2f2

        &.white-2
          background-color #e0e0e0

        &.white-3
          background-color #d3d3d3

        &.white-4
          background-color #c1c1c1

        &.white-5
          background-color #b8b8b8

        &.white-6
          background-color #a9a9a9

        &.white-7
          background-color #9a9a9a

        &.white-8
          background-color #8b8b8b

        &.dot
          font-weight 900

        &:nth-child(12)
          height 50%
          float right

        &:nth-child(13)
          width 50%
</style>