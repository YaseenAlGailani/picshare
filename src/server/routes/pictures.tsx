import express from "express";
import { Picture } from "../entities/picture.entity";
import { Favourite } from "../entities/favourite.entity";

const router = express.Router();

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
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const picture = await Picture.findOneBy({ id: id });
    if (!picture) {
      res.status(404).send({ message: `Cannot find picture with id:${id}` });
    }
    res.status(200).send(picture);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const pictures = await Picture.find({
      order: {
        date: "desc",
      },
    });
    if (pictures.length === 0) {
      res.status(404).send({ message: "No pictures found" });
    }
    res.status(200).send({pictures});
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const favouritesById = await Favourite.find({
      where: {
        username: username,
      },
      select: {
        pictureId: true,
      },
    });

    const pictures = await Picture.find({
      order: {
        date: "desc",
      },
    });
    if (pictures.length === 0) {
      res.status(404).send({ message: "No pictures found" });
    }
    res.status(200).send({ ids: favouritesById, pictures });
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
