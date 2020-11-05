<template>
  <div class='m-tags-container'>
    <ol>
      <li
        v-show="tagVisiable ? !tag.deleted : tag.deleted"
        v-for="tag in tags"
        :key='tag.id'
        @click='onselected(tag.id)'
      >
        <div :class="{'item':true, 'checked':selected.includes(tag.id)}">
          <m-icon :name="tag.icon"></m-icon>
          <span class="name">{{tag.name}}</span>
        </div>
      </li>
      <li v-if="hasAddBtn">
        <div
          class="item"
          @click.stop="gotoAddTags"
        >
          <m-icon name="add"></m-icon>
          <span class="name">添加</span>
        </div>
      </li>
      <!-- 妥协布局，添加空元素  -->
      <li
        v-for="item in empty"
        class="empty"
        :key='item'
      ></li>
    </ol>
  </div>
</template>

<script lang='ts'>
import MIcon from 'base/m-icon.vue'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    MIcon
  }
})
export default class MTagsContainer extends Vue {
  @Provide() empty: number[] = []
  @Prop({ default: () => [] }) tags!: myTypes.TagItem[]
  @Prop({ default: true }) hasAddBtn!: boolean
  @Prop({ default: true }) tagVisiable!: boolean
  @Prop({ default: () => [] }) selected!: number[]

  onselected(id: number) {
    this.$emit('selected', id)
  }
  gotoAddTags() {
    this.$emit('addtags')
  }

  mounted() {
    // 空元素
    for (let i = 1; i <= 8; i++) {
      this.empty.push(10000 + i)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/stylus/variable.styl'

.m-tags-container
  background-color #fff

  & > ol
    display flex
    flex-wrap wrap
    justify-content space-between

    li
      font-size 12px
      margin 10px 15px
      border 1px solid transparent

      &.empty
        width 3rem
        height 0
        margin 0 16px
        border none

      a, .item
        display flex
        flex-direction column
        justify-content center
        align-items center
        word-break keep-all

        >>>svg.icon
          padding 4px
          border-radius 50%
          width 3rem
          height 3rem
          margin-bottom 4px
          background-color $theme.iconBackground
          border 1px solid transparent

      .checked
        >>>svg.icon
          border 1px solid red

      .selected
        svg.icon
          background-color $theme.bc
</style>