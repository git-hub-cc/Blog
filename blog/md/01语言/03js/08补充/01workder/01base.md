好的，这是一个包含了 HTML 和 `worker.js` 的完整示例。它通过一个计算密集型任务（寻找质数）来直观地展示 Web Worker 的作用：防止主线程（UI）被阻塞。

### 项目结构

你只需要创建两个文件：

1.  `index.html` (主页面和界面逻辑)
2.  `worker.js` (后台计算任务)

---

### `index.html`

这个文件包含了页面的所有内容：HTML 结构、CSS 样式和与用户界面交互的 JavaScript。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Worker 直观体验</title>
    <style>
        :root {
            --primary-color: #007bff;
            --secondary-color: #6c757d;
            --success-color: #28a745;
            --danger-color: #dc3545;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --border-radius: 8px;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #e9ecef;
            color: var(--dark-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        }

        .container {
            background-color: white;
            padding: 30px;
            border-radius: var(--border-radius);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            max-width: 700px;
            width: 100%;
            text-align: center;
        }

        h1 {
            color: var(--primary-color);
            margin-bottom: 15px;
        }

        p {
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .controls {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 25px;
        }

        button {
            padding: 12px 25px;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: all 0.3s ease;
            color: white;
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        #blockingBtn {
            background-color: var(--danger-color);
        }
        #blockingBtn:hover:not(:disabled) {
            background-color: #c82333;
            transform: translateY(-2px);
        }

        #workerBtn {
            background-color: var(--success-color);
        }
        #workerBtn:hover:not(:disabled) {
            background-color: #218838;
            transform: translateY(-2px);
        }

        .animation-box {
            margin: 20px auto;
            width: 80px;
            height: 80px;
            background-color: var(--primary-color);
            border-radius: var(--border-radius);
            animation: spin 3s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); border-radius: 50%;}
            100% { transform: rotate(360deg) scale(1); }
        }

        .output {
            margin-top: 20px;
            background-color: var(--light-color);
            padding: 20px;
            border-radius: var(--border-radius);
            text-align: left;
            border: 1px solid #dee2e6;
        }

        .output p {
            margin: 0;
            word-break: break-all;
        }

        .output span {
            font-weight: bold;
            font-family: "Courier New", Courier, monospace;
        }
        
        #status.calculating { color: var(--primary-color); }
        #status.idle { color: var(--secondary-color); }
        #status.done { color: var(--success-color); }
        
    </style>
