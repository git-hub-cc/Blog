/**
 * worker.js
 * 这个脚本在后台线程中运行，独立于主UI线程。
 */

console.log('Worker 脚本已加载并准备就绪。');

/**
 * 寻找质数的函数（这是计算密集型任务）
 * @param {number} max - 计算上限
 * @returns {number} 找到的质数数量
 */
function findPrimes(max) {
    const primes = [];
    for (let i = 2; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(i);
        }
    }
    return primes.length;
}

// 监听来自主线程的消息
self.onmessage = function(event) {
    console.log('Worker 收到主线程消息:', event.data);

    const { command, max } = event.data;

    // 健壮性检查：确保收到了预期的指令
    if (command === 'start' && typeof max === 'number') {
        const result = findPrimes(max);

        // 将计算结果发送回主线程
        // 使用对象格式可以方便地扩展，例如添加状态等
        self.postMessage({
            type: 'result',
            data: result
        });
    } else {
        // 如果指令无效，可以发送一个错误消息回去
        self.postMessage({
            type: 'error',
            data: '无效的指令或参数'
        });
    }
};

// 可以在这里处理 worker 自身的错误
self.onerror = function(error) {
    console.error('Worker 内部发生错误:', error);
    // 可以在这里做一些清理工作
};