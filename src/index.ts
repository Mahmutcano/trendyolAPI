import express, { Express } from "express";
import mostCardAdd from "./routes/mostCartAdd";
import searchProduct from "./routes/searchProduct";

const PORT = process.env.PORT || 8000;
const app: Express = express();
app.use(express.json());

app.use("/mostAddedCart", mostCardAdd);
app.use("/serachProduct", searchProduct);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
