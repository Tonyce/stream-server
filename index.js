#!/bin/node

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 16547 }); // 随便开个端口
const fs = require('fs')


const { spawn } = require('child_process');

// const RTMP_SERVER = 'rtmp://localhost:1935/live/video';
const RTMP_SERVER = 'rtmp://localhost:1935/live/rfBd56ti2SMtYvSgD5xAV0YU99zampta7Z7S575KLkIZ9PYk';
// const RTMP_SERVER = "./test.flv"
// const UDP = "udp://127.0.0.1:9999"

wss.on('connection', (ws) => {

  const ffmpeg = spawn('ffmpeg', [
    // 从 stdin 中读入视频数据
    // '-re',
    // '-f', 'lavfi', 
    // '-i', 'anullsrc',

    "-i", "-",
    // '-i', './demo.flv',

    // 视频转码
    // 由于视频已经是 H.264 编码，可以直接复制
    // 若需要转码则填 libx264
    '-vcodec', "copy",
    // "-c", "copy",
    // 音频转码
    '-acodec', 'aac',

    // 输出为 flv 格式
    '-f', 'flv',

    // RTMP 服务器
    RTMP_SERVER
    // UDP
  ]);

  ffmpeg.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  ffmpeg.stdout.on('data', (d) => {
      console.log(d)
      console.log("=====")
  })

  ws.on('message', (msg) => {
    // 收到时 msg 的类型是 Buffer
    // console.log({msg})
    ffmpeg.stdin.write(msg);
    // fs.appendFile('./test.flv', msg, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //   });
      
  });
  
  ws.on('close', (e) => {
    // 断开链接即中断推流
    ffmpeg.kill('SIGINT');
  });

});
