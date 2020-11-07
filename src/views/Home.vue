<template>
  <m-layout class="home">
    <header>天天记账</header>
    <section class="date">
      <p>今天是</p>
      <p class="text">{{today}}</p>
    </section>
    <section class="current">
      <h2>
        <m-icon name="current"></m-icon>今天
      </h2>
      <div class="content">
        <ul class="today">
          <li
            v-for=' record in records'
            :key="record.id"
          >
            <m-record-item
              :allTags="allTags"
              :item='record'
            ></m-record-item>
          </li>
        </ul>
      </div>

    </section>
  </m-layout>
</template>


<script lang="ts">
import MIcon from '@/base/m-icon.vue';
import MLayout from '@/base/m-layout.vue';
import dayjs from 'dayjs'
import { getAllRecords } from '@/api/records'
import { Component, Mixins, Provide, Vue } from 'vue-property-decorator';
import { findTags } from '@/common/ts/tags'
import { getAllTags } from '@/api/tags'
import MRecordItem from '@/components/m-record-item.vue'
import { getDataToday } from '@/common/ts/detail'
import { Mutation } from 'vuex-class';
import { MutationMethod } from 'vuex';
import { TagMixin, RecordMixin } from 'common/ts/mixins'
@Component({
  components: {
    MLayout,
    MIcon,
    MRecordItem
  }
})
export default class Home extends Mixins(RecordMixin, TagMixin) {
  @Provide() today = dayjs().format('YYYY年MM月DD日')

  get records() {
    return getDataToday(this.allRecords).records
  }

}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.home
  height 100%

  header
    color ($theme.color)
    background-color ($theme.bc)
    text-align center
    font-size 1.5rem
    line-height 2.5em
    border-bottom 1px solid #ccc

  .date
    color ($theme.color)
    background-color ($theme.bc)
    padding 1em

    p
      line-height 2em

      &.text
        font-size 1.5rem
        text-align center

  .current
    padding 1.5em 0
    flex 1
    overflow auto

    h2
      padding 0 1em
      font-size 1rem
      display flex
      align-items center
      font-weight 600

      svg
        width 1.5rem
        height 1.5rem
        margin-right 6px

    .content
      margin-top 1em

      li
        display flex
        justify-content space-between
        align-items center
        font-size 16px
        line-height 22px
        background-color #fff
        padding 5px 0px
        border-radius 5px
        margin 5px 0

        .tag
          margin 0 1em

          .text
            margin-left 10px

        .note
          no-wrap()
          flex 1
          margin 0 10px
          color #aaa
          font-size 14px
          text-align left

        .amount
          margin 0 1em
</style>

