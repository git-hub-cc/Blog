// server.js
const http = require('http');
const fs = require('fs');

const PORT = 3000;

http.createServer((req, res) => {

    // 1. 提供主页面
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream('./03index.html').pipe(res);
        return;
    }

    // 2. SSE 端点
    if (req.url === '/sse' && req.method === 'GET') {
        // 设置 SSE 必需的头部
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // 关键！
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // 发送一个欢迎消息 (可选，但良好实践)
        // 使用命名事件 'welcome'
        res.write('event: welcome\n');
        res.write('data: 连接成功！服务器已准备好发送事件。\n\n');

        // 每2秒发送一次模拟数据
        const intervalId = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            const cpuUsage = (Math.random() * 50 + 10).toFixed(2); // 10% - 60%
            const memoryUsage = (Math.random() * 40 + 30).toFixed(2); // 30% - 70%

            const data = {
                timestamp,
                cpu: cpuUsage,
                memory: memoryUsage
            };

            // SSE 消息格式:
            // event: <事件名>
            // data: <数据 (通常是 JSON 字符串)>
            // id: <唯一ID> (可选)
            // retry: <重连时间(毫秒)> (可选)
            // \n\n (结束符)
            res.write(`event: system_update\n`);
            res.write(`data: ${JSON.stringify(data)}\n\n`);

        }, 2000);

        // 当客户端关闭连接时，清理 interval
        req.on('close', () => {
            console.log('客户端已断开连接。');
            clearInterval(intervalId);
            res.end();
        });

        return;
    }

    // 404 Not Found
    res.writeHead(404);
    res.end();

}).listen(PORT, () => {
    console.log(`服务器正在运行于 http://localhost:${PORT}`);
    console.log('请将下面的 03index.html 文件保存在同一目录下，然后运行此服务器。');
});