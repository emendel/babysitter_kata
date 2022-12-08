import "./App.css";
import TimePicker from "react-time-picker";
import { useState } from "react";
import { calculatePay } from "./time.ts";

function App() {
  const [start, setStart] = useState("17:00");
  const [end, setEnd] = useState("04:00");
  const [bedtime, setBedTime] = useState("04:00");
  const [pay, setPay] = useState(0);
  const [error, setError] = useState("");

  function returnResponse() {
    return error === "" ? "You will make " + pay + " dollars" : error;
  }

  return (
    <div className="App">
      <p>Babysitter Kata</p>
      <div>
        What time will you start?
        <TimePicker onChange={setStart} value={start} disableClock={true} />
        <br />
        When is bedtime?
        <TimePicker onChange={setBedTime} value={bedtime} disableClock={true} />
        <br />
        What time will you end?
        <TimePicker onChange={setEnd} value={end} disableClock={true} />
        <br />
        <button
          onClick={() => {
            setError("");
            try {
              let x = calculatePay(start, end, bedtime);
              setPay(x);
            } catch (e) {
              setError(e.message);
              console.log(e.message);
            }
          }}
        >
          Submit
        </button>
        <br />
        {returnResponse()}
      </div>
    </div>
  );
}

export default App;
