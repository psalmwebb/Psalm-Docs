"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModule = void 0;
var common_1 = require("@nestjs/common");
var users_module_1 = require("../users/users.module");
var data_gateway_1 = require("./data.gateway");
var DataModule = /** @class */ (function () {
    function DataModule() {
    }
    DataModule = __decorate([
        (0, common_1.Module)({
            imports: [users_module_1.UserModule],
            providers: [data_gateway_1.DataGateway]
        })
    ], DataModule);
    return DataModule;
}());
exports.DataModule = DataModule;
//# sourceMappingURL=data.module.js.map