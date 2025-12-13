import NoiseModule from 'noisejs'

export const createTornEdge = (width, height, startX, startY, endX, endY, amplitude, frequency) => {
  const noise = new NoiseModule.Noise(Math.random());
  const cnv = document.createElement('canvas');
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const step = 3;
  const freqs = [0.002, 0.004, 0.006, 0.008, 0.01, 0.012, 0.014, 0.016, 0.018, 0.02];
  let ctx = cnv.getContext('2d');
  let noiseOffset = 0;
  let currentWaveAmplitude = 1 + Math.random() * 4;
  let currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];
  let period_x = ((2 * Math.PI) / currentWaveFrequency);

  cnv.width = width;
  cnv.height = height;
  ctx.beginPath();
  ctx.moveTo(startX, startY);

  console.log(cnv, ctx);

  for (let i = 0; i < distance; i += step) {
    const t = i / distance;
    const x = startX + (endX - startX) * t;
    const sin = Math.sin(currentWaveFrequency * x);
    const y = startY + currentWaveAmplitude * sin;
    
    if(x >= period_x) {
      currentWaveAmplitude = 1 + Math.random() * 4;
      currentWaveFrequency = freqs[Math.floor(Math.random() * freqs.length)];

      period_x = x + ((2 * Math.PI) / currentWaveFrequency);
    }

    const noiseValue = noise.perlin2(i * frequency, noiseOffset);

    const offsetX = (endY - startY) / distance * noiseValue * amplitude;
    const offsetY = (endX - startX) / distance * noiseValue * amplitude;

    ctx.lineTo(x + offsetX, y - offsetY);

    noiseOffset += 0.01;
  }

  ctx.lineTo(endX, endY);
  ctx.lineTo(endX, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, endY);
  ctx.fill();

  return cnv.toDataURL('image/png');
}