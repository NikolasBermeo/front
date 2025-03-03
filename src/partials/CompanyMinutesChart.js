import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CompanyMinutesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCompanyMinutes();
  }, []);

  const fetchCompanyMinutes = () => {
    axios.get('http://localhost:5000/actividades')
      .then(response => {
        // Agrupar minutos por compañía
        const companyMinutes = {};
        response.data.forEach(act => {
          if (!companyMinutes[act.CompañiaNombre]) {
            companyMinutes[act.CompañiaNombre] = 0;
          }
          companyMinutes[act.CompañiaNombre] += act.Minutos;
        });

        // Convertir en formato para Recharts
        const chartData = Object.keys(companyMinutes).map(company => ({
          name: company,
          minutos: companyMinutes[company]
        }));

        setData(chartData);
      })
      .catch(error => console.error('❌ Error al obtener los datos:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">⏳ Tiempo Invertido por Compañía</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="minutos" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CompanyMinutesChart;
