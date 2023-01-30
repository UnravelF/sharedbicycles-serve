const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://127.0.0.1:1883");

// const bicycleService = require('./service/bicycle.service')


client.on("connect", function () {
  console.log("服务器连接成功");
  client.subscribe("设备", { qos: 1 });
});
client.on("message", function (top, message) {
  console.log("当前topic：", top);
  console.log("当前设备：", JSON.parse(message.toString()));

  // bicycleService.addBicycleData(JSON.parse(message.toString()))
});


