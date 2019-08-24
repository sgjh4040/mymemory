var request = require('request');

var kakaoapi = {
    getUser: (token,callback) => {
        var options1 = {
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers:
            {
                'cache-control': 'no-cache',
                authorization: 'bearer ' + token
            },
            form: {}
        };

        request(options1, function (error, response, body) {
            if (error) throw new Error(error);

            return callback(body);
        });
    },
    getToken: (codeNum,callback) => {
        console.log('token:',codeNum)

        var options = {
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                code: codeNum,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:8100',
                client_id: '6dec24132f91ea4e616064e20f98ec09'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
            let result = JSON.parse(body);
            return callback(result)

        });

    }
}
module.exports=kakaoapi;