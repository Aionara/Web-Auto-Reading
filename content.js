(function () {
    let timer = null;
    let i = 0;
    let loopCount = 0;
    let panel = null;

    // 创建控制面板函数
    function createPanel() {
        if (panel) return; // 已存在则不重复创建
        panel = document.createElement('div');
        panel.style.position = 'fixed';
        panel.style.top = '20px';
        panel.style.right = '20px';
        panel.style.background = '#fff';
        panel.style.border = '1px solid #ccc';
        panel.style.borderRadius = '8px';
        panel.style.padding = '15px';
        panel.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        panel.style.zIndex = '999999';
        panel.style.fontFamily = 'sans-serif';
        panel.style.width = '220px';

        // 标题
        const title = document.createElement('h3');
        title.innerText = '📖自动阅读器📖';
        title.style.margin = '0 0 10px 0';
        title.style.fontSize = '16px';
        title.style.textAlign = 'center';
        panel.appendChild(title);

        // 速度设置
        const speedLabel = document.createElement('label');
        speedLabel.innerText = '速度（毫秒）：';
        speedLabel.style.display = 'block';
        speedLabel.style.marginBottom = '5px';
        const speedInput = document.createElement('input');
        speedInput.type = 'number';
        speedInput.value = 1800;
        speedInput.style.width = '100%';
        speedInput.style.marginBottom = '10px';
        panel.appendChild(speedLabel);
        panel.appendChild(speedInput);

        // 滑动距离设置
        const distanceLabel = document.createElement('label');
        distanceLabel.innerText = '滑动距离参数（像素）：';
        distanceLabel.style.display = 'block';
        distanceLabel.style.marginBottom = '5px';
        const distanceInput = document.createElement('input');
        distanceInput.type = 'number';
        distanceInput.value = 2800;
        distanceInput.style.width = '100%';
        distanceInput.style.marginBottom = '15px';
        panel.appendChild(distanceLabel);
        panel.appendChild(distanceInput);

        // 按钮容器
        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'space-between';
        btnContainer.style.gap = '10px';

        // 开始按钮
        const startBtn = document.createElement('button');
        startBtn.innerText = '▶️ 开始';
        startBtn.style.flex = '1';
        startBtn.style.background = '#007bff';
        startBtn.style.color = '#fff';
        startBtn.style.border = 'none';
        startBtn.style.padding = '8px 0';
        startBtn.style.borderRadius = '4px';
        startBtn.style.cursor = 'pointer';

        // 停止按钮
        const stopBtn = document.createElement('button');
        stopBtn.innerText = '⏹️ 停止';
        stopBtn.style.flex = '1';
        stopBtn.style.background = '#007bff';
        stopBtn.style.color = '#fff';
        stopBtn.style.border = 'none';
        stopBtn.style.padding = '8px 0';
        stopBtn.style.borderRadius = '4px';
        stopBtn.style.cursor = 'pointer';

        btnContainer.appendChild(startBtn);
        btnContainer.appendChild(stopBtn);
        panel.appendChild(btnContainer);

        document.body.appendChild(panel);

        // 滚动逻辑
        function startScrolling() {
            const speed = parseInt(speedInput.value, 10);
            const distanceFactor = parseInt(distanceInput.value, 10);
            i = 0;
            loopCount = 0;
            clearInterval(timer);
            timer = setInterval(() => {
                const scrollStep = document.body.scrollHeight / distanceFactor * i;
                window.scrollTo(0, scrollStep);
                i++;
                if (window.innerHeight + window.scrollY >= Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 5) {
                    loopCount++;
                    i = 0;
                    window.scrollTo(0, 0);
                }
            }, speed);
        }

        function stopScrolling() {
            clearInterval(timer);
            i = 0;
            loopCount = 0;
        }

        // 事件绑定
        startBtn.addEventListener('click', startScrolling);
        stopBtn.addEventListener('click', stopScrolling);
    }

    // 移除面板函数
    function removePanel() {
        if (panel) {
            panel.remove();
            panel = null;
            clearInterval(timer);
            i = 0;
            loopCount = 0;
        }
    }

    // 监听来自 background.js 的消息
    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "showPanel") {
            createPanel();
        } else if (message.action === "hidePanel") {
            removePanel();
        }
    });
})();
