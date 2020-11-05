<template>
  <div class='m-note'>
    <span>{{title}}</span>
    <input
      type="text"
      :placeholder='placeholder'
      v-model="value"
      @change='onchange'
    />

  </div>
</template>

<script lang='ts'>
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
@Component
export default class MNote extends Vue {
  @Provide() value = ''
  @Prop({ default: "备注" }) title!: string
  @Prop({ default: "" }) defaultValue!: string
  @Prop({ default: "在这里填写备注" }) placeholder!: string

  onchange() {
    this.$emit('change', this.value)
  }
  mounted() {
    this.value = this.defaultValue || ''
  }

}
</script>

<style lang='stylus' scoped>
.m-note
  text-align left
  background-color #f5f5f5
  padding 0 10px
  display flex

  span
    padding 1em 0

  input
    padding 1em 0
    margin-left 16px
    color #333
    flex 1
</style>