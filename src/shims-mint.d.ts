declare module "mint-ui" {
  import Vue from "vue"
  export class DatetimePicker extends Vue {
    open: () => void
    close: () => void
  }
}
