import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const tipsArray = useRef([5, 10, 15, 25, 50]);
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [tipPer, setTipPer] = useState("");
  const [selected, setSelected] = useState("");
  const [total, setTotal] = useState(Number(0).toFixed(2));
  const [tipValue, setTipValue] = useState(Number(0).toFixed(2));

  useEffect(() => {
    //total value update per person
    if (people && Number(people) !== 0 && tipValue && bill) {
      console.log("here");
      setTotal(
        Number(
          (parseFloat(bill) + parseFloat(tipValue * people)) / people
        ).toFixed(2)
      );
    } else {
      setTotal(Number("0").toFixed(2));
    }
  }, [people, tipValue, bill]);

  useEffect(() => {
    //tip value update per person
    if (
      (selected !== "" || tipPer) &&
      people !== "" &&
      Number(people) !== 0 &&
      bill !== ""
    ) {
      if (tipPer) {
        setTipValue(
          ((Number(bill) * Number(tipPer)) / 100 / people).toFixed(2)
        );
      } else {
        setTipValue(
          (
            Number(Number(bill) * tipsArray.current[selected]) /
            100 /
            people
          ).toFixed(2)
        );
      }
    } else if (tipPer === "" || !people || Number(people) === 0) {
      setTipValue(Number(0).toFixed(2));
    }
  }, [bill, tipPer, selected, people]);

  return (
    <main>
      <div className="title">
        <p>spli</p>
        <p>tter</p>
      </div>
      <div className="container">
        <div className="interface">
          <div className="bill">
            <p>Bill</p>

            <input
              aria-label="bill Input"
              className="billInput"
              type="text"
              name="bill"
              id="bill"
              value={bill}
              onChange={(e) => {
                //only allow ints and decimal numbers
                if (isNaN(Number(e.target.value))) {
                  return;
                } else {
                  setBill(e.target.value);
                }
              }}
            />
          </div>
          <div className="tip">
            <p>Select Tip %</p>
            <div className="buttons">
              {/* tips buttons array */}
              {tipsArray.current.map((element, index) => {
                return (
                  <button
                    aria-label={`tip ${element}%`}
                    key={index}
                    className={`btn ${index === selected ? "selected" : ""}`}
                    onClick={() => {
                      setSelected(index);
                      setTipPer("");
                    }}
                  >
                    {element}%
                  </button>
                );
              })}
              <input
                aria-label="Custom tip percent input"
                className="tipPercent"
                type="text"
                name="tipPercent"
                id="tipPercent"
                placeholder="Custom"
                value={tipPer}
                onClick={() => {
                  setSelected("");
                }}
                onChange={(e) => {
                  // only allow ints
                  setTipPer(e.target.value.replace(/[^0-9]/g, ""));
                }}
              />
            </div>
          </div>

          <div className="people">
            <div className="peopleText">
              <p>Number of People</p>
              <p
                className="error"
                style={parseInt(people) === 0 ? { display: "block" } : {}}
              >
                Can't be zero
              </p>
            </div>

            <input
              style={parseInt(people) === 0 ? { border: "2px solid red" } : {}}
              className={`numPeople`}
              type="text"
              name="NumPeople"
              id="NumPeople"
              value={people}
              onChange={(e) => {
                //only allow ints
                setPeople(e.target.value.replace(/[^0-9]/g, ""));
              }}
            />
          </div>
        </div>

        <div className="display">
          <div className="values">
            <div className="tipAmount">
              <div className="textContainer">
                <p> Tip Amount</p>
                <p className="perPerson">/ person</p>
              </div>
              <div className="tipAmountVal">${tipValue}</div>
            </div>
            <div className="total">
              <div className="textContainer">
                <p>Total</p>
                <p className="perPerson">/ person</p>
              </div>

              <div className="totalVal">${total}</div>
            </div>
          </div>

          <button
            className="reset"
            onClick={() => {
              setBill("");
              setPeople("");
              setSelected("");
              setTipPer("");
              setTotal(Number(0).toFixed(2));
              setTipValue(Number(0).toFixed(2));
            }}
          >
            RESET
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
