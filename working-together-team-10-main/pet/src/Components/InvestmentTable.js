import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './InvestmentTable.css';
import {  Image, Card, Table } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form } from 'react-bootstrap';
import {projectUrl} from "./configure";
const InvestmentTable = (props) => {
  const {investments,changeSName}=props;
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
 console.log(investments)
 
  const sortedInvestments = [...investments].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (a[sortField] > b[sortField]) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
  console.log(sortedInvestments)

  const filteredInvestments = sortedInvestments.filter((investment) =>
    investment.investedCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  const navigate = useNavigate();
  const handleClick= async (email)=>{
    try {
      const response = await fetch(`${projectUrl}`+'/api/getStartUp/'+email,{
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const json = await response.json();
          console.log(json)
         changeSName(json)
         navigate("/sDetails")
         
        } else {
          const text = await response.text();
          
        }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div style={{width:"400px"}}>
          <InputGroup  >
        <Form.Control type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  placeholder="Search by company name" />
        <InputGroup.Text id="basic-addon2"><i className="pi pi-search" style={{ fontSize: '1rem',color:'black' }} onClick={searchQuery}></i></InputGroup.Text>
      </InputGroup>
      </div>
     
    <div style={{ overflow: 'auto', height: '400px', marginTop:"10px" }}>
      
    <Table  style={{ fontWeight:500,fontSize:'18px'}} striped bordered hover>
      <thead style={{position:'sticky',top:0,backgroundColor:'grey',color:'Black'}}>
     
        <tr>
          <th onClick={() => handleSort('investedCompany')}>
            Invested Company
            {sortField === 'investedCompany' && (
              <span className={`sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
            )}
          </th>
          <th onClick={() => handleSort('bits')}>
            Bits
            {sortField === 'bits' && (
              <span className={`sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
            )}
          </th>
          <th onClick={() => handleSort('investment')}>
            Investment
            {sortField === 'investment' && (
              <span className={`sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
            )}
          </th>
          <th onClick={() => handleSort('date')}>
            Date
            {sortField === 'date' && (
              <span className={`sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
            )}
          </th>
          <th onClick={() => handleSort('time')}>
            Time
            {sortField === 'time' && (
              <span className={`sort-arrow ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
            )}
          </th>
        </tr>
        
      </thead>
      <tbody>
        {filteredInvestments.map((investment) => (
          <tr key={investment.id}>
            <td>
              <Link to='' onClick={()=>handleClick(investment.startUpEmail)}>{investment.investedCompany}</Link>
            </td>
            <td>{investment.bits}</td>
            <td>${investment.investment}</td>
            <td>{investment.date}</td>
            <td>{investment.time}</td>
          </tr>
        ))}
      </tbody>
      
    </Table>
    </div>
    </div>
  );
};

export default InvestmentTable;
