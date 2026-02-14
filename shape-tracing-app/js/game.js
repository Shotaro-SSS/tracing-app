import { shapes, drawShape } from './shapes.js';
import { calculateSimilarity } from './compare.js';

const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level') || 'easy';

const refCanvas  = document.getElementById('referenceCanvas');
const drawCanvas = document.getElementById('drawCanvas');
const ctxRef  = refCanvas.getContext('2d');
const ctxDraw = drawCanvas.getContext('2d');

let isDrawing = false;

// お題描画
shapes[level].forEach(s => drawShape(ctxRef, s));

// 描画イベント（マウス＋タッチ両対応）
function getPos(e) {
  const rect = drawCanvas.getBoundingClientRect();
  return {
    x: (e.clientX || e.touches[0].clientX) - rect.left,
    y: (e.clientY || e.touches[0].clientY) - rect.top
  };
}

drawCanvas.addEventListener('mousedown', e => { isDrawing = true; draw(e); });
drawCanvas.addEventListener('mousemove', draw);
drawCanvas.addEventListener('mouseup',   () => isDrawing = false);
drawCanvas.addEventListener('mouseout',  () => isDrawing = false);

// タッチ対応
drawCanvas.addEventListener('touchstart', e => { e.preventDefault(); isDrawing = true; draw(e); });
drawCanvas.addEventListener('touchmove',  e => { e.preventDefault(); draw(e); });
drawCanvas.addEventListener('touchend',   () => isDrawing = false);

function draw(e) {
  if (!isDrawing) return;
  const pos = getPos(e);
  
  ctxDraw.fillStyle = "#000";
  ctxDraw.beginPath();
  ctxDraw.arc(pos.x, pos.y, 8, 0, Math.PI*2);  // 太さ8pxの丸筆
  ctxDraw.fill();
}

// クリア
document.getElementById('clearBtn').onclick = () => {
  ctxDraw.clearRect(0,0,drawCanvas.width,drawCanvas.height);
};

// 判定
document.getElementById('finishBtn').onclick = () => {
  const score = calculateSimilarity(ctxRef, ctxDraw, 400, 500);
  localStorage.setItem('lastScore', score);
  window.location.href = 'result.html';
};

// ホームへ
document.getElementById('homeBtn').onclick = () => {
  window.location.href = 'index.html';
};