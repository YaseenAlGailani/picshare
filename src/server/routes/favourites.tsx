import express from "express";
import { In, LessThan } from "typeorm";
import { Favourite } from "../entities/favourite.entity";
import { Picture } from "../entities/picture.entity";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, id } = req.body;
    const favourite = new Favourite();
    favourite.username = username;
    favourite.pictureId = id;
    await favourite.save();
    res.status(200).send({ message: "Added picture to favourites!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id/:username", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Favourite.delete({ pictureId: id, username: req.params.username });
    res.status(204).send({ message: "Removed picture from favourites!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/ids/:username", async (req, res) => {
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

    if (favouritesById.length === 0) {
      res.status(200).send({});
      return;
    }
    res.status(200).send(favouritesById);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/pictures/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const limit = parseInt(req.query.limit as string) || 12;
    const after = parseInt(req.query.after as string) || null;

    const [favouriteIds, count] = await Favourite.findAndCount({
      where: { username: username, ...(after && {id: LessThan(after)}) },
      select: { pictureId: true, id:true },
      order: { id: "desc" },
      take: limit,
    });

    const hasNext = count > limit;
    const lastId = favouriteIds[favouriteIds.length - 1]?.id || null;
    const pageInfo = { hasNext, lastId };
    const pictures = await Picture.find({
      where: {
        id: In(favouriteIds.map((f) => f.pictureId)),
      },
    });
    res.status(200).json({ pictures, pageInfo });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

export default router;
