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

    resultDiv.classList.add("hidden");
    box.classList.add("hidden");

    // Verifica si el número de empleado es válido
    if (!input || !asignaciones[input]) {
        resultDiv.innerHTML = "❌ <strong>Número de empleado no encontrado.</strong>";
        resultDiv.classList.remove("hidden");
        return;
    }

    // Mostrar animación de caja
    box.classList.remove("hidden");

    // Espera 2 segundos y muestra el resultado
    setTimeout(() => {
        box.classList.add("hidden");
        resultDiv.innerHTML = `
            <div class="gift-highlight-container">
                🎉 <strong>Te ha tocado:</strong><br>
                <span class="gift-highlight">${asignaciones[input]}</span>
            </div>`;
        resultDiv.classList.remove("hidden");

        // Lanzar confeti
        lanzarConfeti();
    }, 2000);
}

// Función para lanzar confeti en toda la pantalla
function lanzarConfeti() {
    if (typeof confetti !== "function") {
        console.warn("Confetti no cargado correctamente.");
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
            clearInterval(interval);
            return;
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
