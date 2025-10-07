// src/pages/SalesReportManagement.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './ManagementStyles.css';

const SalesReportManagement = () => {
  const [view, setView] = useState('');
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    drugName: '',
    quantitySold: '',
    totalRevenue: '',
    date: ''
  });

  useEffect(() => {
    const fetchSales = async () => {
      if (view === 'get') {
        try {
          const res = await axios.get('http://localhost:8080/api/sales');
          setSales(res.data);
        } catch (err) {
          console.error('Error fetching sales:', err);
        }
      }
    };
    fetchSales();
  }, [view]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 14, 16);

    const tableColumn = ['Drug Name', 'Quantity Sold', 'Total Revenue', 'Date'];
    const tableRows = [];

    sales.forEach(sale => {
      const saleData = [
        sale.drugName,
        sale.quantitySold,
        `₹${sale.totalRevenue}`,
        sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'
      ];
      tableRows.push(saleData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('sales_report.pdf');
  };

  const cards = [
    { title: 'Add Sale', view: 'add', icon: 'fas fa-plus' },
    { title: 'View Sales', view: 'get', icon: 'fas fa-list' }
  ];

  return (
    <div className="management-container">
      <h2 className="management-title">Sales Report Management</h2>

      <div className="management-grid">
        {cards.map((card) => (
          <div
            key={card.view}
            className={`management-card ${view === card.view ? 'active' : ''}`}
            onClick={() => setView(card.view)}
          >
            <i className={card.icon}></i>
            <span>{card.title}</span>
          </div>
        ))}
      </div>

      <div className="management-content">
        {view === 'add' && (
          <div className="form-container">
            <h3>Add Sale</h3>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await axios.post('http://localhost:8080/api/sales', newSale);
                alert('Sale added successfully');
                setNewSale({ drugName: '', quantitySold: '', totalRevenue: '', date: '' });
              } catch (err) {
                alert('Failed to add sale');
              }
            }}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Drug Name"
                  value={newSale.drugName}
                  onChange={(e) => setNewSale({ ...newSale, drugName: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Quantity Sold"
                  value={newSale.quantitySold}
                  onChange={(e) => setNewSale({ ...newSale, quantitySold: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="number"
                  placeholder="Total Revenue"
                  value={newSale.totalRevenue}
                  onChange={(e) => setNewSale({ ...newSale, totalRevenue: e.target.value })}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="date"
                  value={newSale.date}
                  onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Add Sale
              </button>
            </form>
          </div>
        )}

        {view === 'get' && (
          <div className="data-container">
            <h3>Sales Report</h3>
            
            <div className="action-buttons">
              <button onClick={() => window.print()} className="btn-secondary">
                <i className="fas fa-print"></i> Print Report
              </button>
              <button onClick={downloadPDF} className="btn-secondary">
                <i className="fas fa-download"></i> Download PDF
              </button>
            </div>

            {sales.length === 0 ? (
              <p className="no-results">No sales records found.</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Drug Name</th>
                      <th>Quantity Sold</th>
                      <th>Total Revenue</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td>{sale.drugName}</td>
                        <td>{sale.quantitySold}</td>
                        <td>₹{sale.totalRevenue}</td>
                        <td>{sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReportManagement;