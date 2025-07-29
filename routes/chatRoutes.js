const {handleMessage}=require("../controllers/chatController");
function socketRoutes(io){
    io.on("connection",(socket)=>{
        console.log("User connected",socket.id);

        // socket.on("send_message",(data)=>handleMessage(socket,data));
        socket.on("userMessage", (data) => handleMessage(socket, data));

        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);

        })
    })
}

module.exports=socketRoutes;
