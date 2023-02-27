const express=require('express');
const conn=require('./database/db');
const app = express();
const ejs=require('ejs');

app.set("view engine","ejs")

app.get('/',async(req,res)=>{

    const ids=['id','name','email','phone'];
    const result=await queryExecutor('SELECT * FROM design.dynamic_form;');
    res.render('form',{data:result,id:ids});
})

app.get('/id',async(req,res)=>{
    const result=await queryExecutor('select id from dynamic_form order by id DESC limit 1');
    res.json({id:result[0].id});
})

app.get('/update',async(req,res)=>{
    const values=req.query.values;
    const data=values.split(',');
    const result=await queryExecutor(`update design.dynamic_form set name='${data[1]}',email='${data[2]}',phone='${data[3]}' where dynamic_form.id=${parseInt(data[0])};`);
    res.send(result);
})
app.get('/insert',async(req,res)=>{
    const values=req.query.values;
    const data=values.split(',');
    console.log(data);
    const result=await queryExecutor(`INSERT INTO design.dynamic_form (id, name, email, phone) VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}');
    `);
    res.send(result);
})



const queryExecutor=(query) =>{
    return new Promise((resolve,reject)=>{
        conn.query(query,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})