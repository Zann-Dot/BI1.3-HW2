import { useState } from "react";
import useFetch from "../useFetch";

export default function HotelFormSubmit() {
  const API_URL = import.meta.env.VITE_API_URL || "https://localhost:3000";
  const { data, loading, error } = useFetch(`${API_URL}/hotels`);
  const [successMessage, setSuccessMessage] = useState("");

  const addHotelDetails = async (hotelDetails) => {
    try {
      const response = await fetch(`${API_URL}/hotels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelDetails),
      });

      if (!response.ok) {
        const err = await response.json().then((res) => res.error);
        throw new Error(err);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const category = formData.get("category");
    const location = formData.get("location");
    const rating = parseFloat(formData.get("rating"));
    const website = formData.get("website");
    const phoneNumber = formData.get("phoneNumber");
    const checkInTime = formData.get("checkInTime");
    const checkOutTime = formData.get("checkOutTime");
    const amenities = formData.get("amenities").split(",");
    const priceRange = formData.get("priceRange");
    const reservationsNeeded = formData.get("reservationsNeeded") === "on";
    const isParkingAvailable = formData.get("isParkingAvailable") === "on";
    const isWifiAvailable = formData.get("isWifiAvailable") === "on";
    const isPoolAvailable = formData.get("isPoolAvailable") === "on";
    const isSpaAvailable = formData.get("isSpaAvailable") === "on";
    const isRestaurantAvailable =
      formData.get("isRestaurantAvailable") === "on";

    const hotelDetails = {
      name,
      category,
      location,
      rating,
      website,
      phoneNumber,
      checkInTime,
      checkOutTime,
      amenities,
      priceRange,
      reservationsNeeded,
      isParkingAvailable,
      isWifiAvailable,
      isPoolAvailable,
      isSpaAvailable,
      isRestaurantAvailable,
    };

    if (
      !name ||
      !category ||
      !location ||
      !phoneNumber ||
      !checkInTime ||
      !checkOutTime ||
      !priceRange
    ) {
      alert("Please fill all the required fields");
      return;
    } else {
      addHotelDetails(hotelDetails);
    }
  };

  const handleDelete = async (hotelId) => {
    const response = await fetch(`${API_URL}/hotels/${hotelId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = await response.json().then((res) => res.error);
      throw err;
    }

    const data = await response.json();
    if (data) {
      setSuccessMessage(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  return (
    <div>
      <h1 className="display-3 mb-4">Add New Hotel Info</h1>
      <form onSubmit={handleSubmit} className="d-grid">
        <label className="form-label fs-5 text-white-50">Hotel Name :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          name="name"
          placeholder="Enter hotel name"
          required
        />
        <br />

        <label className="form-label fs-5 text-white-50">Category :</label>
        <select
          className="form-control bg-dark text-white border-secondary"
          name="category"
          required
        >
          <option value="">Select Category</option>
          <option value="Budget">Budget</option>
          <option value="Mid-Range">Mid-Range</option>
          <option value="Luxury">Luxury</option>
          <option value="Boutique">Boutique</option>
          <option value="Resort">Resort</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <label className="form-label fs-5 text-white-50">Location :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Enter location"
          name="location"
          required
        />
        <br />

        <label className="form-label fs-5 text-white-50">Rating :</label>
        <input
          type="number"
          step="0.1"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Enter rating"
          name="rating"
        />
        <br />

        <label className="form-label fs-5 text-white-50">Website :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Enter website URL"
          name="website"
        />
        <br />

        <label className="form-label fs-5 text-white-50">Phone Number :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Enter phone number"
          name="phoneNumber"
          required
        />
        <br />

        <label className="form-label fs-5 text-white-50">Check-in Time :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="e.g., 2:00 PM"
          name="checkInTime"
          required
        />
        <br />

        <label className="form-label fs-5 text-white-50">
          Check-out Time :
        </label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="e.g., 11:00 AM"
          name="checkOutTime"
          required
        />
        <br />

        <label className="form-label fs-5 text-white-50">Amenities :</label>
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="e.g., Pool, Spa, Gym"
          name="amenities"
        />
        <br />

        <label className="form-label fs-5 text-white-50">Price Range :</label>
        <select
          className="form-control bg-dark text-white border-secondary"
          name="priceRange"
          required
        >
          <option value="">Select Price Range</option>
          <option value="$ (0-10)">$ (0-10)</option>
          <option value="$$ (11-30)">$$ (11-30)</option>
          <option value="$$$ (31-60)">$$$ (31-60)</option>
          <option value="$$$$ (61+)">$$$$ (61+)</option>
          <option value="Other">Other</option>
        </select>
        <br />

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="reservationsNeeded"
            id="reservationsNeeded"
          />
          <label className="form-check-label" htmlFor="reservationsNeeded">
            Reservations Needed
          </label>
        </div>

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="isParkingAvailable"
            id="isParkingAvailable"
          />
          <label className="form-check-label" htmlFor="isParkingAvailable">
            Parking Available
          </label>
        </div>

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="isWifiAvailable"
            id="isWifiAvailable"
          />
          <label className="form-check-label" htmlFor="isWifiAvailable">
            WiFi Available
          </label>
        </div>

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="isPoolAvailable"
            id="isPoolAvailable"
          />
          <label className="form-check-label" htmlFor="isPoolAvailable">
            Pool Available
          </label>
        </div>

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="isSpaAvailable"
            id="isSpaAvailable"
          />
          <label className="form-check-label" htmlFor="isSpaAvailable">
            Spa Available
          </label>
        </div>

        <div className="form-check mb-3 fs-5 text-white-50">
          <input
            type="checkbox"
            className="form-check-input"
            name="isRestaurantAvailable"
            id="isRestaurantAvailable"
          />
          <label className="form-check-label" htmlFor="isRestaurantAvailable">
            Restaurant Available
          </label>
        </div>

        <button type="submit" className="btn btn-primary px-3 py-2 mt-3">
          Submit
        </button>
      </form>

      <div className="container my-5">
        <p className="text-success fs-4 text-center">{successMessage}</p>
        <h3 className="display-5 text-center mb-4">Hotels List</h3>
        <ul className="list-group">
          {data?.map((hotel) => (
            <li
              key={hotel._id}
              className="list-group-item bg-dark text-white-50 border-secondary d-flex justify-content-between align-items-start"
            >
              {hotel.name}
              <button
                className="btn btn-primary"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
