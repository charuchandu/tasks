const exp=require("express");
const app=exp();
const path=require("path");
const mongoclient=require("mongodb").MongoClient;

const dbUrl="mongodb+srv://chandu:K3aVJBegzuCkUe6@cluster0.uhoj0.mongodb.net/practice?retryWrites=true&w=majority"

app.use(exp.static(path.join(__dirname,'./dist/task')));

//importing apis 
const taskApiObj=require("./apis/taskapi");

//redirecting to apis
app.use("/task",taskApiObj);

//err handling
app.use((req,res,next)=>{
    res.send({message:"path not existed"})
})
app.use((err,req,res,next)=>{
    console.log(err);
    res.send({message:"something went wrong!!"})
})

mongoclient.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get db object
    const dbObj=client.db("practice");
    //get collection obmongoclientjects
    const taskCollectionObject=dbObj.collection("taskcollection");
    
    //add collection object to app object
    app.set("taskCollectionObject",taskCollectionObject);
    console.log("db connected successfully")

    

})
.catch(err=>{
    console.log("error in db connection",err)
})

const port=3500;
app.listen(port,()=> console.log("server is running on port",port));