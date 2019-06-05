var bodyParser = require('body-parser')
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var formidable = require('formidable');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'cultivation',
    multipleStatements: true
});
connection.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
})

//我的发布
router.get('/Person/user/:user/page/:page', function(req, res, next) {
    let selectContents = 'select * from contents where author = ' + '"' + req.params.user + '"'
    connection.query(selectContents, function(error, results, fields) {
        if (results) {
            results = JSON.stringify(results)
            res.end(results);
        } else
            res.end("");
    })
})

//发布删除或结束
router.post('/Person/user/:user/page/:page', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    if (form.do === "d") {
        let deleteC = 'delete from contents where id = "' + form.id + '"'
        connection.query(deleteC, function(error, resultD, fields) {
            res.send(resultD)
        })
    } else if (form.do === "c") {
        let updateC = 'update contents set doing = "已结束" where id = "' + form.id + '"'
        connection.query(updateC, function(error, resultU, fields) {
            res.send(resultU)
        })
    }
})

//我的收藏
router.get('/pfavorites/user/:user/page/:page', function(req, res, next) {
    let selectContents = 'select * from collection where collectuser = ' + '"' + req.params.user + '"'
    connection.query(selectContents, function(error, results, fields) {
        if (results) {
            results = JSON.stringify(results)
            res.end(results);
        } else
            res.end("");
    })
})

//删除收藏
router.post('/pfavorites/user/:user/page/:page', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let deleteC = 'delete from collection where id = "' + form.row.id + '"'
    connection.query(deleteC, function(error, resultC, fields) {
        res.send(resultC)
    })
})

//我的浏览
router.get('/pseen/user/:user/page/:page', function(req, res, next) {
    let selectContents = 'select * from browse where browseuser = ' + '"' + req.params.user + '"'
    connection.query(selectContents, function(error, results, fields) {
        if (results) {
            results = JSON.stringify(results)
            res.end(results);
        } else
            res.end("");
    })
})

//删除浏览
router.post('/pseen/user/:user/page/:page', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let deleteB = 'delete from browse where id = "' + form.row.id + '"'
    connection.query(deleteB, function(error, resultB, fields) {
        res.send(resultB)
    })
})

//我的评价
router.get('/pcomment/user/:user/page/:page', function(req, res, next) {
    let results = []
    new Promise(resolve => {
            //一级评论
            let selectContents = 'select * from comments where commentuser = ' + '"' + req.params.user + '"'
            connection.query(selectContents, function(error, result, fields) {
                if (result) {
                    results = result
                    resolve();
                }
            })
        })
        .then(result => {
            //二级评论
            return new Promise(function(resolve, reject) {                        
                let selectContents2 = 'select * from comments2 where author = "' + req.params.user + '"'
                connection.query(selectContents2, function(error, result, fields) {
                    for (let i in result)
                        results.push(result[i])
                    res.send(JSON.stringify(results))
                })
            })
        })
})

//删除评论
router.post('/pcomment/user/:user/page/:page', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    if (typeof form.row.sid === "undefined") { //删除一级评论
        let deleteF = 'delete from comments where id = "' + form.row.id + '"'
        connection.query(deleteF, function(error, resultF, fields) {
            res.send(resultF)
        })
    } else if (typeof form.row.sid) { //删除二级评论
        let deleteS = 'delete from comments2 where id = "' + form.row.id + '"'
        connection.query(deleteS, function(error, resultS, fields) {
            res.send(resultS)
        })
    }
})

//修改资料
router.post('/PersonalSet/user/:user', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let updateU = 'update user set'
    if (form.nick != "")
        updateU = updateU + ' nick = "' + form.nick + '" where account = "' + form.user + '"'
    else if (form.phone != "")
        updateU = updateU + ' phone = ' + parseInt(form.phone) + ' where account = "' + form.user + '"'
    else if (form.email != "")
        updateU = updateU + ' email = "' + form.email + '" where account = "' + form.user + '"'
    else if (form.location != "")
        updateU = updateU + ' location = "' + form.location + '" where account = "' + form.user + '"'
    connection.query(updateU, function(error, result, fields) {
        res.send(JSON.stringify(result))
    })
})

