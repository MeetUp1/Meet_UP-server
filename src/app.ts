import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectMongoDB from "./utils/mongoose";
import indexRouter from "./routes/index";

dotenv.config();

const app = express();

app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

app.use("/api", indexRouter);

class ExtendedError extends Error {
  status?: number;
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new ExtendedError("404 Not Found");
  err.status = 404;
  next(err);
});

app.use(
  (err: ExtendedError, req: Request, res: Response, _next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res
      .status(err.status || 500)
      .send({ message: err.message || "500 Internal Server Error" });
  },
);

export default app;
