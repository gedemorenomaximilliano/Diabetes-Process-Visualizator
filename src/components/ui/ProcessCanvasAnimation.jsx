import React, { useRef, useEffect } from 'react';

export default function ProcessCanvasAnimation({ organId, conditionMode, isPlaying = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let t = 0;

    // Set high DPI scale
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 320;
    const height = canvas.clientHeight || 180;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      if (isPlaying) t += 0.02;

      ctx.clearRect(0, 0, width, height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Grid / cellular membrane pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw specialized organ micro-process
      switch (organId) {
        case 'pancreas':
          drawPancreasProcess(ctx, width, height, t, conditionMode);
          break;
        case 'muscle':
          drawMuscleProcess(ctx, width, height, t, conditionMode);
          break;
        case 'liver':
          drawLiverProcess(ctx, width, height, t, conditionMode);
          break;
        case 'stomach':
          drawStomachProcess(ctx, width, height, t, conditionMode);
          break;
        case 'kidney':
          drawKidneyProcess(ctx, width, height, t, conditionMode);
          break;
        default:
          drawDefaultProcess(ctx, width, height, t);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [organId, conditionMode, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg bg-slate-950 block shadow-inner"
    />
  );
}

// 1. PANCREAS: Beta cell secretion / autoimmune attack
function drawPancreasProcess(ctx, w, h, t, mode) {
  // Draw Beta Cell Body
  ctx.save();
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w * 0.3, h * 0.5, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Nucleus
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.arc(w * 0.28, h * 0.5, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.font = '10px sans-serif';
  ctx.fillText('Beta Cell', w * 0.22, h * 0.52);

  // Capillary wall (Bloodstream)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.65, 10);
  ctx.lineTo(w * 0.65, h - 10);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = '9px sans-serif';
  ctx.fillText('Capillary', w * 0.68, 20);

  if (mode === 'type1') {
    // Killer T-Cells attacking
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.sin(t * 2 + i) * 0.3;
      const x = w * 0.3 + Math.cos(angle) * 55;
      const y = h * 0.5 + Math.sin(angle) * 55;

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();

      // Laser/attack line
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(w * 0.3, h * 0.5);
      ctx.stroke();
    }
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('Autoimmune Attack (Zero Insulin)', w * 0.32, h - 15);
  } else {
    // Normal or Type 2: Releasing Insulin granules
    const granuleCount = mode === 'type2' ? 12 : 7;
    for (let i = 0; i < granuleCount; i++) {
      const progress = ((t * 0.8 + i / granuleCount) % 1);
      const x = w * 0.35 + progress * (w * 0.3);
      const y = h * 0.5 + Math.sin(progress * 6 + i) * 15;

      ctx.fillStyle = '#38bdf8'; // Insulin molecule
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText('Insulin Granules Exocytosis', w * 0.36, h * 0.25);
  }
  ctx.restore();
}

// 2. MUSCLE / CELL: Insulin Receptor + GLUT4 Transporter
function drawMuscleProcess(ctx, w, h, t, mode) {
  ctx.save();
  // Cell membrane barrier
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(w * 0.45, 0);
  ctx.lineTo(w * 0.45, h);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '9px sans-serif';
  ctx.fillText('Extracellular', 10, 18);
  ctx.fillText('Intracellular', w * 0.52, 18);

  // Insulin Receptor (Y-shape on membrane)
  const recY = h * 0.35;
  ctx.strokeStyle = mode === 'type2' ? '#f59e0b' : '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.45, recY);
  ctx.lineTo(w * 0.40, recY - 12);
  ctx.moveTo(w * 0.45, recY);
  ctx.lineTo(w * 0.40, recY + 12);
  ctx.stroke();

  // GLUT4 Channel (Doorway on membrane)
  const channelY = h * 0.7;
  const isOpen = mode === 'normal';
  ctx.strokeStyle = isOpen ? '#10b981' : '#64748b';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(w * 0.45, channelY - 18);
  ctx.lineTo(w * 0.45, channelY - 6);
  ctx.moveTo(w * 0.45, channelY + 6);
  ctx.lineTo(w * 0.45, channelY + 18);
  ctx.stroke();

  ctx.fillStyle = isOpen ? '#34d399' : '#94a3b8';
  ctx.font = '9px sans-serif';
  ctx.fillText(isOpen ? 'GLUT4 Open' : 'GLUT4 Closed', w * 0.48, channelY + 4);

  // Glucose molecules attempting entry
  for (let i = 0; i < 6; i++) {
    const prog = ((t * 0.6 + i / 6) % 1);
    let gx, gy;
    if (isOpen) {
      gx = 20 + prog * (w * 0.7);
      gy = channelY + Math.sin(prog * 5) * 4;
    } else {
      // Rebound / bounce off locked door
      gx = 20 + Math.min(prog * 1.5, 0.4) * (w * 0.8);
      gy = channelY - 10 + i * 5;
    }

    ctx.fillStyle = '#fbbf24'; // Glucose
    ctx.beginPath();
    ctx.arc(gx, gy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Caption
  ctx.fillStyle = mode === 'normal' ? '#10b981' : '#f43f5e';
  ctx.font = 'bold 10px sans-serif';
  if (mode === 'normal') {
    ctx.fillText('Insulin unlocks GLUT4 -> Glucose absorbed', 15, h - 12);
  } else if (mode === 'type1') {
    ctx.fillText('No Insulin -> Lock cannot turn, Glucose barred', 15, h - 12);
  } else {
    ctx.fillText('Receptor Resistant -> Channel remains closed', 15, h - 12);
  }
  ctx.restore();
}

// 3. LIVER: Glycogen Storage / Gluconeogenesis
function drawLiverProcess(ctx, w, h, t, mode) {
  ctx.save();
  // Hepatocyte center
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('Hepatocyte', w * 0.42, h * 0.5);

  // Glycogen branched chain inside
  for (let i = 0; i < 7; i++) {
    const angle = (i * Math.PI) / 3.5;
    const r = 25;
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(w * 0.5 + Math.cos(angle) * r, h * 0.5 + Math.sin(angle) * r, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Floating glucose influx or efflux
  const isDumping = mode !== 'normal';
  for (let i = 0; i < 6; i++) {
    const prog = ((t * 0.6 + i / 6) % 1);
    const x = isDumping ? w * 0.5 + prog * (w * 0.4) : 20 + prog * (w * 0.35);
    const y = h * 0.3 + (i % 2) * 40;

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = isDumping ? '#f87171' : '#34d399';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(
    isDumping ? 'Liver Overproducing & Dumping Glucose' : 'Excess Glucose Stored as Glycogen',
    20,
    h - 12
  );
  ctx.restore();
}

// 4. STOMACH / GUT: Digestion breakdown
function drawStomachProcess(ctx, w, h, t) {
  ctx.save();
  // Complex polysaccharide chain entering
  ctx.fillStyle = '#94a3b8';
  ctx.font = '9px sans-serif';
  ctx.fillText('Dietary Starches (Carbs)', 15, 25);

  // Starch beads breaking apart
  for (let i = 0; i < 5; i++) {
    const x = 30 + i * 16;
    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(x, 45, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Enzyme scissors
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(115, 35);
  ctx.lineTo(135, 55);
  ctx.moveTo(135, 35);
  ctx.lineTo(115, 55);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = '9px sans-serif';
  ctx.fillText('Amylase Enzyme', 95, 75);

  // Single glucose units entering vein
  ctx.fillStyle = '#fbbf24';
  for (let i = 0; i < 8; i++) {
    const prog = ((t * 0.5 + i / 8) % 1);
    const x = 150 + prog * (w - 170);
    const y = 45 + Math.sin(prog * 6) * 15;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('Monosaccharide Glucose Enters Mesenteric Veins', 20, h - 15);
  ctx.restore();
}

// 5. KIDNEY: Filtration & SGLT2 Reabsorption
function drawKidneyProcess(ctx, w, h, t, mode) {
  ctx.save();
  // Glomerular filter line
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.4, 15);
  ctx.lineTo(w * 0.4, h - 25);
  ctx.stroke();

  ctx.fillStyle = '#c084fc';
  ctx.font = '9px sans-serif';
  ctx.fillText('Glomerulus & Tubule', 15, 20);
  ctx.fillText('Urine Output', w * 0.65, 20);

  // Glucose overflow check
  const spills = mode !== 'normal';
  for (let i = 0; i < 7; i++) {
    const prog = ((t * 0.5 + i / 7) % 1);
    let gx, gy;
    if (spills) {
      // Passes through into urine
      gx = 20 + prog * (w * 0.7);
      gy = 50 + (i % 3) * 20;
    } else {
      // Reabsorbed back to blood
      if (prog < 0.4) {
        gx = 20 + prog * (w * 0.8);
        gy = 50 + (i % 3) * 15;
      } else {
        gx = w * 0.4 - (prog - 0.4) * (w * 0.5);
        gy = 80 + (i % 2) * 20;
      }
    }

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(gx, gy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = spills ? '#f43f5e' : '#34d399';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(
    spills ? 'Threshold Exceeded: Glucosuria & Water Loss' : '100% Glucose Reabsorbed into Blood',
    20,
    h - 10
  );
  ctx.restore();
}

function drawDefaultProcess(ctx, w, h, t) {
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px sans-serif';
  ctx.fillText('Select an organ to inspect physiological mechanism', 20, h / 2);
}
