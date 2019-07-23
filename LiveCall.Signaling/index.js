var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users=[];

function listAllUsers(){
    console.log("Users", users);
}

io.on('connection', function(socket){
    console.log("connected", socket.id );

    socket.on('userlogin', function (userData) {
        var userData=JSON.parse(userData);
        console.log("userData", userData );
        users.push({id:socket.id, name:userData.username ,email:userData.email,role:""});
        listAllUsers();
        socket.emit('getAllUsers', users);
        socket.broadcast.emit('getAllUsers', users);
    });

    //listAllUsers();

    socket.on('joincall', function (user) {
        io.to(user.id).emit('incomingcall', user);
    });

    socket.on('offer', function (offer) {
        console.log("offer",offer);
        // get receiver id with offer
        //io.to(receiver.id).emit('offer', offer);
        console.log("offeremited");
      });
  
      socket.on('answer', function (answer) {
        console.log("answer",answer);
        // get sender id with answer
        //io.to(sender.id).emit('answer', answer);
        console.log("answeremited");
      });

    socket.on('disconnect',function(){
        var user = users.find(x=>x.id==socket.id);
        console.log("user",user)
        socket.broadcast.emit('userDisconnected',user);
        var newUsers = users.filter(x=>x.id!=user.id);
        users=newUsers;
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});