import * as ComisionModel from '../models/ComisionModel.js';

export const calcularComisiones = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas inicio y fin son requeridas' });
    }

    // 1. Obtener Datos del Modelo
    const vendedores = await ComisionModel.getVendedores();
    const ventas = await ComisionModel.getVentasPorFecha(fechaInicio, fechaFin);
    const reglas = await ComisionModel.getReglas();

    // 2. Lógica de negocio (Calcular comisiones)
    const comisionesPorVendedor = vendedores.map(vendedor => {
      // Filtrar las ventas de un vendedor específico
      const ventasVendedor = ventas.filter(v => v.vendedor_id === vendedor.id);
      
      let totalVentas = 0;
      let totalComision = 0;

      // Por cada venta, calcular la comisión
      ventasVendedor.forEach(venta => {
        totalVentas += venta.monto;
        
        // Las reglas están ordenadas descendentemente por el modelo (de mayor a menor)
        // Encontraremos la primera regla que aplique
        const reglaAplicable = reglas.find(r => venta.monto >= r.cantidad_requerida);
        
        if (reglaAplicable) {
          totalComision += venta.monto * reglaAplicable.porcentaje_comision;
        }
      });

      return {
        vendedor_id: vendedor.id,
        nombre: vendedor.nombre,
        totalVentas,
        totalComision
      };
    });

    // 3. Responder a la Vista con los resultados
    res.json(comisionesPorVendedor);

  } catch (error) {
    console.error('Error calculando comisiones:', error);
    res.status(500).json({ error: 'Ocurrió un error al calcular las comisiones' });
  }
};
