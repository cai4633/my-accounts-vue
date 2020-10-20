<template>
  <m-layout class="home">1111</m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MLayout
  }
})
export default class Money extends Vue { }
</script>

<style lang='stylus' scoped></style>