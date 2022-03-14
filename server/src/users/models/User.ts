
import {Entity,Column,PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm";
import { Document } from "./Document";

@Entity('users')
export class User{
   
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @OneToMany(()=> Document, (document)=> document.user)
    documents:Document[]

    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt:Date;
}