import express, { Express } from "express";
import mostCardAdd from "./routes/mostCartAdd";
import searchProduct from "./routes/searchProduct";
import hello from "./routes/hello";

const app: Express = express();

app.use(express.json());
app.use("/", hello);
app.use("/mostAddedCart", mostCardAdd);
app.use("/serachProduct", searchProduct);

export default app;
