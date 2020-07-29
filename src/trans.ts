import * as querystring from "querystring";
import md5 = require("md5");
import {appId, appSecret} from "./private";
const https = require("https")
import {IncomingMessage, ServerResponse} from "http";

type  BaiDuResult = {
  from:string;
  to:string;
  trans_result:{
    src:string,
    dst:string
  }[]
  error_code?:string;
  error_message:string
}
const trans = (str: string) => {
  const salt = Math.random();
  const sign = md5(appId + str + salt+appSecret);
  const query = querystring.stringify({
    q: str,
    from: "en",
    to: "zh",
    appid:appId,
    salt,
    sign
  });
  const options = {
    hostname: "fanyi-api.baidu.com",
    port: 443,
    path: "/api/trans/vip/translate?" + query,
    method: "GET"
  };
  const request = https.request(options,((response:IncomingMessage)  => {
    const chunks: Buffer[] = []
    response.on("data",(chunk: Buffer)=>{
      chunks.push(chunk)
    })
    response.on("end",()=>{
      const string = Buffer.concat(chunks).toString()
      const object: BaiDuResult = JSON.parse(string)
      if (object.error_code){
        console.error(object.error_message)
        process.exit(1)
      }
      console.log(object.trans_result[0].dst);
      process.exit(0)
    })
  }))
  request.end()
};
module.exports.trans = trans;
