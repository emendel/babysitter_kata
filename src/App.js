import logo from "./logo.svg";
import "./App.css";
import TimePicker from "react-time-picker";
import { useState } from "react";
import {
  validStartTime,
  validBedTime,
  validLeaveTime,
  calculatePay,
} from "./time.ts";

function App() {
  const [start, setStart] = useState("17:00");
  const [leave, setLeave] = useState("04:00");
  const [bedtime, setBedTime] = useState("04:00");
  const [pay, setPay] = useState(0);
  const [error, setError] = useState("");

  function returnResponse() {
    return error == "" ? "You will make " + pay + " dollars" : error;
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
        What time will you leave?
        <TimePicker onChange={setLeave} value={leave} disableClock={true} />
        <br />
        <button
          onClick={() => {
            setError("");
            try {
              let x = calculatePay(start, leave, bedtime);
              setPay(x);
            } catch (e) {
              setError(e);
              console.log(e);
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
