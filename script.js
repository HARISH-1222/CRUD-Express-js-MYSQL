let express = require("express");
let exp = express();
let connect = require('./database.js');

const appPost = require("./Router/post");

exp.use('/view', express.static('view'));

//.use=>middleWare
exp.use('/post', appPost);

// let router = express.Router();

let bodyParser = require('body-parser');
const { response } = require("express");

exp.use(bodyParser.json());
//If we not use it will make undefined
exp.use(bodyParser.urlencoded({ extended: true }));

exp.get('/', function (req, res) {

    res.sendFile(__dirname + '/view/index.html');
});

exp.get('/create.html', function (req, res) {
    res.sendFile(__dirname + '/view/create.html');
});

exp.get('/goToHome', function (req, res) {
    res.sendFile(__dirname + '/view/home.html');
});

exp.get('/read.html', function (req, res) {
    //When i send it to file name it not work ?
    // res.sendFile(__dirname + '/read.html');
    res.redirect('/viewdatabase');
});

exp.get('/update.html', function (req, res) {
    res.sendFile(__dirname + '/view/update.html');
})

exp.get('/updatePhone.html', function (req, res) {
    res.sendFile(__dirname + "/view/updatePhone.html");
});

exp.get('/updateName.html', function (req, res) {
    res.sendFile(__dirname + "/view/updateName.html");
});

exp.get('/delete.html', function (req, res) {
    res.sendFile(__dirname + "/view/delete.html");
})

exp.get('/admin.html', (req, res) => {
    res.sendFile(__dirname + "/view/admin.html");
});

// Get the value from the user
// exp.use('/insert', appPost);
exp.post('/insert', function (req, res) {
    let input = {
        stdName: req.body.name,
        stdRegnum: req.body.regNum,
        phoneNum: req.body.phoneNum
    }
    let sql = 'insert into `crud`.`student` set ?';
    connect.query(sql, input, function (err, result) {
        if (err) throw err;
        res.redirect("/goToHome");
    });
});

//Read :

exp.get("/read.html", function (req, res) {
    let sql = "select * from `crud`.`student`";
    connect.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });

    // res.redirect("/viewdatabase");


    // let sql = "select * from `crud`.`student`"
    // connect.query(sql, function (error, result) {
    //     res.send(result);
    //     console.log(result);
    // response.render('read.html', {
    //     title: 'node.js',
    //     action: 'list',
    //     sampleData: result
    // });
});

//Update Name:
exp.post("/updateName", function (req, res) {

    //Want to check Not Work when we use input

    // let input = {
    //     stdRegNum: req.body.regNum,
    //     stdName: req.body.name,
    // }
    // let sql = `update crud.student set stdName=? where stdRegnum = ?`;
    let sql = `update crud.student set stdName = '${req.body.name}' where stdRegnum = ${req.body.regNum}`;
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/goToHome");
    });
});

//To Update update Number :
exp.post("/updatePhone", function (req, res) {
    let sql = `update crud.student set phoneNum=${req.body.phoneNum} where stdRegNum = ${req.body.regNum}`;
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect('/goToHome');
    });
});

exp.post("/delete", function (req, res) {
    let sql = `delete from crud.student where stdRegNum = ${req.body.stdRegNum}`;
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/goToHome");
    });
})

//Admin:
exp.post('/admin', (req, res) => {
    let sql = 'Truncate table crud.student'
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.redirect("/goToHome");
    });
});

//To create table &&  not enter the database name
exp.get('/createdatabase', function (req, res) {
    let sql = 'create database crud';
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Database Created..!");
    })
});

//To create table:
exp.get('/createtable', function (req, res) {
    let sql = 'create table `crud`.`student`(stdName varchar(30),stdRegNum numeric,phoneNum numeric(10))';
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Table Created..!");
    })
});


//To getbyid the data in database :
exp.get('/getbyid/:id', function (req, res) {
    let sql = `select * from crud.student where stdRegNum = ${req.params.id};`;
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log(req.params.id);
    })
})

//To view the data in database :
exp.get('/viewdatabase', function (req, res) {
    let sql = "select * from `crud`.`student`";
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
        // console.log(result);
    })
});

//To Truncate database:
exp.get('/truncatetable', function (req, res) {
    let sql = "truncate table `crud`.`student`";
    connect.query(sql, function (err, result) {
        if (err) throw err;
        res.send("Truncated");
    });
});

//To update database:
exp.get('/updatebyid/:id', function (req, res) {
    let sql = `update crud.student set phoneNum="9" where stdRegNum = ?;`;
    // let sql = `update crud.student set phoneNum="9791919194" where stdRegNum = 1`;
    connect.query(sql, [req.params.id], function (err, result) {
        if (err) throw err;
        res.send("Updated");
    });
});

exp.listen(3000, function () {
    console.log("Good Signal..!");
});


// Old and Re-used
/*
//To insert data in database :
exp.get('/insertdata', function (req, res) {
    // console.log(req.body);
    let input = {
        stdName: "Harish",
        stdRegNum: "2013032",
        phoneNum: "9345397706"
    }
    let sql = 'insert into `crud`.`student` set ?';
    connect.query(sql, input, function (err, result) {//,input.stdName,input.stdRegNum,input.phoneNum,
        if (err) throw err;
        res.send("Inserted...!");
    })
});
*/