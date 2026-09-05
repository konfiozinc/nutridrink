document.addEventListener('DOMContentLoaded', () => {
            // Ocultar Splash Screen
            setTimeout(() => { 
                const s = document.getElementById('splash'); 
                if(s) { 
                    s.style.opacity = '0'; 
                    setTimeout(() => s.style.display = 'none', 400); 
                } 
            }, 1000);

            // Modales
            const setupModal = (targetId, modalId) => {
                const trigger = document.getElementById(targetId); 
                const modal = document.getElementById(modalId); 
                if (!trigger || !modal) return;
                
                trigger.addEventListener('click', (e) => { 
                    e.preventDefault(); 
                    modal.classList.add('active'); 
                });
                
                modal.querySelector('.modal-close').addEventListener('click', () => modal.classList.remove('active'));
                modal.addEventListener('click', (e) => { if(e.target === modal) modal.classList.remove('active'); });
            };

            setupModal('nav-services', 'modal-services'); 
            setupModal('btn-open-catalog', 'modal-services');
            setupModal('nav-events', 'modal-events');
            setupModal('btn-trigger-events', 'modal-events');
            setupModal('nav-coverage', 'modal-coverage'); 
            setupModal('nav-testimonials', 'modal-testimonials'); 
            setupModal('nav-share', 'modal-qr');

            // Código QR adaptado
            const urlReal = window.location.href;
            const qrBox = document.getElementById("qrcode"); 
            if(qrBox) { 
                new QRCode(qrBox, { 
                    text: urlReal, 
                    width: 130, 
                    height: 130, 
                    colorDark : "#0284c7", 
                    colorLight : "#ffffff", 
                    correctLevel : QRCode.CorrectLevel.H 
                }); 
            }

            // Descarga de vCard
            const btnVcard = document.getElementById('btn-vcard');
            const toast = document.getElementById('toast');

            if(btnVcard) {
                btnVcard.addEventListener('click', () => {
                    const vcardData = [
                        "BEGIN:VCARD",
                        "VERSION:3.0",
                        "FN:Juan Carlos Gaviria - Nutridrink",
                        "ORG:Nutridrink - Alimento con Ciencia",
                        "TITLE:Nutrición y Bienestar",
                        "TEL;TYPE=CELL;TYPE=PREF:+573006050160",
                        "ADR;TYPE=WORK:;;Barrio Niza;Bogotá;;Colombia",
                        "NOTE:Contacto guardado desde Tarjeta Digital Profesional.",
                        "END:VCARD"
                    ].join("\r\n");

                    const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = "Juan_Carlos_Gaviria_Nutridrink.vcf";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    if(toast) {
                        toast.innerText = "¡Contacto guardado con éxito!";
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2500);
                    }
                });
            }
        });
