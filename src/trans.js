"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = __importStar(require("querystring"));
var md5 = require("md5");
var private_1 = require("./private");
var https = require("https");
var trans = function (str) {
    var salt = Math.random();
    var sign = md5(private_1.appId + str + salt + private_1.appSecret);
    var query = querystring.stringify({
        q: str,
        from: "en",
        to: "zh",
        appid: private_1.appId,
        salt: salt,
        sign: sign
    });
    var options = {
        hostname: "fanyi-api.baidu.com",
        port: 443,
        path: "/api/trans/vip/translate?" + query,
        method: "GET"
    };
    var request = https.request(options, (function (response) {
        var chunks = [];
        response.on("data", function (chunk) {
            chunks.push(chunk);
        });
        response.on("end", function () {
            var string = Buffer.concat(chunks).toString();
            var object = JSON.parse(string);
            if (object.error_code) {
                console.error(object.error_message);
                process.exit(1);
            }
            console.log(object.trans_result[0].dst);
            process.exit(0);
        });
    }));
    request.end();
};
module.exports.trans = trans;
