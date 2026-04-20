document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('filtroForm');
    const btnCalcular = document.getElementById('btnCalcular');
    const loader = document.getElementById('loader');
    const btnText = btnCalcular.querySelector('span');
    const resultadosContainer = document.getElementById('resultadosContainer');

    function createResultCard(vendedor) {
        return `
            <div class="result-card">
                <div class="vendedor-info">
                    <span class="vendedor-nombre">${vendedor.nombre}</span>
                    <span class="vendedor-ventas">Total Vendido: $${vendedor.totalVentas.toFixed(2)}</span>
                </div>
                <div class="comision-badge">
                    Comisión: $${vendedor.totalComision.toFixed(2)}
                </div>
            </div>
        `;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fechaInicio = document.getElementById('fechaInicio').value;
        const fechaFin = document.getElementById('fechaFin').value;

        // UI Feedback - Show loading state
        btnText.style.display = 'none';
        loader.style.display = 'block';
        btnCalcular.disabled = true;

        try {
            // Este es el llamado HTTP a nuestro Controlador MVC en el backend
            const response = await fetch('/api/comisiones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fechaInicio, fechaFin })
            });

            if (!response.ok) {
                throw new Error('Error al consultar los datos');
            }

            const data = await response.json();
            
            // Reflejar la respuesta en la Vista
            if (data.length === 0) {
                resultadosContainer.innerHTML = '<div class="empty-state"><p>No se encontraron vendedores.</p></div>';
            } else {
                resultadosContainer.innerHTML = data.map(createResultCard).join('');
            }

        } catch (error) {
            console.error('Error:', error);
            resultadosContainer.innerHTML = `<div class="empty-state"><p style="color: #ef4444;">${error.message}</p></div>`;
        } finally {
            // Restore UI
            btnText.style.display = 'block';
            loader.style.display = 'none';
            btnCalcular.disabled = false;
        }
    });

    // Default dates (Enero - Febrero 2024 para tener datos porque el script initDB tiene de esas fechas)
    document.getElementById('fechaInicio').value = '2024-01-01';
    document.getElementById('fechaFin').value = '2024-02-28';
});
