"use client";
import Dexie from "dexie";
const db = new Dexie("word-memo");
const DBVERSION = 1,
  TABLES = {
    saved: "++id, &word,bookid, means, ts, lang",
    record: "++id, book, process, index, count, ts, date",
  };
db.version(DBVERSION).stores(TABLES);

export default db;
