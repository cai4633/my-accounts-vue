<template>
  <div class="m-nav">
    <ul>
      <li>
        <router-link to="/home">
          <m-icon name="home"></m-icon>
          首页
        </router-link>
      </li>
      <li>
        <router-link to="/details">
          <m-icon name="details"></m-icon>
          明细
        </router-link>
      </li>
      <li>
        <router-link to="/money">
          <m-icon name="add_money"></m-icon>
          记账
        </router-link>
      </li>
      <li>
        <router-link to="/tags">
          <m-icon name="tag"></m-icon>
          标签
        </router-link>
      </li>
      <li>
        <router-link to="/statistics">
          <m-icon name="statistics"></m-icon>
          图表
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import MIcon from '@/base/m-icon.vue'

@Component({
  components: {
    MIcon
  }
})
export default class MNav extends Vue { }
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'

.m-nav
  background-color #fff

ul
  display flex
  margin-bottom 0

  li
    flex 1
    box-shadow 0 0 2px rgba(0, 0, 0, 0.25)

    a
      padding 5px
      display flex
      flex-direction column
      justify-content center
      align-items center
      color rgba(0, 0, 0, 0.3)
      font-size 12px

      &.router-link-active
        background-color $theme.bc
        color $theme.color
        font-weight 600

        >>>.svg-wrapper svg
          fill $theme.color
</style>
