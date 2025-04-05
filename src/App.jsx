import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [cars, setCars] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [cost, setCost] = useState("");
  const [editingCarId, setEditingCarId] = useState(null);

  async function fetchCars() {
    const res = await axios.get("http://localhost:5000/cars");
    setCars(res.data);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = { name, model, year, cost };

    if (editingCarId) {
      await axios.put(`http://localhost:5000/cars/${editingCarId}`, newCar);
      setEditingCarId(null);
    } else {
      await axios.post("http://localhost:5000/cars", newCar);
    }

    fetchCars(); 
    clearFields();
  };

  const handleEdit = (car) => {
    setEditingCarId(car.id);
    setName(car.name);
    setModel(car.model);
    setYear(car.year);
    setCost(car.cost);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/cars/${id}`);
    fetchCars();
  };

  const clearFields = () => {
    setName("");
    setModel("");
    setYear("");
    setCost("");
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-4 w-[300px] flex flex-col gap-4 mx-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-400 h-[40px] w-full px-2 rounded-[5px] outline-none"
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          className="border border-gray-400 h-[40px] w-full px-2 rounded-[5px] outline-none"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="border border-gray-400 h-[40px] w-full px-2 rounded-[5px] outline-none"
        />
        <input
          type="number"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          className="border border-gray-400 h-[40px] w-full px-2 rounded-[5px] outline-none"
        />
        <button className="w-full h-[40px] bg-green-600 text-[20px] font-bold text-white rounded-[5px] hover:bg-green-800 duration-300" type="submit">{editingCarId ? "Update Car" : "Add Car"}</button>
      </form>

      <table className="border-collapse border border-gray-400 mx-2">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Model</th>
            <th className="border border-gray-400 p-2">Year</th>
            <th className="border border-gray-400 p-2">Cost</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((info) => (
            <tr key={info.id}>
              <td className="border border-gray-400 p-2">{info.name}</td>
              <td className="border border-gray-400 p-2">{info.model}</td>
              <td className="border border-gray-400 p-2">{info.year}</td>
              <td className="border border-gray-400 p-2">{info.cost}$</td>
              <td className="border border-gray-400 p-2">
                <div className="flex gap-2">
                <button onClick={() => handleEdit(info)} className="bg-green-600 w-[100px] h-[30px] rounded-[5px] text-white hover:bg-green-800 duration-300">Edit</button>
                <button onClick={() => handleDelete(info.id)} className="bg-red-600 w-[100px] h-[30px] rounded-[5px] text-white hover:bg-red-800 duration-300">Delete</button>
                </div>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
