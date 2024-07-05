const app = require("./index");
const connectDb = require("./services/database");

const PORT = process.env.PORT || 7070;

app.listen(PORT, async () => {
  console.log(`\nserver is listening, ${PORT}`);
  await connectDb()
    .then(el => console.log('Database connected\n'))
});