document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const feedbackBox = document.getElementById("formFeedback");
    const btnEnviar = document.getElementById("btnEnviar");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        feedbackBox.textContent = "";
        feedbackBox.className = "";

        const inputs = form.querySelectorAll(".form-control");
        inputs.forEach((input) => {
            input.classList.remove("is-invalid");
            input.nextElementSibling.textContent = ""; // Limpia mensajes antiguos
        });

        // Valores del formulario
        const nombre = form.nombre.value.trim();
        const correo = form.correo.value.trim();
        const asunto = form.asunto.value.trim();
        const mensaje = form.mensaje.value.trim();

        // Validaciones
        if (nombre === "") {
            mostrarError("nombre", "⚠️ Por favor ingresa tu nombre completo.");
            isValid = false;
        }

        if (correo === "") {
            mostrarError("correo", "⚠️ Por favor ingresa tu correo.");
            isValid = false;
        } else if (!validateEmail(correo)) {
            mostrarError("correo", "❌ El formato del correo no es válido.");
            isValid = false;
        }

        if (asunto === "") {
            mostrarError("asunto", "⚠️ Indica el asunto de tu mensaje.");
            isValid = false;
        }

        if (mensaje.length < 10) {
            mostrarError("mensaje", "⚠️ El mensaje debe tener al menos 10 caracteres.");
            isValid = false;
        }

        if (!isValid) return;

        // Simulación de envío
        bloquearFormulario(true);
        feedbackBox.innerHTML = `<div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Enviando...</span>
                                 </div>
                                 <p class="mt-2">Enviando tu mensaje...</p>`;
        feedbackBox.className = "text-center";

        setTimeout(() => {
            feedbackBox.className = "alert alert-success animate__animated animate__fadeInDown";
            feedbackBox.textContent = "✅ Tu mensaje ha sido enviado correctamente (simulado). ¡Gracias por contactarnos!";
            form.reset();
            bloquearFormulario(false);

            setTimeout(() => {
                feedbackBox.textContent = "";
                feedbackBox.className = "";
            }, 4000);
        }, 2500);
    });

    function mostrarError(id, mensaje) {
        const campo = document.getElementById(id);
        const feedback = campo.nextElementSibling;
        campo.classList.add("is-invalid");
        if (feedback) {
            feedback.textContent = mensaje;
        }
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return regex.test(email);
    }

    function bloquearFormulario(bloquear) {
        const elementos = form.querySelectorAll(".form-control");
        elementos.forEach(el => el.disabled = bloquear);
        btnEnviar.disabled = bloquear;

        if (bloquear) {
            btnEnviar.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Enviando...`;
        } else {
            btnEnviar.innerHTML = `Enviar Mensaje`;
        }
    }
});

(() => {
  const canvas = document.getElementById("starCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h, stars = [];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  const STAR_COUNT = 150;
  const MAX_DISTANCE = 120;

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.5,
      fad: Math.random() * 0.01 + 0.005
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#ffffff";

    // Estrellas
    for (const s of stars) {
      s.alpha += s.fad * (Math.random() > 0.5 ? 1 : -1);
      s.alpha = Math.max(0.2, Math.min(1, s.alpha));

      s.x += s.vx;
      s.y += s.vy;

      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      ctx.globalAlpha = s.alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    // Conexiones entre estrellas
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < STAR_COUNT; i++) {
      for (let j = i + 1; j < STAR_COUNT; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DISTANCE) {
          const opacity = 1 - dist / MAX_DISTANCE;
          ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  };

  draw();
})();
