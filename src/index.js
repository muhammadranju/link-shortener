require("dotenv").config();
const dbConnect = require("./db/db.config");
const app = require("./app/app");
const http = require("http");
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

dbConnect();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
