"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var users_dto_1 = require("./dtos/users.dto");
var common_2 = require("@nestjs/common");
var user_validationPipe_1 = require("./pipes/user.validationPipe");
var user_schema_1 = require("./schemas/user.schema");
var users_service_1 = require("./users.service");
var common_3 = require("@nestjs/common");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.register = function (userRegisterDTO) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.create(userRegisterDTO)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { success: "user created successfully" }];
                }
            });
        });
    };
    UserController.prototype.login = function (_a, res) {
        var username = _a.username, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var userExist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userService.login(username, password)];
                    case 1:
                        userExist = _b.sent();
                        if (userExist) {
                            res.cookie('pdCooks', this.userService.createJWT({ id: userExist.id }), {
                                maxAge: 3000 * 60 * 60 * 24,
                                httpOnly: true
                            });
                            res.json({ user: userExist });
                        }
                        else {
                            res.json({ error: "Invalid Credentials" });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.GetUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pdCooks, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pdCooks = req.cookies.pdCooks;
                        if (pdCooks) {
                            user = this.userService.verifyJWT(pdCooks);
                            // console.log(user);
                        }
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userService.findOne(user.id)];
                    case 1:
                        user = _a.sent();
                        res.json({ user: user });
                        return [3 /*break*/, 3];
                    case 2:
                        res.json({ user: "" });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.GetDocuments = function (payload, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user = this.userService.verifyJWT(req.cookies.pdCooks);
                        if (!user) return [3 /*break*/, 2];
                        _b = (_a = res.status(200)).json;
                        return [4 /*yield*/, this.userService.findAllDoc(user.id)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 3];
                    case 2:
                        res.json([]);
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.GetDocument = function (param, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = this.userService.verifyJWT(req.cookies.pdCooks);
                        if (!user) return [3 /*break*/, 2];
                        _b = (_a = res.status(200)).json;
                        _c = {};
                        return [4 /*yield*/, this.userService.findOneDoc(user.id, param.docId)];
                    case 1:
                        _b.apply(_a, [(_c.document = _d.sent(), _c)]);
                        return [3 /*break*/, 3];
                    case 2:
                        res.json({ document: "" });
                        _d.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.ConvertToDOCX = function (payload, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pdfString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.generateDOCX(payload.html)];
                    case 1:
                        pdfString = _a.sent();
                        res.status(200).json({ pdfString: pdfString });
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, common_1.Post)('/register'),
        (0, common_2.UsePipes)(new user_validationPipe_1.JoiValidationPipe(user_schema_1.UserSchema)),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [users_dto_1.UserRegisterDTO]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "register", null);
    __decorate([
        (0, common_1.Post)('/login'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_3.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [users_dto_1.UserLoginDTO, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "login", null);
    __decorate([
        (0, common_1.Post)('/user'),
        __param(0, (0, common_3.Req)()),
        __param(1, (0, common_3.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "GetUser", null);
    __decorate([
        (0, common_1.Post)('/documents'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_3.Req)()),
        __param(2, (0, common_3.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "GetDocuments", null);
    __decorate([
        (0, common_1.Post)('/documents/:docId'),
        __param(0, (0, common_1.Param)()),
        __param(1, (0, common_3.Req)()),
        __param(2, (0, common_3.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "GetDocument", null);
    __decorate([
        (0, common_1.Post)('/convert-to-docx'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_3.Res)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "ConvertToDOCX", null);
    UserController = __decorate([
        (0, common_1.Controller)('users'),
        __metadata("design:paramtypes", [users_service_1.UserService])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map