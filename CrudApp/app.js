const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override")
const mongoose = require("mongoose");
const PostData = require("./models/post")
app.use(express.urlencoded({ extended: true })); // Ensure this is placed before any route
app.use(express.json()); // Ensure this is placed before any route
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));


mongoose.connect("mongodb://localhost:27017/CrudApp").then(()=>{
    console.log("db connected")
}).catch(()=>{
    console.log("Not connected")
})



app.get("/",async(req,res)=>{
    try {
        const posts = await PostData.find(); 
        res.render("index", { posts }); 
      } catch (err) {
        console.log(err);
        res.send("An error occurred");
      }
})

app.get("/create",(req,res)=>{
    res.render("create")
})
app.post("/create",async(req,res)=>{
    let{name,image,age}= req.body;

    const newPost = await PostData.create({
        name,image,age
    })
    
    await newPost.save()
    res.redirect("/")

})


app.get("/view/:id",async(req,res)=>{
    const {id} = req.params;
    const posts = await PostData.findById(id); 
    res.render("view",{posts})
})



app.delete("/:id", async(req,res)=>{
    const {id}= req.params;
    await PostData.findByIdAndDelete(id);
    res.redirect("/")
})

app.get("/edit/:id",async(req,res)=>{
    const {id} = req.params;
    const posts = await PostData.findById(id);
    res.render("edit",{posts})
})

app.put("/:id",async(req,res)=>{
    const {id} = req.params;
    await PostData.findByIdAndUpdate(id,{...req.body});
    res.redirect("/")
    
    
})
app.listen(3000,()=>{
    console.log("port conneted ")
})
