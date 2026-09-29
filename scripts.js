// ============================================================
// Nutridrink — lógica (plantilla base KONFÍO ZINC)
// QR dinámico 160x160 + vCard + compartir + año + service worker
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const qrEl = document.getElementById('qrcode');
  if (qrEl && typeof QRCode !== 'undefined') {
    new QRCode(qrEl, {
      text: window.location.href,
      width: 160,
      height: 160,
      colorDark: '#0f172a',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  const copiar = (texto) => {
    const ok = () => {};
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).catch(() => {});
    } else {
      const ta = document.createElement('textarea');
      ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      ta.remove();
    }
    ok();
  };

  // Compartir nativo con respaldo a copiar enlace
  document.getElementById('btn-share').addEventListener('click', async () => {
    const data = { title: 'Nutridrink', text: 'Alimento con Ciencia. Nutrición y Bienestar.', url: window.location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch (e) {}
    } else {
      copiar(window.location.href);
    }
  });

  // Guardar contacto (vCard)
  document.getElementById('btn-vcard').addEventListener('click', () => {
    const vCardData = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Juan Carlos Gaviria - Nutridrink\r\nORG:Nutridrink - Alimento con Ciencia\r\nTITLE:Nutrición y Bienestar\r\nTEL;TYPE=CELL:+573006050160\r\nADR;TYPE=WORK:;;Barrio Niza;Bogotá;;Colombia\r\nNOTE:Nutrición y Bienestar. Atención en Bogotá (Barrio Niza) y envíos nacionales.\r\nEND:VCARD';
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Juan_Carlos_Gaviria_Nutridrink.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  });

  // Año
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  // Service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
});
