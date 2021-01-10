<template>
  <!-- <transition
    name="slide"
    appear
    mode="out-in"
    duration='250'
  > -->
    <div class="money">
      <m-category-header
        :category="category"
        @selected='toggleBtn'
      ></m-category-header>
      <MTagsContainer
        :hasAddBtn='false'
        @selected='onchecked'
        :tags='classify'
        :checked='checked'
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
  <!-- </transition> -->
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import MTagsContainer from 'base/m-tags-container.vue'
import MCategoryHeader from 'base/m-category-header.vue'
import { Component, Mixins, Prop, Vue, Watch, Provide } from 'vue-property-decorator';
import { TagMixin, RecordMixin } from 'common/ts/mixins'
import MNote from 'base/m-note.vue'
import MNumberpad from 'base/m-numberpad.vue'
import { Toast } from 'mint-ui'
import { addRecords } from 'api/records'
import { createRecordId } from 'common/ts/util'
import dayjs from 'dayjs';
@Component({
  components: {
    MLayout, MTagsContainer, MCategoryHeader, MNote, MNumberpad
  }
})
export default class Money extends Mixins(TagMixin, RecordMixin) {
  @Provide() checked = -1
  @Provide() padVisiable = false
  @Provide() recordItem: myTypes.RecordItem = { id: 0, selected: [], category: '-', output: '', note: '', createAt: '' }

  onchecked(value: number) {
    this.checked = value
    this.showpad()
  }
  showpad() {
    this.padVisiable = true
  }
  hidepad() {
    this.padVisiable = false
  }
  onchange(note: string) {
    this.recordItem.note = note
  }
  onok(count: string) {
    if (parseFloat(count) === 0) {
      Toast({
        message: "您还未输入金额",
        duration: 1000,
      })
      return
    }
    this.recordItem = Object.assign(this.recordItem, { selected: [this.checked], id: createRecordId(), output: count, createAt: dayjs().format("YYYY-MM-DD"), category: this.category })
    addRecords([this.recordItem]).then((res) => {
      if (Array.isArray(res)) {
        this.setAllRecords([this.recordItem, ...this.allRecords])
      }
      this.$router.go(-1)
    })
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

.slide-appear, .slide-leave-to
  transform translateY(100%)

.slide-appear-to, .slide-leave
  transform translateY(0)

.slide-appear-active, .slide-leave-active
  transition all 0.2s linear
</style>