const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://127.0.0.1:1883")

// 模拟各个单车唯一id
var uuid = require('uuid')


setInterval(function() {
  // const value = Math.ceil(Math.random() * 60)
  uuid.v4()
  const value =  `{
    "bike_id": "${uuid.v4()}",
    "lock_status": 0,
    "break_status": 0,
    "brand_name": 1,
    "put_city": 1
  }`;
  client.publish("设备", value.toString(), { qos: 0, retain: true })
}, 3000)