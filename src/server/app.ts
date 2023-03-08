import path from "path";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import picturesRoute from "./routes/pictures";
import favouritesRoute from "./routes/favourites";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:1234"],
  })
);

app.use("/api/pictures", picturesRoute);
app.use("/api/favourites", favouritesRoute);
app.use(express.static(path.resolve("dist")));
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve("./dist/index.html"));
});

export default app;