//图片上传请求,使用formidable模块接收图片
router.post('/upload', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/images";
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function(err, fields, files) {
        // console.log(files.file.name);
        var filename = files.file.name;
        var nameArray = filename.split('.'); //将图片名称和图片后缀分割
        var type = nameArray[nameArray.length - 1]; //获取后缀
        var name = '';
        name = name + nameArray[0];

        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var imgName = name + time + '.' + type;
        var newPath = form.uploadDir + '/' + imgName;
        fs.renameSync(files.file.path, newPath); //重命名
        res.send({ imgUrl: "/public/images/" + imgName });
    });
});

//上传头像
router.post('/uphead', function(req, res, next) {
    let image = req.body.image[0]
    let insertSql = `update user set headimage = '${image}' where account = "${req.body.user}"`
    $sql.query(insertSql, function(error, result, fiedls) {
        console.log(result);
        if (error) throw error;

        res.send(result);
    })
});

//修改密码
router.post('/passwordset/user/:user', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let updateP = 'update user set password = "' + form.newpass + '" where account = "' + form.user + '"'
    connection.query(updateP, function(error, result, fields) {
        res.send(JSON.stringify(result))
    })
})

//留言查看
router.get('/pmsg/user/:user', function(req, res, next) {
    let results = []
    new Promise(resolve => {
        //一级评论
        let selectContent = 'select * from comments where author = "' + req.params.user + '" and commentuser != "' + req.params.user + '"'
        connection.query(selectContent, function(error, result, fields) {
            results = result
            resolve(result);
        })
    }).then(result => {
        //二级评论
        let selectContent2 = 'select * from comments2 where author = "' + req.params.user + '" and commentuser != "' + req.params.user + '"'
        connection.query(selectContent2, function(error, result2, fields) {
            for (let r in result2)
                results.push(result2[r])
            res.send(JSON.stringify(results))
        })
    })
})

//登录
router.get('/login/user/:user/pass/:pass', function(req, res, next) {
    if (req.params.user === "admin") {
        let selectContents = 'select * from administer where adname = "admin" and adpass = "admin"'
        connection.query(selectContents, function(error, results, fields) {
            results = JSON.stringify(results)
            res.end(results);
        })
    } else {
        let selectContents = 'select * from user where account = ' + '"' + req.params.user + '" and password = "' + req.params.pass + '"'
        connection.query(selectContents, function(error, results, fields) {
            results = JSON.stringify(results)
            res.end(results);
        })
    }
})

//注册
router.post('/register', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let insertU = 'insert into user (account,password,nick,question,answer) values ("' + form.user + '","' + form.pass + '","' + form.user + '","' + form.question + '","' + form.answer + '")'
    connection.query(insertU, function(error, result, fields) {
        res.send(JSON.stringify(result))
    })
})

//发现
router.get('/FaX/page/:page/categories/:categories/sad/:sad', function(req, res, next) {

    let selectContents = 'select * from contents'
    categ = req.params.categories
    s = req.params.sad
    if (categ != "不限") {
        // console.log(req.params.categories)
        selectContents = selectContents + ' where categories = "' + categ + '"'
    }
    if (req.params.sad != "所有信息") {
        if (categ == "不限")
            selectContents = selectContents + ' where sad = "' + s + '" and doing = "进行中"'
        else
            selectContents = selectContents + ' and sad = "' + s + '" and doing = "进行中"'
    }
    connection.query(selectContents, function(error, results, fields) {
        results = JSON.stringify(results)
        res.end(results);
    })
})

//添加浏览
router.post('/FaX/page/:page/categories/:categories/sad/:sad', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    new Promise(resolve => {
            //查找是否已存在
            let selectContents = 'select * from browse where pid = ' + '"' + form.item.id + '"'
            connection.query(selectContents, function(error, result, fields) {
                resolve(result);
            })
        })
        .then(result => {
            //未存在则插入 
            if (result.length == 0)  {    
                console.log(result.length);                 
                let insertContent = 'insert into browse (title,pid,time,author,browseuser) values ("' + form.item.title + '","' + form.item.id + '","' + new Date().toLocaleString() + '","' + form.item.author + '","' + form.user + '")'
                connection.query(insertContent, function(error, results, fields) {
                    res.send(results)
                })
            }
        })
})

