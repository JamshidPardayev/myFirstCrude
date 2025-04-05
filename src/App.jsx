import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [cars, setCars] = useState([]);

  async function fetchCars() {
    const res = await axios.get("http://localhost:5000/cars");
    setCars(res.data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  console.log(cars);

  return (
    <div>
      <table className="border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Id</th>
            <th className="border border-gray-400 p-2">Name</th>
            <th className="border border-gray-400 p-2">Model</th>
            <th className="border border-gray-400 p-2">Year</th>
            <th className="border border-gray-400 p-2">Cost</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((info, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{info?.id}</td>
              <td className="border border-gray-400 p-2">{info?.name}</td>
              <td className="border border-gray-400 p-2">{info?.model}</td>
              <td className="border border-gray-400 p-2">{info?.year}</td>
              <td className="border border-gray-400 p-2">{info?.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
