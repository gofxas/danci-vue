/**
 * Record the user’s learning status of the day and save it
 */

import db from "./db.js";

const updateRecord = async ({ book, process, index, count=1, ts, date }) => {
  const res = await db.record.get({ book, date });
  if (res) {
    if (res.index < index) {
      const updated = await db.record.update(res.id, {
        count: res.count + 1,
        process,
        index,
        ts,
      });
    }
  } else {
    const res = await db.record.add({ book, process, index, count, ts, date });
  }
};

export default updateRecord;
