import { DataSource } from "typeorm";
import { Picture } from "./entities/picture.entity";

export const picShareDB = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "yaseen",
  password: "yaseen",
  database: "picshare",
  entities: [Picture],
  logging: true,
  synchronize: true,
});
