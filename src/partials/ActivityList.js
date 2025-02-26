import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingAddButton from './FloatingAddUserButton'; 


function ActivityList() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/actividades')
      .then(response => {
        const actividadesOrdenadas = response.data.sort((a, b) => a.ActividadID - b.ActividadID);
        setActividades(actividadesOrdenadas);
      })
      .catch(error => console.error('❌ Error al obtener las actividades:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📋 Lista de Actividades</h2>
      {actividades.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          🔔 No hay actividades registradas.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Proyecto</th>
                <th>Compañía</th>
                <th>Tipo Actividad</th>
                <th>Descripción</th>
                <th>Minutos</th>
                <th>Fecha</th>
                <th>Equipo</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map((actividad, index) => (
                <tr key={actividad.ActividadID}>
                  <td className="text-center">{index + 1}</td>
                  <td>{actividad.UsuarioNombre}</td>
                  <td>{actividad.ProyectoNombre}</td>
                  <td>{actividad.CompañiaNombre}</td>
                  <td>{actividad.TipoActividadNombre}</td>
                  <td>{actividad.Descripcion}</td>
                  <td className="text-center">{actividad.Minutos}</td>
                  <td className="text-center">{new Date(actividad.Fecha).toLocaleDateString()}</td>
                  <td>{actividad.EquipoNombre}</td>
                </tr>
              ))}
               <FloatingAddButton />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ActivityList;
