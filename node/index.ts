import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import type { Request, Response, NextFunction } from "express";
import type {RowDataPacket} from "mysql2";
const app = express();
const select = "mycodeBest"
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.body);
    next();
})

function jwt1 (req:Request,res:Response,next:NextFunction){
    try{
    if(!req.headers.authorization)return next();
    const token = req.headers.authorization.split(" ")[1];

    const jwttrue = jwt.verify(token,select);
    
    res.status(200).json({
        success:true,
        data:jwttrue
    })
    }catch(e){
        console.log(e);
        return next();
    }

}

app.post('/register',async (req,res)=>{
    try{
    const {username,password} = req.body;
    const connection = await mysql.createConnection({
        host:"127.0.0.1",
        database:"system",
        user:"li",
        password:"1126"
    })

    const bcryptPassword = await bcrypt.hash(password,10);

    const [write] = await connection.execute("INSERT INTO users (username,password) VALUES(?,?)",[username,bcryptPassword]);

    console.log("这个是",write);

    const [id] = await connection.execute("SELECT id FROM users WHERE username = ?",[username]);

    console.log("这个是id",id);

    res.status(200).json({
        success:true
    });
    }
    catch(e){
        res.status(404).json({
            success:false,
            message:`${e}`
        })
    }

})

app.post('/login',async (req,res)=>{
try{
    const {username,password} = req.body;
    const connection = await mysql.createConnection({
        host:"127.0.0.1",
        database:"system",
        user:"li",
        password:"1126"
    })

    const [search] = await connection.execute<RowDataPacket[]>("SELECT password FROM users WHERE username = ?",[username]);

    const [id] = await connection.execute<RowDataPacket[]>("SELECT id FROM users WHERE username = ?",[username]);


    console.log(search[0].password);

    const pwverify = await bcrypt.compare(password,search[0].password);


    if(!pwverify){
        return(
            res.status(404).json({
            success:false,
            message:"账号密码错误,请重试"
        })
        );
    }
    const jwttrue = jwt.sign({id:id[0].id,user:username},select,{expiresIn:'1h'});

    res.status(200).json({
        success:true,
        data:{jwt:jwttrue,id:id[0].id},
        message:"ok"
    })
    
}catch(e){
    res.status(403).json({
        success:false,
        message:"未知错误"
    })
}
})


app.listen(3000,()=>{
    console.log("监听3000端口");
})

