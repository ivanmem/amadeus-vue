import { ATableHeader } from "../../components/ATable/types";

export const conversationHeaders: ATableHeader[] = [
  { value: "peerId", text: "ID", sortable: true, width: 60 },
  { value: "name", text: "Название", sortable: true, width: 150 },
  {
    value: "countSms",
    text: "Сообщений",
    sortable: true,
    width: 100,
  },
  {
    value: "percentBot",
    text: "Ботов",
    sortable: true,
    width: 60,
  },
];
