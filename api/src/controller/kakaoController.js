const config =require('../config/config');
const request = require('request');
let kakao = {

    getKey: (req,res,callback)=>{
        let kakaoUrl= config.kakaoBaseUrl+'/oauth/authorize?client_id='+config.kakaoKey+'&redirect_uri='+'http://localhost:8100&response_type=code';
        console.log(kakaoUrl);
        const option ={
            uri: config.kakaoBaseUrl+'/oauth/token'
        }
        request.post(option,(err, res, body)=>{
            return callback(res);
        });
        
    },
    getTokens: (req, res) => {
        console.log(req.body.key);
    
        var options = {
            method: 'POST',
            url: config.kakaoBaseUrl+'/oauth/token',
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                code: req.body.key,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:8100',
                client_id: '6dec24132f91ea4e616064e20f98ec09'
            }
        };
    
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
    
            console.log(body);
        });
    
    
    }

}


module.exports= kakao;