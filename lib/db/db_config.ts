const {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PWD = '',
  AUTH_DB,
} = process.env;

const dbConfig: any = {};

dbConfig.getMongoUrl = (): string => {
  const auth = MONGODB_USER ? `${MONGODB_USER}:${encodeURIComponent(MONGODB_PWD)}@` : '';
  const authDB = AUTH_DB ? `?authSource=${AUTH_DB}` : '';
  const url = `mongodb://${auth}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}${authDB}`;

  console.log(`MongoDB connection URL: ${url}`);

  return url;
};

export default dbConfig;
