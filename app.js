const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", function(socket){
//     socket.on("send-location", function(data){
//         io.emit("receive-location",{id:socket.id, ...data})
//     })
    
//     socket.on("disconnect", function(){
//         io.emit("user-disconnected", socket.id);
//     })

// });

// io.on("connection", function(socket) {
//     console.log(`New client connected: ${socket.id}`);
    
//     socket.on("send-location", function(data) {
//         console.log(`Location received from ${socket.id}:`, data);
//         io.emit("receive-location", { id: socket.id, ...data });
//     });
    
//     socket.on("disconnect", function() {
//         console.log(`Client disconnected: ${socket.id}`);
//         io.emit("user-disconnected", socket.id);
//     });
// });



io.on("connection", function(socket) {
    console.log(`New client connected: ${socket.id}`);

    // Listen for location from clients
    socket.on("send-location", function(data) {
        // Emit the location to all connected clients, including the sender
        io.emit("receive-location", { id: socket.id, ...data });
        console.log(`Emitting location from ${socket.id}:`, data);
    });

    // Handle client disconnect
    socket.on("disconnect", function() {
        console.log(`Client disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", (req, res) =>{
    res.render("index");
})

server.listen(3000 , '0.0.0.0', ()=>{
    console.log("Sever listening at port 3000")
})