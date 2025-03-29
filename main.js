// Tab切换功能
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有active类
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // 添加active类到当前tab
        tab.classList.add('active');
        document.getElementById(tab.dataset.section).classList.add('active');
    });
});

// 上传功能
const uploadBtn = document.getElementById('uploadBtn');
const uploadPreview = document.getElementById('uploadPreview');
const uploadLoading = document.getElementById('uploadLoading');
const toast = document.getElementById('toast');

uploadBtn.addEventListener('click', () => {
    // 模拟文件选择
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadPreview.querySelector('img').src = e.target.result;
                uploadPreview.style.display = 'block';
                uploadLoading.style.display = 'block';
                
                // 模拟上传和分析过程
                setTimeout(() => {
                    uploadLoading.style.display = 'none';
                    showToast('化验单分析完成！');
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// 发布功能
const publishBtn = document.getElementById('publishBtn');
const publishModal = document.getElementById('publishModal');
const modalClose = document.getElementById('modalClose');

publishBtn.addEventListener('click', () => {
    publishModal.style.display = 'block';
});

modalClose.addEventListener('click', () => {
    publishModal.style.display = 'none';
});

publishModal.addEventListener('click', (e) => {
    if (e.target === publishModal) {
        publishModal.style.display = 'none';
    }
});

// 视频播放按钮点击
document.querySelectorAll('.video-play-button').forEach(button => {
    button.addEventListener('click', () => {
        const videoContainer = button.parentElement;
        const img = videoContainer.querySelector('img');
        const video = document.createElement('video');
        video.src = 'https://example.com/demo-video.mp4'; // 这里替换为实际视频地址
        video.controls = true;
        video.autoplay = true;
        videoContainer.replaceChild(video, img);
        button.style.display = 'none';
    });
});

// 点赞功能
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const count = btn.querySelector('.like-count');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = '#ff3b30';
            count.textContent = parseInt(count.textContent) + 1;
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
            count.textContent = parseInt(count.textContent) - 1;
        }
    });
});

// 生成随机头像
function generateRandomAvatar() {
    const styles = ['adventurer', 'bottts', 'avataaars', 'lorelei'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
}

// 更新所有头像
function updateAvatars() {
    document.querySelectorAll('.avatar img').forEach(img => {
        img.src = generateRandomAvatar();
    });
}

// 创建趋势图
function createTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // 模拟数据
    const data = {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                label: '血糖值',
                data: [5.4, 5.6, 5.3, 5.8, 5.5, 5.4, 5.2, 5.3, 5.4, 5.3, 5.2, 5.1],
                borderColor: 'rgb(0, 122, 255)',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: '血压值',
                data: [125, 128, 122, 126, 124, 123, 121, 120, 122, 121, 120, 119],
                borderColor: 'rgb(255, 59, 48)',
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: '胆固醇',
                data: [4.8, 4.9, 4.7, 4.8, 4.6, 4.5, 4.4, 4.3, 4.4, 4.3, 4.2, 4.1],
                borderColor: 'rgb(52, 199, 89)',
                backgroundColor: 'rgba(52, 199, 89, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(1);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    };

    new Chart(ctx, config);
}

// 显示提示信息
function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

// 模拟数据加载
function loadData() {
    showToast('数据加载完成');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateAvatars();
    createTrendChart();
}); 