
import { Injectable } from "@nestjs/common";
import { User } from "./models/User";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { UserType } from "./interfaces/users.interface";
import * as JWT from "jsonwebtoken";
import { Document } from "./models/Document";
import * as HTMLtoDOCX from "html-to-docx";





@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private user:Repository<User>,
        @InjectRepository(Document)
        private document:Repository<Document>){}

    findAll() : Promise<User[]>{
      return this.user.find();
    }

    findOne(id:number) : Promise<User> {
      return this.user.findOne({where:{id}});
    } 

     async create(user:UserType){
       
        return await this.user.save(user);
    }

    async login(username:string,password:string){
       
      let user:UserType = await this.user.findOne({where:{username}});

      if(user){
        if(user.password === password){
          return user;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }


    findAllDoc(userId:number) : Promise<Document[]>{
        return this.document.find({where:{user:userId}});
    }

    findOneDoc(userId:number,docId:number) : Promise<Document>{
      return this.document.findOne({where:{user:userId,id:docId}});
    }

    async insertIntoDoc({docId,userId,data}){

      let document:Document = await this.document.findOne(docId);

      if(!document){
        document = await this.document.save({name:"Untitled",data,user:userId})
        return document.id;
      }
      else{
        document.data = data;
        await this.document.update(document.id,document);
        return document.id;
      }
    }


    async renameDoc(dataObj){
      
      let document:Document = await this.document.findOne({where:{id:dataObj.docId}});

      if(document){
        document.name = dataObj.docName;
      }
      await this.document.update(dataObj.docId,document);
    }

     async generateDOCX(htmlString) : Promise<string> {

       const fileBuffer = await HTMLtoDOCX(htmlString, null, {
            table: { row: { cantSplit: true } },
            footer: true,
            pageNumber: true,
      });
       return fileBuffer.toString('base64');
     }

    createJWT(obj:Object){
       
      return JWT.sign(obj,'psalmwebb',{
        expiresIn:3 * 60 * 60 * 24
      })
    }

    verifyJWT(token:string){
      let decodedToken:Object | Boolean;

      JWT.verify(token,'psalmwebb',(err,dToken)=>{
        if(err){
          // console.log(err);
          return decodedToken = false;
        }
        
           decodedToken = dToken;
      })

      return decodedToken;
    }
}