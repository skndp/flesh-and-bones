import NoiseModule from 'noisejs';

export function createTornEdge ({
  width,
  height,
  startY,
  endY,
  wobble = 0.9,
  edgeRoughness = 6,
  step = 2,
  noiseScale = 0.01,
  fillColor = "#99ff33"
} = {}) {
  const sy = Number.isFinite(startY) ? startY : Math.random() * height;
  const ey = Number.isFinite(endY) ? endY : Math.random() * height;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.floor(width));
  canvas.height = Math.max(1, Math.floor(height));

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);

  const noise = new NoiseModule.Noise(Math.random());

  let x = 0;
  let y = sy;
  let angle = Math.atan2(ey - y, width);
  let t = Math.random() * 1000;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, sy);

  while (x < width) {
    const toGoal = Math.atan2(ey - y, width - x);
    const n1 = noise.perlin2(x * noiseScale, t);
    const n2 = noise.perlin2(x * noiseScale * 3, t * 2);

    angle = angle * 0.85 + (toGoal + n1 * wobble) * 0.15;

    x += Math.cos(angle) * step;
    y += Math.sin(angle) * step;

    const px = -Math.sin(angle);
    const py =  Math.cos(angle);
    const jag = (n2 * 0.5 + Math.random() * 0.5) * edgeRoughness;

    ctx.lineTo(x + px * jag, y + py * jag);

    t += 0.02;
  }

  ctx.lineTo(width, 0);
  ctx.closePath();

  ctx.fillStyle = fillColor;
  ctx.fill();

  return canvas.toDataURL('image/png');
}