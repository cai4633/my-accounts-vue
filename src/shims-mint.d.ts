declare module "mint-ui" {
  import Vue from "vue"
  export class DatetimePicker extends Vue {
    open: () => void
    close: () => void
  }
  type MessageType = string | { message?: string; position?: string; duration?: number }
  export const Toast: (message?: MessageType) => void
}
