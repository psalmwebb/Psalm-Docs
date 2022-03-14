import { Controller, Get,Post,Body, Param } from '@nestjs/common';
import { UserLoginDTO, UserRegisterDTO } from "./dtos/users.dto";
import { UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from './pipes/user.validationPipe';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './users.service';
import { Res,Req } from '@nestjs/common';
import {Response,Request} from "express";
import { UserType } from './interfaces/users.interface';



@Controller('users')
export class UserController {

    constructor(private userService:UserService){}

    @Post('/register')
    @UsePipes(new JoiValidationPipe(UserSchema))
    async register(@Body() userRegisterDTO: UserRegisterDTO){
        await this.userService.create(userRegisterDTO)
        return {success:"user created successfully"}
    }

    @Post('/login')
    async login(@Body() {username,password}:UserLoginDTO, @Res() res:Response){

        const userExist:any = await this.userService.login(username,password);

        if(userExist){
            res.cookie('pdCooks',this.userService.createJWT({id:userExist.id}),{
                maxAge:3000 * 60 * 60 * 24,
                httpOnly:true
            });
            res.json({user:userExist})
        }
        else{
            res.json({error:"Invalid Credentials"});
        }
    }

    @Post('/user')
    async GetUser(@Req() req:Request,@Res() res:Response){
        const pdCooks = req.cookies.pdCooks;

        // console.log(pdCooks);
        let user:any;

        if(pdCooks){
            user = this.userService.verifyJWT(pdCooks);
            // console.log(user);
        }
        
        if(user){
            user = await this.userService.findOne(user.id);
            res.json({user});
        }
        else{
            res.json({user:""})
        }    
    }

    @Post('/documents')
    async GetDocuments(@Body() payload:{userId:number},@Req() req:Request,@Res() res:Response){
        
        let user:any = this.userService.verifyJWT(req.cookies.pdCooks);

        // console.log(user);

        if(user)
          {
              res.status(200).json(await this.userService.findAllDoc(user.id))
          }
          else{
              res.json([]);
          }
    }

    @Post('/documents/:docId')
    async GetDocument(@Param() param, @Req() req, @Res() res){
        let user:any = this.userService.verifyJWT(req.cookies.pdCooks);
        if(user)
          {
              res.status(200).json(
                  {document:await this.userService.findOneDoc(user.id,param.docId)})
          }
          else{
              res.json({document:""});
          }
    }

    @Post('/convert-to-docx')
    async ConvertToDOCX(@Body() payload:{html:string}, @Res() res:Response){

        let pdfString = await this.userService.generateDOCX(payload.html);

        res.status(200).json({pdfString});
    }
}