//详细
router.get('/detailshow/id/:id', function(req, res, next) {
    let results = []
    new Promise(resolve => {
            //详细内容
            let selectContents = 'select * from contents where id = ' + '"' + req.params.id + '"'
            connection.query(selectContents, function(error, result, fields) {
                if (result) {
                    results = result
                    resolve();
                }
            })
        })
        .then(result => {
            //一级评论
            return new Promise(function(resolve, reject) {                        
                let selectContent = 'select * from comments where pid = ' + '"' + req.params.id + '"'
                connection.query(selectContent, function(error, result, fields) {
                    results.push(result)
                    resolve(result);
                })
            })
        })
        .then(result => {
            //二级评论
            let selectContent2 = `select * from comments2 where pid = ${req.params.id} and sid in (1,2,3,4,5,6,7,8,9,10)`
            connection.query(selectContent2, function(error, result2, fields) {
                for (let i in result) {
                    let comment = []
                    for (let j in result2) {
                        if (result[i].pid === result2[j].pid && result[i].fid === result2[j].sid) {
                            comment.push(result2[j]);
                        }
                    }
                    result[i].comment2 = comment;
                    result[i].showflag = false;
                }
                res.send(JSON.stringify(results))
            })
        })
})

//发表评论
router.post('/detailshow/id/:id', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let author
    if (form.t === "f") { //发表一级评论
        new Promise(resolve => {
                let selectC = 'select * from contents where id = "' + form.id + '"'
                connection.query(selectC, function(error, result1, fields) {
                    author = result1[0].author
                    resolve(result1)
                })
            })
            .then(result1 => {
                return new Promise(function(resolve, reject) {
                    let re
                    re = result1[0]                       
                    let selectContent = 'select fid from comments where pid = ' + '"' + form.id + '" order by fid desc limit 1'
                    connection.query(selectContent, function(error, result, fields) {
                        re.fid = result[0].fid + 1
                        resolve(re);
                    })
                })
            }).then(re => {                        
                let insertContents = 'insert into comments (title,comment,time,commentuser,pid,fid,author) values ("' + re.title + '","' + form.comment + '","' + new Date().toLocaleString() + '","' + form.user + '","' + form.id + '","' + re.fid + '","' + author + '")'
                connection.query(insertContents, function(error, results, fields) {
                    res.send(results)
                })

            })
    } else if (form.t === "s") { //发表二级评论
        new Promise(resolve => {
            let selectC = 'select title from contents where id = "' + form.id + '"'
            connection.query(selectC, function(error, result, fields) {
                resolve(result)
            })
        }).then(result => {                 
            let insertContents = 'insert into comments2 (title,comment,time,commentuser,pid,sid,author) values ("' + result[0].title + '","' + form.comment + '","' + new Date().toLocaleString() + '","' + form.user + '","' + form.id + '","' + form.fid + '","' + author + '")'
            connection.query(insertContents, function(error, results, fields) {
                res.send(results)
            })

        })
    }
})

//新闻公告
router.get('/news', function(req, res, next) {
    let results = [{}]
    new Promise(resolve => {
            //公告
            let selectContents1 = 'select * from news where category = "notice"'
            connection.query(selectContents1, function(error, result, fields) {
                results.push(result)
                resolve();
            })
        })
        .then(result => {
            //新闻
            return new Promise(function(resolve, reject) {                        
                let selectContents2 = 'select * from news where category = "new"'
                connection.query(selectContents2, function(error, result, fields) {
                    results.push(result)
                    res.send(JSON.stringify(results))
                })
            })
        })
})

