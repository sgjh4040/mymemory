const config =require('../config/config');
const request = require('request');
let kakao = {

    getKey: (req,res)=>{
        let kakaoUrl= config.kakaoBaseUrl+'/oauth/authorize?client_id='+config.kakaoKey+'&redirect_uri='+'http://localhost:8100&response_type=code'
        console.log(kakaoUrl);
        const option ={
            uri: 'https://kauth.kakao.com/oauth/token'
        }
        request.post(option,(err, res, body)=>{
            return res;
        });
        
    }

}


module.exports= kakao;