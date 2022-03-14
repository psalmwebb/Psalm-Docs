"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var Document_1 = require("./users/models/Document");
var User_1 = require("./users/models/User");
var users_module_1 = require("./users/users.module");
var data_module_1 = require("./ws/data.module");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, "..", ".env") });
// import * as CONN from "../conn";
// console.log(process.env);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.db_host,
                    port: 3306,
                    username: process.env.db_user,
                    password: process.env.db_pass,
                    database: process.env.db_name,
                    entities: [User_1.User, Document_1.Document],
                    synchronize: false,
                    migrationsRun: false
                }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)(__dirname, "client_dist")
                }),
                users_module_1.UserModule,
                data_module_1.DataModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map