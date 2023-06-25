import { ATableHeader } from "../../components/ATable/types";

export const conversationHeaders: ATableHeader[] = [
  { value: "peerId", text: "ID", sortable: true },
  { value: "name", text: "Название", sortable: true },
  {
    value: "countSms",
    text: "Количество сообщений",
    sortable: true,
  },
  {
    value: "percentBot",
    text: "Процент ботов",
    sortable: true,
  },
];
