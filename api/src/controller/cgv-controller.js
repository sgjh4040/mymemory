const client = require('cheerio-httpcli');
const fs = require('fs');

// var savepath = "cgv.html";
const url = "http://www.cgv.co.kr/movies/";
var param = {};
// var outfile = fs.createWriteStream(savepath);




var findmovies = (req, res) => {


    client.fetch(url, param, function (err, $, res1) {
        var result = [];
        if (err) {
            console.log("Error", err);
            return;
        }
        var body = $(".sect-movie-chart").find("li").each(function (idx) {
            let a = new Object();

            if ($(this).children().length > 0) {
                var href = $(this).find("img").attr('src');
                a.image = href;

                var percent = $(this).find(".score").children(".percent").children("span").text();
                a.percent = percent;

                var title = $(this).find(".title").text();
                a.title = title;

                var rank = $(this).find(".rank").text();
                a.rank = rank;

                var detailurl = $(this).children(".box-contents").children().attr('href')
                var detailid = detailurl.replace(/.+\=/,'');

                a.detailId = detailid;

                result.push(a);
            }
        })
        return res.json(result);

    })
}

var detailmovie = (req,res)=>{

    var detailid = req.params.url;
    detailurl = url+'detail-view/?midx='+detailid;
    console.log(detailurl);

    client.fetch(detailurl,param,function(err,$,res1){
        let results = new Object();
        let stillcuts = [];
        if(err){
            console.log("Error",err);
            return;
        }
        results.title1 = $(".title").find('strong').text();
        results.title2 = $(".title").find('p').text();

        results.thumbImage= $(".thumb-image").children().attr('src');
        let spec =$(".spec").text().replace(/(\s*)/g, "");
        let genre =spec.indexOf('장르');
        
        results.spec1 = spec.substring(0,genre);
        results.spec2 = spec.substring(genre);

        results.rate = $(".score").children(".percent").text();
        results.view = $(".view").text();
        results.overview =$(".sect-story-movie").text().replace(/\n/g,"").replace(/\/r/g,"").replace(/(^\s*)|(\s*$)/g, "")
        $(".sect-stillcut").find("img").each(function(idx){
            console.log($(this).attr('data-src'));
            stillcuts.push($(this).attr('data-src'));
        })
        results.stillcuts = stillcuts;
        res.json(results);
    })
}

module.exports.findmovies = findmovies;
module.exports.detailmovie = detailmovie;

