const app = require('./app')

require('./app/database')

const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log(`服务器在端口${config.APP_PORT}启动成功~`);
})


const mosca = require('mosca')
const MqttServer = new mosca.Server({
  port: 1883
})
MqttServer.on("clientConnected", function(client) {
  //当有客户端连接时的回调.
  console.log("client connected", client.id);
})
MqttServer.on("published", function(packet, client) {
  var topic = packet.topic
  switch(topic) {
    case "temperature":
      break;
    case "other":
      console.log("message-123", packet.payload.toString());
      break;
  }
})

MqttServer.on("ready", function() {
  console.log("mqtt is running...");
})
