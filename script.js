let asignaciones = {};

// Cargar el archivo JSON con las asignaciones
fetch("asignaciones.json")
    .then(response => response.json())
    .then(data => asignaciones = data);

// Función principal para revelar el regalo
function revealGift() {
    const input = document.getElementById("employeeId").value.trim();
    const resultDiv = document.getElementById("result");
    const box = document.getElementById("box");

    // Oculta resultado anterior y la caja
    resultDiv.classList.add("hidden");
    box.classList.add("hidden");

    // Verifica si el número de empleado es válido
    if (!input || !asignaciones[input]) {
        resultDiv.textContent = "Número de empleado no encontrado.";
        resultDiv.classList.remove("hidden");
        return;
    }

    // Muestra animación de la caja
    box.classList.remove("hidden");

    // Espera 2 segundos antes de mostrar el resultado
    setTimeout(() => {
        box.classList.add("hidden");
        resultDiv.textContent = "🎉 Te ha tocado: " + asignaciones[input];
        resultDiv.classList.remove("hidden");

        // Lanza el confeti
        lanzarConfeti();
    }, 2000);
}

// Función para lanzar confeti en toda la pantalla
function lanzarConfeti() {
    const duration = 3 * 1000; // duración en milisegundos
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FF4E00', '#FFD700', '#FF4E00']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FF4E00', '#FFD700', '#FF4E00']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
