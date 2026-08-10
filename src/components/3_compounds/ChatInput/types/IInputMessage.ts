import { Edit, Reply } from "@/types";

export interface IInputMessage {
  type: string
  text?: string
  url?: string
  filename?: string
  size?: string
  reply?: Reply
  edit?: Edit
}
