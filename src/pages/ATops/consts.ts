import { ATableHeader } from "../../components/ATable/types";

export const conversationHeaders: ATableHeader[] = [
  { value: "peerId", text: "ID", sortable: true },
  { value: "name", text: "Название", sortable: true },
  {
    value: "countSms",
    text: "Сообщений",
    sortable: true,
  },
  {
    value: "percentBot",
    text: "Ботов",
    sortable: true,
  },
];
