import { DataSource } from "typeorm";
import { Picture } from "./entities/picture.entity";
import { Favourite } from "./entities/favourite.entity";

export const picShareDB = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "yaseen",
  password: "yaseen",
  database: "picshare",
  entities: [Picture, Favourite],
  logging: false,
  synchronize: true,
});
