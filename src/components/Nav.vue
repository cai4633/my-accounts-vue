<template>
  <div class="nav">
    <ul>
      <li>
        <router-link
          to="/home"
          activeClassName="selected"
        >
          <Icon name="home"></Icon>
          首页
        </router-link>
      </li>
      <li>
        <router-link
          to="/detail"
          activeClassName="selected"
        >
          <Icon name="details"></Icon>
          明细
        </router-link>
      </li>
      <li>
        <router-link
          to="/money"
          activeClassName="selected"
        >
          <Icon name="add_money"></Icon>
          记账
        </router-link>
      </li>
      <li>
        <router-link
          to="/tags"
          activeClassName="selected"
        >
          <Icon name="tag"></Icon>
          标签
        </router-link>
      </li>
      <li>
        <router-link
          to="/statistics"
          activeClassName="selected"
        >
          <Icon name="statistics"></Icon>
          图表
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
@Component
export default class Nav extends Vue { }
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'

.nav
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

      svg
        width 2em
        height 2em

      .icon
        margin-bottom 5px

      &.router-link-active
        background-color $theme.bc
        color $theme.color
        font-weight 600

        svg
          fill $theme.bc
</style>
