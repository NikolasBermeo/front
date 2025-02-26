import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/FloatingButton.css';

function FloatingAddUserButton() {
  const [showForm, setShowForm] = useState(false);

  // Estados formulario
  const [usuarioID, setUsuarioID] = useState('');
  const [proyectoID, setProyectoID] = useState('');
  const [companiaID, setCompaniaID] = useState('');
  const [tipoActividadID, setTipoActividadID] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [minutos, setMinutos] = useState('');
  const [fecha, setFecha] = useState('');
  const [equipoID, setEquipoID] = useState('');

  // listas desplegables
  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [companias, setCompanias] = useState([]);
  const [tiposActividad, setTiposActividad] = useState([]);
  const [equipos, setEquipos] = useState([]);

  // Obtener datos  API 
  useEffect(() => {
    axios.get('http://localhost:5000/usuarios').then(res => setUsuarios(res.data));
    axios.get('http://localhost:5000/proyectos').then(res => setProyectos(res.data));
    axios.get('http://localhost:5000/companias').then(res => setCompanias(res.data));
    axios.get('http://localhost:5000/tipos-actividad').then(res => setTiposActividad(res.data));
    axios.get('http://localhost:5000/equipos').then(res => setEquipos(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { 
      UsuarioID: usuarioID, 
      ProyectoID: proyectoID, 
      CompañiaID: companiaID, 
      TipoActividadID: tipoActividadID, 
      Descripcion: descripcion, 
      Minutos: minutos, 
      Fecha: fecha, 
      EquipoID: equipoID };

    axios.post('http://localhost:5000/actividades', payload)
      .then(() => {
        alert('✅ Actividad agregada');
        setShowForm(false);
        setUsuarioID(''); setProyectoID(''); setCompaniaID(''); setTipoActividadID('');
        setDescripcion(''); setMinutos(''); setFecha(''); setEquipoID('');
      })
      .catch(() => alert('❌ Error al agregar actividad'));
  };

  return (
    <>
      <div className="floating-button" onClick={() => setShowForm(true)}>
        <img src="https://i.gifer.com/7HXn.gif" alt="Agregar" className="gif-icon" />
        <span className="tooltip">Agregar Actividad</span>
      </div>

{/* formulario */}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content p-4 rounded shadow">
            <h4 className="mb-3">Agregar Actividad</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label>Usuario</label>
                <select className="form-select" value={usuarioID} onChange={(e) => setUsuarioID(e.target.value)} required>
                  <option value="">Seleccione un usuario</option>
                  {usuarios.map((u) => <option key={u.UsuarioID} value={u.UsuarioID}>{u.Nombre}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <label>Proyecto</label>
                <select className="form-select" value={proyectoID} onChange={(e) => setProyectoID(e.target.value)} required>
                  <option value="">Seleccione un proyecto</option>
                  {proyectos.map((p) => <option key={p.ProyectoID} value={p.ProyectoID}>{p.Nombre}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <label>Compañía</label>
                <select className="form-select" value={companiaID} onChange={(e) => setCompaniaID(e.target.value)} required>
                  <option value="">Seleccione una compañía</option>
                  {companias.map((c) => <option key={c.CompañiaID} value={c.CompañiaID}>{c.Nombre}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <label>Tipo de Actividad</label>
                <select className="form-select" value={tipoActividadID} onChange={(e) => setTipoActividadID(e.target.value)} required>
                  <option value="">Seleccione un tipo</option>
                  {tiposActividad.map((t) => <option key={t.TipoActividadID} value={t.TipoActividadID}>{t.Nombre}</option>)}
                </select>
              </div>

              <div className="mb-2">
                <label>Descripción</label>
                <input className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
              </div>

              <div className="mb-2">
                <label>Minutos</label>
                <input className="form-control" type="number" value={minutos} onChange={(e) => setMinutos(e.target.value)} required />
              </div>

              <div className="mb-2">
                <label>Fecha</label>
                <input className="form-control" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label>Equipo</label>
                <select className="form-select" value={equipoID} onChange={(e) => setEquipoID(e.target.value)} required>
                  <option value="">Seleccione un equipo</option>
                  {equipos.map((e) => <option key={e.EquipoID} value={e.EquipoID}>{e.Nombre}</option>)}
                </select>
              </div>

              <button type="submit" className="btn btn-success w-100">Guardar</button>
              <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setShowForm(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingAddUserButton;