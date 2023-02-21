import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Favourite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  username!: string;
  
  @Column()
  pictureId!: number;
}
