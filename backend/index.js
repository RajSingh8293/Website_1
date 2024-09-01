import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
import "dotenv/config";
import connectDb from "./db/conn.js";
import userRouter from "./routes/user.routes.js";
const port = process.env.PORT || 3000;

const corsOptions = {
  // origin: ["http://localhost:5175"],
  origin: ["https://website-1-frontend.vercel.app"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
app.use("/api/v1", userRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server connected on port : ", port);
    });
  })
  .catch((error) => {
    console.log("Server Error : ", error);
  });
