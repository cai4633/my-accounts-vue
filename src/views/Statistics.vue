<template>
  <m-layout class="statistics">
    <div class="header">
      <h1 @click.stop="showPicker">
        {{btnText}}
        <m-icon name="dropdown"></m-icon>
      </h1>
      <Navbar v-model="selected">
        <TabItem id='0'>周</TabItem>
        <TabItem id='1'>月</TabItem>
        <TabItem id='2'>年</TabItem>
      </Navbar>
    </div>
    <m-picker
      :visible="popupVisible"
      :values='["支出","收入"]'
      @enter='enter'
      @cancel='cancel'
    ></m-picker>
    <div class="content">
      <h1 class="title">{{dateTitle}}</h1>
      <p>总收入:￥{{total.income}}</p>
      <p>总支出:￥{{total.outcome}}</p>
      <div
        :style="{ height: '300px' }"
        id="chart"
      >
        <v-chart
          :options='options'
          :width='100'
        ></v-chart>
      </div>
    </div>
  </m-layout>
</template>

<script lang='ts'>
import MLayout from '@/base/m-layout.vue'
import MIcon from '@/base/m-icon.vue'
import { Picker, Navbar, TabItem, Popup, Header, Button } from 'mint-ui'
import MPicker from 'base/m-picker.vue'
import { getTotal } from 'common/ts/statistics'
import { getDataThisMonth, getDataThisWeek, getDataThisYear } from 'common/ts/detail'
import { RecordMixin } from 'common/ts/mixins'
import { Component, Prop, Vue, Watch, Provide, Mixins } from 'vue-property-decorator'

interface PatchType {
  name: string;
  encode: {
    x: number;
    y: number;
  };
}
const dateSet = ["本周", "本月", "今年"] as const
@Component({
  components: {
    MLayout, Picker, Navbar, TabItem, Popup, Header, Button, MIcon, MPicker
  }
})
export default class Statistics extends Mixins(RecordMixin) {
  @Provide() selected = "0"
  @Provide() btnText = "支出"
  @Provide() popupVisible = false
  @Provide() source: myTypes.WeekItem[] = []
  @Provide() seriesPatch: PatchType = { name: '支出', encode: { x: 0, y: 2 } }

  get options() {
    return {
      tooltip: {
        show: true,
        trigger: "item",
      },
      yAxis: {
        type: "value",
      },
      grid: {
        left: 2,
        containLabel: true,
      },
      xAxis: { type: "category" },
      dataset: {
        source: this.source,
      },
      series: [
        {
          type: "line",
          dimensions: ["date", "income", "outcome"],
          ...this.seriesPatch
        },
      ],
    }
  }

  get dateTitle() {
    return dateSet[parseInt(this.selected)]
  }

  get total(): myTypes.AccountType {
    return getTotal(this.source)
  }

  showPicker() {
    this.popupVisible = true
  }
  cancel() {
    this.popupVisible = false
  }
  enter(value: string) {
    const map: { [key: string]: number } = { 收入: 1, 支出: 2 }
    this.popupVisible = false
    this.btnText = value
    this.seriesPatch = {
      name: value,
      encode: { x: 0, y: map[value] },
    }
  }

  @Watch("selected")
  selectedChange(newVal: string) {
    switch (newVal) {
      case "0":
        this.source = getDataThisWeek(this.allRecords)
        break
      case "1":
        this.source = getDataThisMonth(this.allRecords)
        break
      case "2":
        this.source = getDataThisYear(this.allRecords)
        break
      default:
        this.source = getDataThisWeek(this.allRecords)
        break
    }
  }

  @Watch("allRecords")
  allRecordsChange(newVal: myTypes.RecordItem[], oldVal: myTypes.RecordItem[]) {
    if (!oldVal.length) {
      this.source = getDataThisWeek(newVal)
    }
  }

}
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'

.statistics
  >>>.v-modal
    position absolute

  .header
    background-color ($theme.bc)
    font-size 16px

    h1
      font-size 16px
      display flex
      align-items center
      justify-content center
      color #fff
      font-weight normal
      line-height 1.5em
      margin 1em

    >>> svg
      padding-top 0.4em
      margin-left 0.5em
      width 1em
      height 1em

    .mint-navbar
      width 80%
      margin 1em auto
      background-color transparent
      border 1px solid #000
      border-radius 5px
      color #000
      line-height 1.5em

      .mint-tab-item
        padding 0.5em 0
        border-right 1px solid #000

        &:last-child
          border-right none

        &.is-selected
          border-bottom none
          color #fff
          margin-bottom 0
          background-color #000

  .content
    .title
      font-size 1em
      padding 10px 20px
      margin 0
      border-bottom 1px solid #ccc
      margin-bottom 10px

    p
      color ($theme.text_color_grey)
      padding 2px 20px
      font-size 12px

    #chart
      margin 0px 5px

      .echarts
        width 100%
        height 100%
</style>