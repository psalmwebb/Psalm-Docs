import {Module} from "@nestjs/common";
import { UserController } from "./users.controller";
import {TypeOrmModule} from "@nestjs/typeorm"
import { User } from "./models/User";
import { Document } from "./models/Document";
import { UserService } from "./users.service";



@Module({
    imports:[TypeOrmModule.forFeature([User,Document])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{}