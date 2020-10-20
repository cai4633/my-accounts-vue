<template>
  <span :class="['svg-wrapper',className]">
    <svg
      className="icon"
      aria-hidden="true"
      :style="{fill: fill }"
    >
      <use :xlink:href="`#icon-${name}`"></use>
      <!-- TODO React xlinkHref -->
    </svg>
  </span>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class MIcon extends Vue {
  @Prop({ default: '' }) name!: string
  @Prop({ default: '' }) fill!: string
  @Prop({ default: '' }) className!: string

}
</script>

<style lang='stylus' scoped>
svg
  width 2em
  height 2em

.icon
  margin-bottom 5px
  border 1px solid #000
</style>