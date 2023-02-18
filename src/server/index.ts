import path from 'path';
import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve("./dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.listen(PORT);