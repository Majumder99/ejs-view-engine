const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const port = process.env.PORT || 3000;

app.use(express.json());
app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post(
  "/register",
  urlencodedParser,
  [
    check(`username`, `This usrename must be 3+ character long`)
      .exists()
      .isLength({ min: 3 }),

    check(`email`, `Email is not valid`).isEmail().normalizeEmail(),
    check(`password`, `Password is empty`)
      .exists()
      .isLength({ min: 3, max: 100 }),
    check(`password1`, `Password is empty`)
      .exists()
      .isLength({ min: 3, max: 100 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //   return res.status(400).json(errors.array());
      const alert = errors.array();
      res.render("register", { alert });
    }
  }
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
