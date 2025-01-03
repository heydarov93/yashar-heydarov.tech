import db from '../db/conn.js';

async function getAllDocs(collection, options = {}, type = 'array') {
  const docs = db.collection(collection);
  const cursor = docs.find(options);

  let results = null;
  switch (type) {
    case 'array':
      results = await cursor.toArray();
      break;
    default:
      throw new Error(
        `Type '${type}' for final result is incorrect please choose one these options:\n- array`
      );
  }

  return results;
}

export default getAllDocs;
