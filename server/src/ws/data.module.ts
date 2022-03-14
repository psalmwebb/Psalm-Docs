import {Module} from "@nestjs/common";
import { UserModule } from "../users/users.module";
import { DataGateway } from "./data.gateway";



@Module(
    {
        imports:[UserModule],
        providers:[DataGateway]
    }
)
export class DataModule{}