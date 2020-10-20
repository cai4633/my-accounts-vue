<template>
  <m-layout class="details">1111</m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MLayout
  }
})
export default class Details extends Vue { }
</script>

<style lang='stylus' scoped></style>