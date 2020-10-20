import React from "react";
import Board from "./component/board/Board.jsx";
import Operation from "./component/operation/Operation.jsx";
import {observable} from 'mobx'

export const data = observable([
  { id: "00", value: 0 },
  { id: "01", value: 0 },
  { id: "02", value: 0 },
  { id: "03", value: 0 },
  { id: "10", value: 0 },
  { id: "11", value: 0 },
  { id: "12", value: 0 },
  { id: "13", value: 0 },
  { id: "20", value: 0 },
  { id: "21", value: 0 },
  { id: "22", value: 0 },
  { id: "23", value: 0 },
  { id: "30", value: 4 },
  { id: "31", value: 0 },
  { id: "32", value: 2048 },
  { id: "33", value: 4 },
]);

export default function App() {
  return (
    <div style = {{display: 'flex'}}>
      <Board />
      <Operation />
    </div>
  );
}
