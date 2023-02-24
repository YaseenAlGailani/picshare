import path from "path";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { picShareDB } from "./app-data-source";
import picturesRoute from "./routes/pictures";
import favouritesRoute from "./routes/favourites"

const app = express();
const PORT = 3000;

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

picShareDB
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(PORT);
