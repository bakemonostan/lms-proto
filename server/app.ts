import express, { Request, Response, NextFunction } from "express";
export const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleWare } from "./middleware/Error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.routes";

// cookie parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use("/api/v1", userRouter);

app.use("/api/v1", courseRouter);


//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Hello from server",
  });
});

//unknown routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleWare);
