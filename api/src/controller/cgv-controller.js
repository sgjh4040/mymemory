var client = require('cheerio-httpcli');
var fs = require('fs');

// var savepath = "cgv.html";
var url = "http://www.cgv.co.kr/movies/";
var param = {};
// var outfile = fs.createWriteStream(savepath);




var findmovies = (req, res) => {


    client.fetch(url, param, function (err, $, res1) {
        var result = [];
        if (err) {
            console.log("Error", err);
            return;
        }
        console.log($(".sect-movie-chart").find("li").length)
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
        //title
        results.title1 = $(".title").find('strong').text();
        results.title2 = $(".title").find('p').text();

        //thumbnial 이미지
        results.thumbImage= $(".thumb-image").children().attr('src');

        let spec =$(".spec").text().replace(/(\s*)/g, "");
        let a =spec.indexOf('장르');
        //spec
        results.spec1 = spec.substring(0,a);
        results.spec2 = spec.substring(a);

        //예매율
        // console.log("예매율",$(".percent").text());
        results.rate = $(".score").children(".percent").text();
    
        // console.log("실관람객수:",$(".view").text());
        results.view = $(".view").text();
        
        // console.log("spec:",$(".spec").text());
    
        // console.log("줄거리:",$(".sect-story-movie").text());
        results.overview =$(".sect-story-movie").text().replace(/\n/g,"").replace(/\/r/g,"").replace(/(^\s*)|(\s*$)/g, "")
    
        // console.log("sect-stillcut",$(".sect-stillcut").text());
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

