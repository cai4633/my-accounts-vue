<template>
  <div class='m-picker'>
    <Popup
      v-model="visible"
      position="bottom"
    >
      <div class="picker-wrap">
        <Picker
          :slots="slots"
          :showToolbar='true'
          @change="onValuesChange"
        >
          <Header title="选择支出或者收入">
            <Button
              slot="left"
              @click.stop="cancel"
            >取消</Button>
            <Button
              slot="right"
              @click.stop="enter"
            >完成</Button>
          </Header>
        </Picker>
      </div>
    </Popup>
  </div>
</template>

<script lang='ts'>
import { Picker, Navbar, TabItem, Popup, Header, Button } from 'mint-ui'
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Picker, Navbar, TabItem, Popup, Header, Button
  }
})
export default class MPicker extends Vue {
  @Provide() value = ''
  @Prop({ default: () => ['1', '2'] }) values!: string[]
  @Prop({ default: false }) visible!: boolean

  get slots() {
    return [
      {
        flex: 1,
        values: this.values,
        className: 'slot1',
        textAlign: 'center'
      }
    ]
  }

  onValuesChange(picker: Vue, values: string[]) {
    this.value = values[0]
  }
  cancel() {
    this.$emit('cancel', this.value)
  }
  enter() {
    this.$emit('enter', this.value)
  }
  mounted() {
    this.value = this.values[0]
  }
}

</script>

<style lang='stylus' scoped>
.m-picker
  .mint-popup
    position absolute
    width 100%

    .picker-wrap
      width 100%
</style>