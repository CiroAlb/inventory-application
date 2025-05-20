import express from "express";
import { shopRouter } from "./routes/shopRouter.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", shopRouter);
app.use("/about-us", function (req, res) {
  res.render("about-us", {});
});
app.use("/shop", function (req, res) {
  res.render("shop", {});
});
app.use("/contact-us", function (req, res) {
  res.render("contact-us", {});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