</head>
<body>

    <div class="container">
        <h1>Web Worker 直观体验</h1>
        <p>
            观察下方的蓝色旋转动画。点击“阻塞主线程”按钮，动画会因为主线程忙于计算而卡住。
            点击“使用 Worker”，计算将在后台线程进行，动画会保持流畅。
        </p>
        
        <div class="animation-box"></div>

        <div class="controls">
            <button id="blockingBtn">开始计算 (阻塞主线程)</button>
            <button id="workerBtn">开始计算 (使用 Worker)</button>
        </div>

        <div class="output">
            <p>状态: <span id="status" class="idle">空闲</span></p>
            <p>耗时: <span id="time">N/A</span></p>
            <p>找到的质数数量: <span id="result">N/A</span></p>
        </div>
    </div>

    <script>
        // --- DOM 元素获取 ---
        const blockingBtn = document.getElementById('blockingBtn');
        const workerBtn = document.getElementById('workerBtn');
        const statusEl = document.getElementById('status');
        const timeEl = document.getElementById('time');
        const resultEl = document.getElementById('result');

        // --- 计算参数 ---
        const MAX_PRIME_NUMBER = 1000000; // 计算100万以内的质数

        // --- 状态管理 ---
        let isCalculating = false;
        let myWorker = null;

        /**
         * 更新UI状态
         * @param {boolean} calculating - 是否正在计算
         * @param {string} statusText - 显示的状态文本
         * @param {string} statusClass - 状态文本的CSS class
         */
        function setUIState(calculating, statusText, statusClass) {
            isCalculating = calculating;
            blockingBtn.disabled = calculating;
            workerBtn.disabled = calculating;
            
            statusEl.textContent = statusText;
            statusEl.className = statusClass;

            if (!calculating) {
                // 如果计算结束，重置结果
                if (statusClass === 'idle') {
                    timeEl.textContent = 'N/A';
                    resultEl.textContent = 'N/A';
                }
            }
        }
        
        /**
         * 寻找质数的函数（在主线程中运行以演示阻塞）
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

        // --- 事件监听 ---

        // 1. 阻塞主线程的按钮
        blockingBtn.addEventListener('click', () => {
            if (isCalculating) return;

            setUIState(true, `计算中 (UI已阻塞)...`, 'calculating');

            // 使用 setTimeout(..., 0) 确保UI有机会在阻塞前更新
            // 否则，你甚至看不到 "计算中" 的状态
            setTimeout(() => {
                const startTime = performance.now();
                const primeCount = findPrimes(MAX_PRIME_NUMBER);
                const endTime = performance.now();
                const duration = ((endTime - startTime) / 1000).toFixed(2);
                
                resultEl.textContent = primeCount;
                timeEl.textContent = `${duration} 秒`;
                setUIState(false, '计算完成 (主线程)', 'done');
            }, 0);
        });

        // 2. 使用 Worker 的按钮
        workerBtn.addEventListener('click', () => {
            if (isCalculating) return;
            
            setUIState(true, `计算中 (UI流畅)...`, 'calculating');
            const startTime = performance.now();
            
            // 健壮性：确保 Worker 实例存在
            if (!myWorker) {
                console.log('创建一个新的 Worker 实例');
                myWorker = new Worker('worker.js');

                // 监听来自 Worker 的消息
                myWorker.onmessage = (event) => {
                    const { type, data } = event.data;

                    if (type === 'result') {
                        const endTime = performance.now();
                        const duration = ((endTime - startTime) / 1000).toFixed(2);
                        
                        resultEl.textContent = data;
                        timeEl.textContent = `${duration} 秒`;
                        setUIState(false, '计算完成 (Worker)', 'done');
                    }
                };

                // 监听 Worker 的错误
                myWorker.onerror = (error) => {
                    console.error('Worker 发生错误:', error);
                    setUIState(false, `错误: ${error.message}`, 'idle');
                };
            }
            
            // 向 Worker 发送消息，开始计算
            myWorker.postMessage({
                command: 'start',
                max: MAX_PRIME_NUMBER
            });
        });

        // 健壮性：在页面关闭前终止 worker，防止内存泄漏
        window.addEventListener('beforeunload', () => {
            if (myWorker) {
                myWorker.terminate();
                console.log('页面关闭，Worker 已终止。');
            }
        });

    </script>
</body>
</html>

```

---

### `worker.js`

这个文件独立于主线程运行，负责执行耗时的计算任务。

```javascript
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
```

### 如何运行和体验

1.  将上述两个文件 (`index.html` 和 `worker.js`) 放在同一个文件夹中。
2.  **非常重要：** 由于安全限制（CORS策略），直接在浏览器中通过 `file://` 协议打开 `index.html` 可能无法加载 Worker。你需要通过一个本地服务器来运行它。
    *   **简单方法 (如果你有 VS Code):** 安装 "Live Server" 扩展，右键点击 `index.html` 并选择 "Open with Live Server"。
    *   **如果你安装了 Node.js:** 在终端中进入该文件夹，运行 `npx serve`，然后访问浏览器中显示的地址（通常是 `http://localhost:3000`）。
    *   **如果你安装了 Python:** 在终端中进入该文件夹，运行 `python -m http.server` (Python 3) 或 `python -m SimpleHTTPServer` (Python 2)，然后访问 `http://localhost:8000`。
3.  打开页面后，你将看到一个旋转的蓝色方块。
    *   点击 **“开始计算 (阻塞主线程)”** 按钮。你会发现整个页面（包括旋转动画）都卡住了，直到计算完成，页面才会恢复响应。
    *   刷新页面，然后点击 **“开始计算 (使用 Worker)”** 按钮。你会发现，即使在计算过程中，旋转动画依然流畅无比。计算完成后，结果会正常显示。

这个对比鲜明地展示了 Web Worker 的核心价值：将耗时任务从主线程中分离，保证用户界面的流畅和响应。