//管理员认证
router.get('/check/page/:page', function(req, res, next) {
    let results = []
    new Promise(resolve => {
            //详细内容
            let selectContents = 'select * from contents where id = ' + '"' + req.params.id + '"'
            connection.query(selectContents, function(error, result, fields) {
                if (result) {
                    results = result
                    resolve();
                }
            })
        })
        .then(result => {
            //一级评论
            return new Promise(function(resolve, reject) {                        
                let selectContent = 'select * from comments where pid = ' + '"' + req.params.id + '"'
                connection.query(selectContent, function(error, result, fields) {
                    results.push(result)
                    resolve(result);
                })
            })
        })
        .then(result => {
            //二级评论
            let selectContent2 = `select * from comments2 where fid = ${req.params.id} and sid in (1,2)`
            connection.query(selectContent2, function(error, result2, fields) {
                for (let i in result) {
                    let comment = []
                    for (let j in result2) {
                        if (result[i].id === result2[j].sid && result2[j].length != 0) {
                            comment.push(result2[j]);
                        }
                    }
                    result[i].comment2 = comment;
                    result[i].showflag = false;
                }
                res.send(JSON.stringify(results))
            })
        })
})

//管理员发布
router.post('/admin/fabu', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    let insertU = 'insert into news (title,contents,time,category) values ("' + form.title + '","' + form.contents + '","' + new Date().toLocaleString() + '","' + form.nan + '")'
    connection.query(insertU, function(error, result, fields) {
        res.send(JSON.stringify(result))
    })
})

//用户管理
router.post('/admin/manage', bodyParser.json(), function(req, res, next) {
    let form = req.body;
    if (form.type === 'g') {
        let results = []
        new Promise(resolve => {
                //用户
                let selectContents = 'select * from user '
                connection.query(selectContents, function(error, result, fields) {
                    results = result
                    resolve();
                })
            })
            .then(result => {
                //发布
                return new Promise(function(resolve, reject) {                      
                    let selectContent1 = 'select * from publish'
                    connection.query(selectContent1, function(error, result1, fields) {
                        for (let i in results) {
                            let pub = []
                            for (let j in result1) {
                                if (results[i].account === result1[j].author) {
                                    pub.push(result1[j]);
                                }
                            }
                            results[i].publish = pub;
                            results[i].showflag = false;
                        }
                        resolve();
                    })
                })
            })
            .then(result => {
                //一级评论
                return new Promise(function(resolve, reject) { 
                    let selectContent2 = `select * from comments`
                    connection.query(selectContent2, function(error, result2, fields) {
                        for (let i in results) {
                            let comm = []
                            for (let j in result2) {
                                if (results[i].account === result2[j].commentuser) {
                                    comm.push(result2[j]);
                                }
                            }
                            results[i].comment = comm;
                        }
                        resolve();
                    })
                })
            }).then(result => {
                //二级评论
                let selectContent3 = `select * from comments2`
                connection.query(selectContent3, function(error, result3, fields) {
                    for (let i in results) {
                        for (let j in result3) {
                            if (results[i].account === result3[j].commentuser) {
                                results[i].comment.push(result3[j])
                            }
                        }
                    }
                    res.send(JSON.stringify(results))
                })
            })
    } else if (form.type === 't') { //删除发布
        let deleteP = 'delete from publish where pid = "' + form.row.pid + '"'
        let deleteC = 'delete from contents where id = "' + form.row.pid + '"'
        connection.query(deleteP, function(error, result, fields) {
            connection.query(deleteC, function(error, resultD, fields) {
                res.send(resultD)
            })
        })
    } else if (form.type === 'c') { //删除评论
        if (typeof form.row.sid === "undefined") { //删除一级评论
            let deleteF = 'delete from comments where id = "' + form.row.id + '"'
            connection.query(deleteF, function(error, resultF, fields) {
                res.send(resultF)
            })
        } else if (typeof form.row.sid) { //删除二级评论
            let deleteS = 'delete from comments2 where id = "' + form.row.id + '"'
            connection.query(deleteS, function(error, resultS, fields) {
                res.send(resultS)
            })
        }
    }

})

module.exports = router;