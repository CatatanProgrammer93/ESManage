import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ShowReport() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();


  // Function to get the token from local storage
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const decodedToken = jwtDecode(getToken());

  useEffect(() => {
    const fetchResource = async (url, setter) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${getToken()}`, // Include the token from local storage
          },
        });
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResource("https://localhost:7240/api/report", setReports);
  }, []);

  
  useEffect(() => {
    if (!decodedToken["Show Report"]) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <AppLayout>
      <h2 className="page-title">Report</h2>
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-12">

            <div className="card">
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Table Name</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th className="w-1"></th>
                    </tr>
                  </thead>

                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.id}</td>
                        <td>{report.type}</td>
                        <td>{report.tableName}</td>
                        <td style={{whiteSpace: 'pre'}}>{report.details}</td>
                        <td>{report.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ShowReport;
