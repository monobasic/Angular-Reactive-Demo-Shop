const user = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;

const database = {
  database: `mongodb://${user}:${pw}@${host}`
};

export default database;
