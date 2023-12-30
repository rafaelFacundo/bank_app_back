import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./src/routes/routes.js";

console.log(process.env.POSTGRES_SERVER_PORT);

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.NODE_SERVER_PORT, () => {
  console.log("the server is on");
});
