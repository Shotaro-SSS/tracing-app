// 簡易ピクセル比較（α値無視版）
function calculateSimilarity(ctxRef, ctxDraw, width, height) {
  const dataRef  = ctxRef.getImageData(0,0,width,height).data;
  const dataDraw = ctxDraw.getImageData(0,0,width,height).data;

  let match = 0;
  const total = width * height;

  for(let i = 0; i < dataRef.length; i += 4) {
    // 完全に透明かどうかで簡易判定（α=0なら無視）
    if (dataRef[i+3] < 10) continue;   // お題が描かれていない部分

    // 簡易：色があるかどうかだけ見る（R,G,Bいずれか30以上なら塗られているとみなす）
    const refHasColor  = dataRef[i] > 30 || dataRef[i+1] > 30 || dataRef[i+2] > 30;
    const drawHasColor = dataDraw[i] > 30 || dataDraw[i+1] > 30 || dataDraw[i+2] > 30;

    if (refHasColor === drawHasColor) {
      match++;
    }
  }

  return Math.round((match / total) * 100);
}

export { calculateSimilarity };