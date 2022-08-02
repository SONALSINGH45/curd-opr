const  express = require("express")
const students=require("./students")
const createConnection = require("typeorm")
createConnection({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"root",
    database:"studentsdata",
    synchronize:true
}).then(()=>{
    console.log("connected")
}).catch((e)=>{
    console.log("error:" +e);
})




const app = express()
//app.use(cors());

app.use(express.json());

app.listen(5000,()=>{
    console.log("listining")
})

// GET METHOD
app.get('/',(req,res)=>{
    //res.send("hello")
    res.json({msg:"api called"})
})
app.get('/students',(req,res)=>{
    //res.send("hello")
    res.json(students)
})
/// POST METHOD
app.post('/students',(req,res)=>{
    //console.log(req.body);
    if(!req.body.email){
        res.status(400)
       return res.json({error:"email required"})
    }
    const user =[{
        id:students.length+1,
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    }]
    //students.push(user)
    res.json(user)
})

//DELETE METHOD
app.delete('/students/:id',(req,res)=>{
    let id = req.params.id;
    let index=students.findIndex((student)=>{
        return(student.id==Number.parseInt(id))
    })
    if(index>=0){
        let std = students[index]
        students.splice(index,1)
        res.json(std)
    }
    else{
        res.status(404)
    }
})

//PATCH METHOD 
app.patch('/students/:id',(req,res)=>{
    let id = req.params.id;
    const{first_name,last_name,email}=req.body;
    const student=students.find((student)=> student.id==id)
    if(first_name) student.first_name=first_name
    if(last_name) student.last_name=last_name
    if(email) student.email=email
res.send("changed")

})