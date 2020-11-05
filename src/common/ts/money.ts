export type InputType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "." | "清空" | "删除"

export function isInputType(value: string): value is InputType {
  return "0123456789."
    .split("")
    .concat(["删除", "清空"])
    .includes(value)
}

export function generateOutput<T extends InputType>(value: T, money: string): string {
  switch (value) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      return money === "0" ? value : money + value
    case ".":
      return money.includes(".") ? money : money + value
    case "清空": //清空功能
      return "0"
    case "删除": //删除功能
      return money === "0" ? "0" : money.slice(0, -1)
    default:
      return "0"
  }
}
