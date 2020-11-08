<template>
  <m-layout class="details">
    <div class="category-wrapper">
      <h1>天天记账</h1>
      <div class="content">
        <div
          class="date content-item"
          @click.stop="showPicker"
        >
          <span class="year">{{date.getFullYear()}}年</span>
          <span class="month">
            <span class="big">{{getMonth(date)}}</span>月<m-icon
              name="dropdown"
              fill="#fff"
            ></m-icon>
          </span>
        </div>
        <div class="income content-item">
          <span class="title">收入</span>
          <span class="text">{{records.income}}</span>
        </div>
        <div class="outcome content-item">
          <span class="title">支出</span>
          <span class="text">{{records.outcome}}</span>
        </div>
      </div>
      <div
        class="datePickerWrapper"
        v-if="showPicker"
      >
        <div
          class="shadow"
          @click.stop="hidePicker"
        ></div>
        <datetime-picker
          ref="picker"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          v-model="pickerValue"
          @confirm="confirmPicker"
        >
        </datetime-picker>
      </div>
    </div>
    <div class="content-wrapper">
      <div
        class="content"
        v-for="rank in records.rank"
        :key="rank[0]"
      >
        <h2>
          <span class="date">{{getDay(rank[0])}}</span>
          <div class="total">
            <span class="title">{{ showData(rank[1]).title}}</span>
            <span class="number">{{ showData(rank[1]).total}}</span>
          </div>
        </h2>
        <ul class="detail">
          <li
            v-for="item in rank[1]"
            :key="item.id"
          >
            <m-record-item
              :item='item'
              :allTags="allTags"
            ></m-record-item>
          </li>
        </ul>
      </div>
    </div>

  </m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import { DatetimePicker } from 'mint-ui';
import MRecordItem from '@/components/m-record-item.vue'
import MIcon from '@/base/m-icon.vue'
import { Component, Mixins, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import dayjs from 'dayjs';
import { RecordMixin, TagMixin } from 'common/ts/mixins'
import { orderByDate, settleAccountsByDay, recordsRankByMonth, isTotal } from "@/common/ts/detail"

interface RecordsType {
  rank: myTypes.Rank[]
  income: number
  outcome: number
}
@Component({
  components: {
    MLayout,
    MRecordItem,
    MIcon,
    DatetimePicker
  }
})
export default class Details extends Mixins(RecordMixin, TagMixin) {
  @Provide() date: Date = new Date()
  @Provide() pickerValue: Date = new Date()
  @Provide() total: Pick<RecordsType, "income" | "outcome"> = { income: 0, outcome: 0 }


  $refs!: {
    picker: DatetimePicker
  }

  confirmPicker(value: Date) {
    this.date = value
  }
  getMonth(date: Date): string {
    const month = date.getMonth() + 1
    return month > 9 ? month.toString() : "0" + month
  }

  getDay(day: string) {
    const today = dayjs().format("YYYY-MM-DD")
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD")
    const map = {
      [day]: day,
      [today]: "今天",
      [yesterday]: "昨天",
    }

    return map[day]
  }


  get records() {
    return recordsRankByMonth(this.allRecords, this.date)
  }


  showData(data: myTypes.RecordItem[]) {
    return settleAccountsByDay(data)
  }

  showPicker() {
    this.$refs.picker.open()
    return
  }
  hidePicker() {
    this.$refs.picker.close()
    return
  }
} 
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/mixin.styl'
@import '~@/common/stylus/variable.styl'

.details
  position relative
  height 100%

  .category-wrapper
    color ($theme.color)
    background-color ($theme.bc)

    button
      font-size 24px
      line-height 2em

    h1
      text-align center
      font-size 20px
      line-height 3

    .content
      display flex
      justify-content space-between
      margin-bottom 10px

      .content-item
        display flex
        justify-content center
        align-items center
        flex-direction column

      .date
        flex 1.5
        position relative

        .month
          display flex
          justify-content center
          align-items center

          .big
            font-size 1.4em

          >>> svg
            width 1em
            height 1em

        &::after
          position absolute
          content ''
          right 0
          display block
          width 2px
          height calc(100% - 16px)
          background-color ($theme.color)

      .income, .outcome
        flex 2

    .datePickerWrapper
      background #fff
      position absolute
      bottom 0px
      left 0px
      width 100%

      >>>.picker-items .picker-slot-center:nth-child(3)
        display none

      .mint-popup
        position absolute

      .shade
        position fixed
        background-color rgba(0, 0, 0, 0.1)
        width 100%
        height 100vh
        top 0

  .content-wrapper
    background-color ($theme.backgroundWhite)

    .content
      margin-top 1em

      &:nth-child(1)
        margin-top 0em

      h2
        color $theme.text_color_grey
        border-bottom 1px solid $theme.borderColor
        font-size 12px
        line-height 1.8
        padding 4px 10px
        display flex
        justify-content space-between

        .total > .title
          margin-right 6px

      .detail
        li
          margin 5px 0

          a
            display flex
            justify-content space-between
            align-items center
            font-size 16px
            line-height 22px
            padding 9px 0px

            .tag > .text
              margin-left 10px

            .note
              flex 1
              margin 0 10px
              color $theme.text_color_darker
              font-size 14px
              text-align left
              no-wrap()
</style>