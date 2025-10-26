.matrix-bg
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #000
  overflow: hidden
  z-index: -1

.matrix-rain
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none

.rain-drop
  position: absolute
  top: -50px
  color: #0f0
  font-family: 'Courier New', monospace
  font-size: 14px
  animation: fall linear infinite
  text-shadow: 0 0 5px #0f0

@keyframes fall
  to
    transform: translateY(100vh)
    opacity: 0
class MatrixRain {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.matrixBg = document.querySelector('.matrix-bg');
    
    this.init();
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.matrixBg.appendChild(this.canvas);

    this.columns = Math.floor(this.canvas.width / 20);
    this.drops = Array(this.columns).fill(1);
    
    this.rain();
  }

  rain() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = '15px monospace';

    for (let i = 0; i < this.drops.length; i++) {
      const text = Math.random() > 0.5 ? '1' : '0';
      const x = i * 20;
      const y = this.drops[i] * 20;
      
      this.ctx.fillText(text, x, y);
      
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }
    
    requestAnimationFrame(() => this.rain());
  }
}

// 初始化矩阵雨
document.addEventListener('DOMContentLoaded', () => {
  new MatrixRain();
});

