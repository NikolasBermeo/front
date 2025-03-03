import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingAddButton from './FloatingAddUserButton';

function ActivityList() {
  // constantes actividades y filtros
  const [actividades, setActividades] = useState([]);
  const [filterText, setFilterText] = useState(''); // barra de búsqueda
  const [sortOrder, setSortOrder] = useState('asc'); // orden de minutos asc/desc
  const [companyFilter, setCompanyFilter] = useState(''); // filtro de compañía
  const [companies, setCompanies] = useState([]); // lista de compañías únicas

  // Obtener actividades 
  useEffect(() => {
    fetchActividades();
  }, []);

  // Función para obtener 
  const fetchActividades = () => {
    axios.get('http://localhost:5000/actividades')
      .then(response => {
        const actividadesOrdenadas = response.data.sort((a, b) => a.ActividadID - b.ActividadID);
        setActividades(actividadesOrdenadas);
        
        // Extraer nombres únicos de compañías
        const uniqueCompanies = [...new Set(response.data.map(act => act.CompañiaNombre))];
        setCompanies(uniqueCompanies);
      })
      .catch(error => console.error('❌ Error al obtener las actividades:', error));
  };

  // Eliminar actividad
  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta actividad? 🚨')) {
      axios.delete(`http://localhost:5000/actividades/${id}`)
        .then(() => {
          // Actualizar la lista filtrando la actividad eliminada
          setActividades(actividades.filter(actividad => actividad.ActividadID !== id));
        })
        .catch(error => console.error('❌ Error al eliminar la actividad:', error));
    }
  };

  // Filtrar actividades 
  const filteredActivities = actividades.filter(actividad =>
    Object.values(actividad).some(value =>
      String(value).toLowerCase().includes(filterText.toLowerCase())
    ) && (companyFilter === '' || actividad.CompañiaNombre === companyFilter)
  );

  // Ordenar actividades (Minutos)
  const sortedActivities = [...filteredActivities].sort((a, b) =>
    sortOrder === 'asc' ? a.Minutos - b.Minutos : b.Minutos - a.Minutos
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">📋 Lista de Actividades</h2>

      {/* Barra de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Filtrar por cualquier campo..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      {/* Filtros de minutos y compañía */}
      <div className="d-flex gap-3 mb-3">
        <button
          className="btn btn-secondary"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '⬇️ Ordenar por Minutos (Descendente)' : '⬆️ Ordenar por Minutos (Ascendente)'}
        </button>
        
        <select
          className="form-select"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="">Todas las Compañías</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {/* Mostrar mensaje si no hay actividades */}
      {sortedActivities.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          🔔 No hay actividades que coincidan con el filtro.
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
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {sortedActivities.map((actividad, index) => (
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
                  <td className="text-center">
                    {/* Botón para eliminar actividad */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(actividad.ActividadID)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Botón flotante para agregar actividades */}
      <FloatingAddButton />
    </div>
  );
}

export default ActivityList;
