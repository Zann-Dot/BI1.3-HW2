import useFetch from "../useFetch";
export default function HotelName({ name }) {
  const { data, loading, error } = useFetch(
    `http://localhost:3000/hotels/${name}`,
  );

  return data ? (
    <div>
      {<h2 className="display-5 mt-4">{data.name}</h2>}
      <p>Rating : {data.rating}</p>
      <p>Location : {data.location}</p>
      <p>Price Range : {data.priceRange}</p>
    </div>
  ) : (
    loading && <p>Loading...</p>
  );
}
