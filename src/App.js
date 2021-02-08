import "./App.css";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();
  const [source, setStart] = useState('');
  const [destination, setEnd] = useState('');

  const [result, setResult] = useState()

  const shortestPathFinder = (start, ends) => {
    if (start === "" || ends === "") {
      alert("Please select your source and destination!")
      return;
    }
    const airports = [
      {
        start: 'ISB',
        end: 'LHR',
        cost: 1000
      },
      {
        start: 'LHR',
        end: 'NYC',
        cost: 750
      },
      {
        start: 'CBS',
        end: 'NYC',
        cost: 775
      }, {
        start: 'ISB',
        end: 'CBS',
        cost: 575
      }, {
        start: 'CBS',
        end: 'GRC',
        cost: 731
      }, {
        start: 'NYC',
        end: 'GRC',
        cost: 459
      },
    ]

    const algo = (airports, start, ends) => {
      const filtered = airports.filter(v => v.start.includes(start) || v.end.includes(ends))
      const filtered1 = filtered.filter(v => v.start.includes(start))
      const filtered2 = filtered.filter(v => v.end.includes(ends))
      const filtered3 = filtered.filter(v => v.start.includes(start) && v.end.includes(ends))
      if (filtered3.length === 1) {
        setResult({ route: [filtered3[0].start, filtered3[0].end], cost: filtered3[0].cost })
      } else {
        let sum = [];
        for (const val of filtered1) {
          for (const val2 of filtered2) {
            val.end === val2.start &&
              val.end === val2.start && sum.push({
                route: [val.start,
                val.end, val2.end], cost: val.cost + val2.cost
              })
          }
        }
        sum.sort(function (a, b) {
          return a.cost - b.cost
        })
        console.log('answer', sum[0])
        setResult(sum[0])
      }
    }
    algo(airports, start, ends)
  }

  React.useEffect(() => console.log("RESULT:", result), [result])
  return (
    <div className="App container">
      <form noValidate autoComplete="off">
        <div className="row p-3">
          <div className="col-lg-12">
            <TextField onChange={(event) => setStart(event.target.value.toUpperCase())} id="outlined-basic" label="Enter Your Start Location" variant="outlined" />

          </div>
          <div className="col-lg-12 mt-3">
            <TextField onChange={(event) => setEnd(event.target.value.toUpperCase())} id="outlined-basic" label="Enter Your End Location" variant="outlined" />
          </div>
        </div>
      </form>
      <button onClick={() => shortestPathFinder(source, destination)} type="button" className="btn btn-primary my-5">Find the shortest path</button>
      { result ? (
        <div>
        <h1>Path</h1>
        <h2>{JSON.stringify(result.route)}</h2>
        <h1>Cost</h1>
        <h2>{result.cost}</h2>
      </div>
      ) : null}
    </div>
  );
}

