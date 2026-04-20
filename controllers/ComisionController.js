import * as ComisionModel from '../models/ComisionModel.js';

export const calcularComisiones = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.body;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas inicio y fin son requeridas' });
    }

    /////////////////////////OBTENER DATOS DEL MODELO////////////////////////////////
    const vendedores = await ComisionModel.getVendedores();
    const ventas = await ComisionModel.getVentasPorFecha(fechaInicio, fechaFin);
    const reglas = await ComisionModel.getReglas();

    /////////////////////////LOGICA DE NEGOCIO Y CALCULOS////////////////////////////////
    const comisionesPorVendedor = vendedores.map(vendedor => {
      const ventasVendedor = ventas.filter(v => v.vendedor_id === vendedor.id);
      
      let totalVentas = 0;
      let totalComision = 0;

      ventasVendedor.forEach(venta => {
        totalVentas += venta.monto;
        
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

    /////////////////////////RESPUESTA A LA VISTA////////////////////////////////
    res.json(comisionesPorVendedor);

  } catch (error) {
    console.error('Error calculando comisiones:', error);
    res.status(500).json({ error: 'Ocurrió un error al calcular las comisiones' });
  }
};
