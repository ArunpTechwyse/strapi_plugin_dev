import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [action, setAction] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    id:''
  });
  const [selectedForm, setSelectedForm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleActionSelect = (actionType) => {
    setAction(actionType);
    setError(null); // Reset error messages when switching actions
    setSuccessMessage(null); // Reset success messages
    if (actionType === 'GET') {
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:1337/form/find');
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setIsLoading(true);
      // Ensure formData is correctly structured for the API call
      const userData = {"data":
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message // Assuming this is the message field
        }  };
      await axios.post('http://localhost:1337/form/create', userData);
      // Reset form fields
      // setFormData({ name: '', email: '', phone: '', message: '' });
      setSuccessMessage('Form created successfully!');
      // Re-fetch data to reflect the new addition
      fetchData();
    } catch (err) {
      setError('Failed to create form');
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUpdateSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      console.log('..................................')
      setIsLoading(true);
      // Ensure formData is correctly structured for the API call
      const userData = {"data":
      { 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message // Assuming this is the message field
        }  };
        const id=formData.id;
        console.log(id)
      // Construct the URL with the id of the form to be updated
      const url = `http://localhost:1337/form/update/`+id;
      await axios.put(url, userData);
      // Reset form fields
      // setFormData({ name: '', email: '', phone: '', message: '' });
      setSuccessMessage('Form updated successfully!');
      // Re-fetch data to reflect the update
      fetchData();
    } catch (err) {
      setError('Failed to update form');
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  
const handleDeleteSubmit = async (id) => {
  try {
    setIsLoading(true); // Set loading state to true before the deletion process
    // Construct the URL with the id of the form to be deleted
    const url = `http://localhost:1337/form/delete/${id}`;
    await axios.delete(url);
    // Optionally, reset form fields if needed
    // setFormData({ name: '', email: '', phone: '', message: '' });
    setSuccessMessage('Form deleted successfully!');
    // Re-fetch data to reflect the deletion
    fetchData();
  } catch (err) {
    setError('Failed to delete form');
    console.error("Error:", err);
  } finally {
    setIsLoading(false); // Set loading state to false after the operation is completed
  }
};

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '20px' }}>
        <button onClick={() => handleActionSelect('GET')}>Get Forms</button>
        <button onClick={() => handleActionSelect('CREATE')}>Create Form</button>
        <button onClick={() => handleActionSelect('UPDATE')}>Update Form</button>
        <button onClick={() => handleActionSelect('DELETE')}>Delete Form</button>
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {successMessage && <p>Success: {successMessage}</p>}

        {action === 'GET' && data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <style>
          {`
            table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            tr:nth-child(even) {
              background-color: #f9f9f9;
            }
          `}
        </style>

        {action === 'CREATE' && (
          <form onSubmit={handleCreateSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value })}
            />
            <button type="submit">Create</button>
          </form>
        )}


{action === 'UPDATE' && (
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Id"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
        )}


{action === 'DELETE' && (
  <div>
    <h3>Delete Form</h3>
    <p>Are you sure you want to delete this form?</p>
    <input
              type="number"
              placeholder="Id"
              value={formData.id}
              onChange={(e) => setFormData({...formData, id: e.target.value })}
            />
    <button onClick={() => handleDeleteSubmit(formData.id)}>Delete</button>
  </div>
)}



        {/* {action === 'UPDATE' && selectedForm && (
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value })}
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
