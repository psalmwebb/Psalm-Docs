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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var User_1 = require("./models/User");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var JWT = require("jsonwebtoken");
var Document_1 = require("./models/Document");
var HTMLtoDOCX = require("html-to-docx");
var UserService = /** @class */ (function () {
    function UserService(user, document) {
        this.user = user;
        this.document = document;
    }
    UserService.prototype.findAll = function () {
        return this.user.find();
    };
    UserService.prototype.findOne = function (id) {
        return this.user.findOne({ where: { id: id } });
    };
    UserService.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.save(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.login = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user.findOne({ where: { username: username } })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            if (user.password === password) {
                                return [2 /*return*/, user];
                            }
                            else {
                                return [2 /*return*/, false];
                            }
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.findAllDoc = function (userId) {
        return this.document.find({ where: { user: userId } });
    };
    UserService.prototype.findOneDoc = function (userId, docId) {
        return this.document.findOne({ where: { user: userId, id: docId } });
    };
    UserService.prototype.insertIntoDoc = function (_a) {
        var docId = _a.docId, userId = _a.userId, data = _a.data;
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.document.findOne(docId)];
                    case 1:
                        document = _b.sent();
                        if (!!document) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.document.save({ name: "Untitled", data: data, user: userId })];
                    case 2:
                        document = _b.sent();
                        return [2 /*return*/, document.id];
                    case 3:
                        document.data = data;
                        return [4 /*yield*/, this.document.update(document.id, document)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, document.id];
                }
            });
        });
    };
    UserService.prototype.renameDoc = function (dataObj) {
        return __awaiter(this, void 0, void 0, function () {
            var document;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.document.findOne({ where: { id: dataObj.docId } })];
                    case 1:
                        document = _a.sent();
                        if (document) {
                            document.name = dataObj.docName;
                        }
                        return [4 /*yield*/, this.document.update(dataObj.docId, document)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.generateDOCX = function (htmlString) {
        return __awaiter(this, void 0, void 0, function () {
            var fileBuffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, HTMLtoDOCX(htmlString, null, {
                            table: { row: { cantSplit: true } },
                            footer: true,
                            pageNumber: true,
                        })];
                    case 1:
                        fileBuffer = _a.sent();
                        return [2 /*return*/, fileBuffer.toString('base64')];
                }
            });
        });
    };
    UserService.prototype.createJWT = function (obj) {
        return JWT.sign(obj, 'psalmwebb', {
            expiresIn: 3 * 60 * 60 * 24
        });
    };
    UserService.prototype.verifyJWT = function (token) {
        var decodedToken;
        JWT.verify(token, 'psalmwebb', function (err, dToken) {
            if (err) {
                // console.log(err);
                return decodedToken = false;
            }
            decodedToken = dToken;
        });
        return decodedToken;
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
        __param(1, (0, typeorm_1.InjectRepository)(Document_1.Document)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map