import express from "express";
import { shopRouter } from "./routes/shopRouter.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", shopRouter);

app.use("/update/:id", shopRouter);

app.use("/add-new", shopRouter);

app.use("/add-supplier", shopRouter);

app.use("/sell", shopRouter);

app.use("/delete/:id", shopRouter);

app.use("/supplier/:id", shopRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
