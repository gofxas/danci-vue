"use client";
import Dexie from "dexie";
const db = new Dexie("word-memo");
const DBVERSION = 2,
  TABLES = {
    saved: "++id, &word,bookid, means, ts, lang",
    record: "++id, book, process, index, count, ts, date",
    root: "++id, tag, root, ras_indicate, ras_content, parts",
  };
db.version(DBVERSION).stores(TABLES);

export default db;
