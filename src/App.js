import React from 'react';
import Header from './partials/Header';
import ActivityList from './partials/ActivityList';
import Footer from './partials/Footer';
import FloatingAddUserButton from './partials/FloatingAddUserButton';
import CompanyMinutesChart from './partials/CompanyMinutesChart';

document.title = "Actividades";

function App() {
  return (
    <div className="App">
      <Header />
      <ActivityList />
      <CompanyMinutesChart />
      <FloatingAddUserButton />
      <Footer />
    </div>
  );
}

export default App;
