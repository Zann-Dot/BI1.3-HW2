import { Link } from "react-router";
import useFetch from "../useFetch";
import HotelName from "./HotelName";

export default function Hotels() {
  const { data, loading, error } = useFetch("http://localhost:3000/hotels");

  return (
    <div>
      <h2>All Hotels</h2>
      <ul className="list-group">
        {loading && <p>Loading...</p>}
        {error && <p>Error Occured</p>}
        {data?.map((h) => (
          <li
            key={h._id}
            className="list-group-item bg-dark text-light border-secondary"
          >
            {h.name}
          </li>
        ))}
      </ul>
      <HotelName name={"New Hotel"} />
      <Link to="/hotels/submit" className="btn btn-primary mt-4">
        Add New Hotel
      </Link>
    </div>
  );
}
