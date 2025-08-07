
let asignaciones;

fetch("asignaciones.json")
    .then(response => response.json())
    .then(data => asignaciones = data);

function revealGift() {
    const input = document.getElementById("employeeId").value.trim();
    const resultDiv = document.getElementById("result");
    const box = document.getElementById("box");

    resultDiv.classList.add("hidden");
    box.classList.add("hidden");

    if (!input || !asignaciones[input]) {
        resultDiv.textContent = "Número de empleado no encontrado.";
        resultDiv.classList.remove("hidden");
        return;
    }

    box.classList.remove("hidden");
    setTimeout(() => {
        box.classList.add("hidden");
        resultDiv.textContent = "🎉 Te ha tocado: " + asignaciones[input];
        resultDiv.classList.remove("hidden");
    }, 2000);
}
