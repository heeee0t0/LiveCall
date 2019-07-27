var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users=[];
var connections = [];

function listAllUsers(){
    console.log("Users", users);
}

io.on('connection', function(socket){
    console.log("connected", socket.id );

    socket.on('userlogin', function (account) {
        var account=JSON.parse(account);
        console.log("account", account );
        users.push({id:socket.id, name:account.username, email:account.email, role:""});
        listAllUsers();
        if(users.length>1){
            socket.emit('getAllUsers', users);
        }
        socket.broadcast.emit('getAllUsers', users);
    });

    //listAllUsers();

    socket.on('joincall', function (user) {
        var from = users.find(x=>x.id==socket.id);
        connections.push({sender:from.id,receiver:user.id});
        io.to(user.id).emit('incomingcall', from);
    });

    socket.on('callreceived', function (user) {
        var from = users.find(x=>x.id==socket.id);
        connections.push({sender:from.id,receiver:user.id});
        io.to(user.id).emit('callreceived', from);
    });

    socket.on('offer', function (offer) {
        console.log("offer",offer);
        // get receiver id with offer
        var connection=(connections.find(x=>x.sender==socket.id));
        console.log("connection",connection);
        io.to(connection.receiver).emit('offer', offer);
        console.log("offeremited");
      });
  
      socket.on('answer', function (answer) {
        console.log("answer",answer);
        // get sender id with answer
        var sender=(connections.find(x=>x.receiver==socket.id)).sender;
        io.to(sender).emit('answer', answer);
        console.log("answeremited");
      });

    socket.on('disconnect',function(){
        // var user = users.find(x=>x.id==socket.id);
        // console.log("user",user)
        // socket.broadcast.emit('userDisconnected',user);
        // var newUsers = users.filter(x=>x.id!=user.id);
        // users=newUsers;
    })
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});