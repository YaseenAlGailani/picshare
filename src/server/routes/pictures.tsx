import express from "express";
import { LessThan } from "typeorm";
import { Picture } from "../entities/picture.entity";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const picture = await Picture.findOneBy({ id: id });
    if (!picture) {
      res.status(404).send({ message: `Cannot find picture with id:${id}` });
    }
    res.status(200).send(picture);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, title, date, url } = req.body;
    const picture = new Picture();

    picture.title = title;
    picture.date = date;
    picture.username = username;
    picture.url = url;

    await picture.save();

    res.status(200).send({ message: "Your picture was successfully shared!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 12;
    const after = parseInt(req.query.after as string) || null;

    const [pictures, count] = await Picture.findAndCount({
      ...(after && { where: { id: LessThan(after) } }),
      take: limit,
      order: { id: "desc" },
    });

    if (count <= 0) {
      res.status(200).send({ pictures: [], pageInfo: {} });
      return;
    }

    const hasNext = count > limit;
    const lastId = pictures[pictures.length - 1]?.id || null;

    const pageInfo = { hasNext, lastId };
    res.status(200).json({ pictures, pageInfo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
