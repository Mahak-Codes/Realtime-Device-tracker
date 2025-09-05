const express=require("express");
const app=express();
const port=8080;
const path=require("path")

const ejs=require("ejs");
app.set("view engine" ,"ejs");
app.use(express.static(path.join(__dirname,"public")));

const http=require("http");
const server=http.createServer(app);
const socketio=require("socket.io");
const io=socketio(server);

io.on("connection",function(socket){
    console.log("New client connected:", socket.id);
    socket.on("send-location",(data)=>{
        console.log("Received from:", socket.id, data.latitude, data.longitude);
        io.emit("recieved-location",{id:socket.id,...data});
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnect",socket.id);
    })
    
    console.log("Connected")
})

app.get("/",(req,res)=>{
    
    res.render("index");
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
