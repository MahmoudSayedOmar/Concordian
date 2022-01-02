import request from "../../utils/fetch";

export const getContacts = () => request.get("messages/contact");
