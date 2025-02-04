import React, { useState, useEffect } from "react";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    gender: "",
    idneighborhood: "",
    phone: "",
    password: ""
  });
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/neighborhoods")
      .then((res) => res.json())
      .then((data) => setNeighborhoods(data))
      .catch((err) => console.error("Error fetching neighborhoods:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("User created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <select name="idneighborhood" onChange={handleChange} required>
          <option value="">Select Neighborhood</option>
          {neighborhoods.map((n) => (
            <option key={n.id} value={n.id}>{n.name}</option>
          ))}
        </select>
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
