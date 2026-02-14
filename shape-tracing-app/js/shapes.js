// お題データ（難易度ごと）
const shapes = {
  easy: [
    { type: "circle",   x:200, y:250, r:120, color:"#e91e63" },
    { type: "rect",     x:80,  y:130, w:240, h:240, color:"#2196f3" },
    { type: "triangle", x:200, y:250, size:180, color:"#ff9800" },
    // 星・ハートなども追加可能
  ],
  medium: [
    // 2つ重ね
    { type: "circle",   x:200, y:220, r:140, color:"#9c27b0" },
    { type: "rect",     x:100, y:180, w:200, h:200, color:"#ff5722", alpha:0.7 }
  ],
  hard: [
    // 3つ重ね
    { type: "star",     x:200, y:250, r:160, points:5, color:"#f44336" },
    { type: "circle",   x:180, y:220, r:100, color:"#3f51b5", alpha:0.6 },
    { type: "triangle", x:220, y:280, size:140, color:"#009688", rotation:30 }
  ]
};

// 描画関数例（ctxは呼び出し元から渡す）
function drawShape(ctx, shape) {
  ctx.save();
  ctx.globalAlpha = shape.alpha ?? 1;
  ctx.fillStyle = shape.color;
  ctx.strokeStyle = shape.color;

  switch(shape.type) {
    case "circle":
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI*2);
      ctx.fill();
      break;
    case "rect":
      ctx.fillRect(shape.x - shape.w/2, shape.y - shape.h/2, shape.w, shape.h);
      break;
    // triangle, starなどは各自実装（Path2Dを使うと便利）
    // ...
  }
  ctx.restore();
}

export { shapes, drawShape };