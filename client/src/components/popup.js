import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const UpdateTaskPopup = ({ onUpdate, name}) => {

    
  const [column, setColumn] = useState('');
  const [change, setChange] = useState('');

  const handleUpdate = () => {

    onUpdate(name, column, change  );
    setColumn('');
    setChange('');
  };

  return (
    <Popup trigger={<button className="icon-only small mx-2"><i className="material-icons">settings</i></button>} position="right center">
      <div style={{ margin: '1rem', textAlign: 'right' }}>
  <select style={{ marginBottom: '1rem', minWidth:"100%" }} value={column} onChange={(e) => setColumn(e.target.value)}>
    <option value="">Select value to edit</option>
    <option value="name">Name</option>
    <option value="course">Course</option>
    <option value="date">Date</option>
  </select>
  <input style={{ marginBottom: '1rem', minWidth:"100%" }}  type="text" value={change} onChange={(e) => setChange(e.target.value)} placeholder="Add the new value" />
  <button className="save" style={{ width: '100%' }}  onClick={handleUpdate}>Update</button>
</div>
    </Popup>
  );
};

export default UpdateTaskPopup;
