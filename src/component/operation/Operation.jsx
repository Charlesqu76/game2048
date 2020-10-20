import React, { useEffect, useState } from "react";
import "./operation.css";
import { data } from "../../app.jsx";
import { action } from "mobx";
import { observer } from "mobx-react";

export default observer(function Operation() {
  const [a, setA] = useState(false);
  const [s, setS] = useState(false);
  const [d, setD] = useState(false);
  const [w, setW] = useState(false);

  const move = () =>{
    data.map((v)=> v.value += 2 )
  }

  const pushButton = (e) => {
    switch (e.key) {
      case "a":
        setA(true);
        action(move)();
        break;
      case "d":
        setD(true);
        break;
      case "s":
        setS(true);
        break;
      case "w":
        setW(true);
        break;
    }
  };
  const releaseButton = (e) => {
    switch (e.key) {
      case "a":
        setA(false);
        break;
      case "d":
        setD(false);
        break;
      case "s":
        setS(false);
        break;
      case "w":
        setW(false);
        break;
    }
  };
  useEffect(() => {
    window.addEventListener("keypress", pushButton);
    window.addEventListener("keyup", releaseButton);
  }, []);
  return (
    <div className="operationCon">
      <div className={!a ? "left" : "leftPush"}></div>
      <div className={!d ? "right" : "rightPush"}></div>
      <div className={!w ? "top" : "topPush"}></div>
      <div className={!s ? "bottom" : "bottomPush"}></div>
    </div>
  );
});
