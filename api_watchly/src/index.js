require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require("./router/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
