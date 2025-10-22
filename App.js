import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [claimNumber, setClaimNumber] = useState('');
  const [note, setNote] = useState('');
  const [actionType, setActionType] = useState('retrieve'); // 'retrieve' or 'create'

  const BASE_URL = 'https://petstore3.swagger.io/api/v3/pet';

  const handleSend = async (claimNo) => {
    claimNo = claimNumber.trim();
    if (actionType === 'retrieve') {
      // TODO: Add logic to retrieve note from backend
      console.log(`Retrieving notes for claim number: ${claimNo}`);
      
   try {
      const response = await axios.get(`${BASE_URL}/${claimNo}`);
      const notes = response.data;

      console.log(JSON.stringify(notes));
    } catch (error) {
      console.error('Error retrieving notes:', error);
    }

    } else {
      // Logic to create note
      console.log(`Creating note for claim number: ${claimNo}`);
      console.log(`Note: ${note}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
         <h2 style={{ marginBottom: '24px', color: '#61dafb', letterSpacing: '1px' }}>
        Guidewire ClaimCenter Integration
      </h2>
         <form
      style={{
        background: '#222',
        padding: '30px 40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        minWidth: '320px'
      }}
      onSubmit={e => {
        e.preventDefault();
        handleSend();
      }}
    >

      <div style={{ marginBottom: '20px', color: '#fff' }}>
        <label>
          <input
            type="radio"
            value="retrieve"
            checked={actionType === 'retrieve'}
            onChange={() => setActionType('retrieve')}
            style={{ marginRight: '8px' }}
          />
          Retrieve Note
        </label>
        <label style={{ marginLeft: '200px' }}>
          <input
            type="radio"
            value="create"
            checked={actionType === 'create'}
            onChange={() => setActionType('create')}
            style={{ marginRight: '8px' }}
          />
          Create Note
        </label>
      </div>

      <table style={{ width: '100%', borderSpacing: '30px' }}>
        <tbody>
          <tr>
            <td style={{ textAlign: 'right', width: '120px', whiteSpace: 'nowrap', paddingRight: '10px' }}>
              <label htmlFor="claimNumber">Claim Number :</label>
            </td>
            <td>
              <input
                id="claimNumber"
                type="text"
                value={claimNumber}
                onChange={e => setClaimNumber(e.target.value)}
                placeholder="Enter claim number"
                style={{
                  width: '200px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
            </td>
          </tr>

          {actionType === 'create' && (
            <tr>
              <td style={{ textAlign: 'right', paddingRight: '10px' }}>
                <label htmlFor="note">Note :</label>
              </td>
              <td>
                <textarea
                  id="note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Enter note"
                  style={{
                    width: '200px',
                    height: '100px',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                />
              </td>
            </tr>
          )}

          <tr>
            <td colSpan={2} style={{ textAlign: 'center', paddingTop: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '8px 24px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#61dafb',
                  color: '#222',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
      </header>
    </div>
  );
}

export default App;