const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// キャンバスのサイズを縦105px、横225pxに設定
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

// 恐竜の設定（キャンバス内に収まるようにサイズ調整）
const dino = {
    x: 10,
    y: 60, // キャンバスの高さに合わせて調整
    width: 20, // 横幅
    height: 20, // 縦幅
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

            // 着地時にジャンプを終了
            if (this.y >= 60) {
                this.y = 60;
                this.isJumping = false;
            }
        }

        // 画像の切り替え
        frameCount++;
        if (frameCount >= switchFrameInterval) {
            frameCount = 0;
            currentImageIndex = (currentImageIndex + 1) % dinoImages.length; // 画像を交互に切り替え
        }
    },
    draw() {
        ctx.drawImage(dinoImages[currentImageIndex], this.x, this.y, this.width, this.height);
    }
};

// 障害物の設定（キャンバス内に収まるようにサイズ調整）
const obstacle = {
    x: canvas.width,
    y: 80, // キャンバスの高さに合わせて調整
    width: 10, // 横幅
    height: 10, // 縦幅
    speed: 2,
    isVisible: false,
    respawnDelay: 0,
    update() {
        if (this.isVisible) {
            this.x -= this.speed;

            // 障害物が画面外に出たら消す
            if (this.x + this.width < 0) {
                this.isVisible = false;
                this.x = canvas.width;
                this.respawnDelay = Math.random() * 1000 + 1000; // 1〜2秒のランダム遅延
            }

            // 恐竜との距離が狭まったらジャンプ
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
    y: 98, // キャンバスの高さに合わせて調整
    width: canvas.width,
    height: 5, // 床の高さを細く調整
    color: "black",
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

// アニメーションループ
function gameLoop() {
    ctx.fillStyle = "white"; // キャンバス背景を白に設定
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 背景を塗りつぶす

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
