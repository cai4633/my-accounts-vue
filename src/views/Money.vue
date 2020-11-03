<template>
  <m-layout class="home">
    <MTagsContainer
      hasAddBtn='true'
      @selected='gotoTagItem'
      @addtags='onaddtags'
      :tags='classify'
    ></MTagsContainer>
  </m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MLayout
  }
})
export default class Money extends Vue {

  gotoTagItem(){}
  onaddtags(){}
 }
</script>

<style lang='stylus' scoped></style>