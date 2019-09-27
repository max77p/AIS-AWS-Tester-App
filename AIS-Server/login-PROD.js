var AWS = require("aws-sdk");
var ssm = new AWS.SSM();
import * as authLib from "./libs/auth-lib";
import * as aisQuery from "./ais-query";
import { success, failure } from "./libs/response-lib";
export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  function paramsloginBuilder(url,username, password) {
    return {
      Url: url,
      User: {
        username: username,
        password: password
      },
      deviceName: "rio-ais-test"
    };
  }
  function paramsQueryBuilder(url,token) {
    return {
      Url: url,
      token:token,
      deviceName: "rio-ais-test"
    };
  }
  let userparams = {
    Name: "ais-prod",
    WithDecryption: true
  };
  function buildFinalResponse(token,query){
      return{
        token:token,
        query:query
      };
  }
  try {
    let user = await ssm.getParameter(userparams).promise();
    let userArray=user.Parameter.Value.split(",");
    let newLoginParams = paramsloginBuilder(userArray[2],userArray[0],userArray[1]);
    let token = await authLib.getLogin(newLoginParams); // token.data.userInfo.token? console.log("token received"):console.log("no token");
    let newQueryParams = paramsQueryBuilder(userArray[3],token.data.userInfo.token);
    let queryObjToSend=aisQuery.buQuery(newQueryParams);
    let queryResponse=await authLib.getQuery(newQueryParams,queryObjToSend);
    if(token.status==200 && queryResponse.status==200){
        let finalBuiltResponse=buildFinalResponse(token.status,queryResponse.status);
        return success(finalBuiltResponse);
    }
    else{
        let finalBuiltResponse=buildFinalResponse(token.status,queryResponse.status);
        return failure(finalBuiltResponse);
    }
  } catch (e) {
    console.log(e);
    return failure(e);
  }
}
