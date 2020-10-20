import React from "react";
import "./board.css";
import { observer } from "mobx-react";

import {data} from '../../app.jsx';

export default observer(function Board() {
  return (
    <div className="boardCon">
      <div className="boardSubCon">
        {data.map((v) => (
          <Pieces key={v.id} s value={v.value} id={v.id} />
        ))}
      </div>
    </div>
  );
});

function Pieces(props) {
  return (
    <div id={props.id} className={"pieceCon"}>
      {props.value ? props.value : null}
    </div>
  );
}
