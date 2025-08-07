let asignaciones = {};

// Cargar el archivo JSON con las asignaciones
fetch("asignaciones.json")
    .then(response => response.json())
    .then(data => asignaciones = data)
    .catch(error => console.error("Error cargando las asignaciones:", error));

// Función principal para revelar el regalo
function revealGift() {
    const input = document.getElementById("employeeId").value.trim();
    const resultDiv = document.getElementById("result");
    const box = document.getElementById("box");

    // Ocultar resultado anterior y caja
    resultDiv.classList.add("hidden");
    box.classList.add("hidden");

    // Validación
    if (!input || !asignaciones[input]) {
        resultDiv.textContent = "❌ Número de empleado no encontrado.";
        resultDiv.classList.remove("hidden");
        return;
    }

    // Mostrar caja animada
    box.classList.remove("hidden");

    setTimeout(() => {
        box.classList.add("hidden");
        resultDiv.innerHTML = `🎁 <strong>Te ha tocado:</strong><br><span class="gift-highlight">${asignaciones[input]}</span>`;
        resultDiv.classList.remove("hidden");
        lanzarConfeti();
    }, 2000);
}

// Función para lanzar confeti
function lanzarConfeti() {
    if (typeof confetti !== "function") {
        console.warn("Confetti no está cargado.");
        return;
    }

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 9999
    };

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.1, y: Math.random() * 0.3 },
            colors: ['#FF4E00', '#FFD700', '#FFFFFF']
        });

        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.9, y: Math.random() * 0.3 },
            colors: ['#FF4E00', '#FFD700', '#FFFFFF']
        });
    }, 250);
}
