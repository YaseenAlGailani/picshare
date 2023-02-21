import express from "express";
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
  }
});

router.delete("/:username/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Favourite.delete({ pictureId: id, username: req.params.username });
    res.status(204).send({ message: "Removed picture from favourites!" });
  } catch (error) {
    console.log(error);
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
      res.status(404).send({ message: "No records found" });
    }
    res.status(200).send(favouritesById);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/pictures/:username", async (req, res) => {
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
    if (favouritesById.length===0) {
      res.status(200).send({ids:[], pictures:[]});
      return 
    }
    const pictures = await Picture.createQueryBuilder("picture")
      .where("picture.id IN (:...ids)", {
        ids: favouritesById.map((f) => f.pictureId),
      })
      .orderBy({ Date: "DESC" })
      .getMany();

    if (pictures.length === 0) {
      res.status(404).send({ message: "No records found" });
    }
    res.status(200).send({ ids: favouritesById, pictures });
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
