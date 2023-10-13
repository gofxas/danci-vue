export function prettyObject(msg) {
  const obj = msg;
  if (typeof msg !== "string") {
    msg = JSON.stringify(msg, null, "  ");
  }
  if (msg === "{}") {
    return obj.toString();
  }
  if (msg.startsWith("```json")) {
    return msg;
  }
  return ["```json", msg, "```"].join("\n");
}

export function formatKana(str) {
  let kana = "";
  for (let i = 0; i < str.length; i++) {
    let ch = str[i];
    if (
      (ch >= "\u4e00" && ch <= "\u9fcf") ||
      (ch >= "\uf900" && ch <= "\ufaff") ||
      (ch >= "\u3400" && ch <= "\u4dbf") ||
      ch == "(" ||
      ch == ")"
    ) {
      // console.log(ch, "is kanji");
    } else {
      kana += ch;
    }
  }
  return kana;
}
