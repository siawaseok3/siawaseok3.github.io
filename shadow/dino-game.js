const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// キャンバスのサイズ
canvas.width = 225;
canvas.height = 105;

// 恐竜の画像の読み込み
const dinoImages = [
    new Image(),
    new Image()
];
dinoImages[0].src = '/anime/photo1/photo1.png'; // 恐竜の最初の画像
dinoImages[1].src = '/anime/photo2/photo2.png'; // 恐竜の2つ目の画像

const obstacleImage = new Image();
obstacleImage.src = '/anime/photo3/photo3.png'; // 障害物の画像

let currentImageIndex = 0;
let frameCount = 0;
const switchFrameInterval = 10; // この数値を変更して画像切り替え速度を調整

const dino = {
    x: 10,
    y: 60, 
    width: 20, 
    height: 20, 
    gravity: 0.6,
    jumpStrength: -5,
    velocityY: 0,
    isJumping: false,
    jump() {
        if (!this.isJumping) {
            this.velocityY = this.jumpStrength;
            this.isJumping = true;
        }
    },
    update() {
        if (this.isJumping) {
            this.y += this.velocityY;
            this.velocityY += this.gravity;

            if (this.y >= 60) {
                this.y = 60;
                this.isJumping = false;
            }
        }

        frameCount++;
        if (frameCount >= switchFrameInterval) {
            frameCount = 0;
            currentImageIndex = (currentImageIndex + 1) % dinoImages.length;
        }
    },
    draw() {
        ctx.drawImage(dinoImages[currentImageIndex], this.x, this.y, this.width, this.height);
    }
};

const obstacle = {
    x: canvas.width,
    y: 80, 
    width: 10, 
    height: 10, 
    speed: 2,
    isVisible: false,
    respawnDelay: 0,
    update() {
        if (this.isVisible) {
            this.x -= this.speed;

            
            if (this.x + this.width < 0) {
                this.isVisible = false;
                this.x = canvas.width;
                this.respawnDelay = Math.random() * 1000 + 1000; // 1〜2秒のランダム遅延
            }

            if (this.x < dino.x + dino.width && this.x + this.width > dino.x) {
                dino.jump();
            }
        } else {
            // 1〜2秒経過後に障害物を再表示
            if (this.respawnDelay > 0) {
                this.respawnDelay -= 16; // 16msごとに減らす（約60fps）
            } else {
                this.isVisible = true;
            }
        }
    },
    draw() {
        if (this.isVisible) {
            ctx.drawImage(obstacleImage, this.x, this.y, this.width, this.height);
        }
    }
};

// 床の設定（キャンバスの下端に設定）
const ground = {
    x: 0,
    y: 95, // キャンバスの高さに合わせて調整
    width: canvas.width,
    height: 5,
    color: "black",
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// アニメーションループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
    dino.update(); // 恐竜の位置更新
    dino.draw(); // 恐竜を描画
    obstacle.update(); // 障害物の位置更新
    obstacle.draw(); // 障害物を描画
    ground.draw(); // 床を描画

    requestAnimationFrame(gameLoop); // 次のフレームを要求
}

// 2秒後にアニメーション開始
setTimeout(() => {
    gameLoop();
}, 2000);
