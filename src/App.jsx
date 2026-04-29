import Hotels from "./BI1.1 HW2/Hotels";
import HotelFormSubmit from "./BI1.2 HW2/HotelFormSubmit";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Hotels />} />
        <Route path="/hotels/submit" element={<HotelFormSubmit />} />
      </Routes>
    </>
  );
}

export default App;
