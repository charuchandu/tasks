const exp=require("express");
const taskRouteObj=exp.Router();

//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');



//configure cloudinary
cloudinary.config({
    cloud_name: "dsovo9zd2",
    api_key: "783754171231941",
    api_secret: "-cNgfluzLOdJDdoiQjDcw4G1aHM"
});




//configure storage setting
var clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'taskfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configure multer
var multerObj = multer({ storage: clStorage });


taskRouteObj.use(exp.json());

taskRouteObj.post("/taskInput",multerObj.single("photo"),(req,res)=>{
    //get cdn links from cloudinary
    let image=req.file.path;

    
    console.log("taskObject is:",req.body.taskObject);

    let task=JSON.parse(req.body.taskObject);
    task.photo=image;
    console.log(task);

    const taskObj=task;
    console.log(taskObj);

    //get product colletion object
    const taskCollectionObject=req.app.get("taskCollectionObject");

    taskCollectionObject.findOne({taskName:taskObj.taskName})
    .then(taskObject=>{
        if(taskObject==null){
         taskCollectionObject.insertOne(taskObj)
         .then((success)=>{
            res.send({message:"task added successfully"})
         })
         .catch(err=>console.log("error in adding",err))
        }
        else{
            res.send({message:"task already existed"})
        }

    })
    .catch(
        err=>console.log("err in reading user",err)
    )

})

//get all tasks
taskRouteObj.get("/allTasks",(req,res)=>{
    //get task collection object
    const taskCollectionObject=req.app.get("taskCollectionObject");
    taskCollectionObject.find().toArray()
    .then(
        taskArray=>res.send({message:"success",tasks:taskArray})
    )
    .catch(err=>{
        res.send({message:"err"})
    })
})

//delete 
taskRouteObj.delete("/deletetask/:taskName",(req,res)=>{
   // let deleteObj=req.body;
    let paramsid=req.params;
    console.log(paramsid);
    //delete one
   const taskCollectionObject=req.app.get("taskCollectionObject");
    taskCollectionObject.deleteOne({taskName:paramsid.taskName})
   .then(
        taskCollectionObject.find().toArray()
        .then(
           taskArray=>res.send({message:"success",tasks:taskArray})
        )
        .catch(err=>{
         res.send({message:"err"})
        } )

    )
    .catch(err=>console.log(err))
})

taskRouteObj.put("/updateTask",(req,res)=>{
    let modifiedTaskObj=req.body;
    console.log(modifiedTaskObj);
    //get user collection object
    const taskCollectionObject=req.app.get("taskCollectionObject");

    taskCollectionObject.updateOne({taskName:modifiedTaskObj.taskName},{
        $set:{status:modifiedTaskObj.status}
    })
    
    .then(()=>{
        const taskCollectionObject=req.app.get("taskCollectionObject");
        taskCollectionObject.find().toArray()
        .then(taskArray=>res.send({message:"update success",tasks:taskArray}))
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
})



module.exports=taskRouteObj;