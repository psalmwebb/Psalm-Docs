

import {PrimaryGeneratedColumn, Column , Entity, CreateDateColumn,ManyToOne} from "typeorm";
import { User } from "./User";



@Entity('Documents')
export class Document{

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;

    @Column({
        type:'longtext'
    })
    data:string;

    @ManyToOne(()=> User, user=> user.id )
    user:number;

    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt:Date;
}