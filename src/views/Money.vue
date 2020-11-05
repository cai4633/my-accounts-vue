<template>
  <div class="money">
    <m-category-header
      :category="category"
      @selected='toggleBtn'
    ></m-category-header>
    <MTagsContainer
      :hasAddBtn='false'
      @selected='gotoTagItem'
      :tags='classify'
    ></MTagsContainer>
    <section
      v-if="padVisiable"
      class="bottom"
      ref='bottom'
    >
      <m-note @change='onchange'></m-note>
      <m-numberpad @ok='onok'></m-numberpad>
    </section>
  </div>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import MTagsContainer from 'base/m-tags-container.vue'
import MCategoryHeader from 'base/m-category-header.vue'
import { Component, Mixins, Prop, Vue, Watch, Provide } from 'vue-property-decorator';
import { TagMixin } from 'common/ts/mixins'
import MNote from 'base/m-note.vue'
import MNumberpad from 'base/m-numberpad.vue'
@Component({
  components: {
    MLayout, MTagsContainer, MCategoryHeader, MNote, MNumberpad
  }
})
export default class Money extends Mixins(TagMixin) {
  @Provide() padVisiable: boolean = true
  gotoTagItem(value: any) {
    console.log(value);

  }
  onaddtags() { }
  onchange(note: string) {
    console.log(note);

  }
  onok(count: string) {
    console.log(count);
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'

.money
  height 100%

  .bottom
    position fixed
    width 100%
    bottom 0
    max-width $theme.maxWidth
</style>