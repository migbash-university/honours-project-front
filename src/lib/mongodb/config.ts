// ...
export default {
  mongo: {
      // ... you can override this with environment variable MONGO_URI
      uri: import.meta.env.VITE_MONGO_URI.toString(),
      options: {
          useNewUrlParser: true,
          useUnifiedTopology: true
      },
      // ... you can override this with environment variable MONGO_DB
      db: import.meta.env.VITE_MONGO_DB.toString(),
  }
}