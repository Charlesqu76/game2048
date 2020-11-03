import React, { Fragment, useEffect, useState } from "react";
import "./board.css";

const xLen = 4;
const yLen = 4;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: new Array(xLen * yLen).fill(0),
      a: false,
      s: false,
      d: false,
      w: false,
      score: 0,
    };
    this.pushButton = this.pushButton.bind(this);
    this.changeData = this.changeData.bind(this);
    this.reset = this.reset.bind(this);
    this.releaseButton = this.releaseButton.bind(this);
    this.changeScore = this.changeScore.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.pushButton);
    window.addEventListener("keyup", this.releaseButton);
    this.random();
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.pushButton);
    window.removeEventListener("keyup", this.releaseButton);
  }

  /**
   *
   * @param {list} rowList
   * 对列表进行计算，返回新的列表
   */
  changeData(rowList) {
    const newArr = [];
    // 数据相加
    for (let i in rowList) {
      let temp = rowList[i].filter((v) => v !== 0);
      let result = [];
      for (let index in temp) {
        let resultLen = result.length;
        if (result[resultLen - 1] === temp[index]) {
          result[resultLen - 1] = temp[index] * 2;
          this.changeScore(temp[index] * 2);
        } else {
          result.push(temp[index]);
        }
      }
      // 数组补零
      let fullRowList = [];
      for (let i = 0; i < xLen; i++) {
        fullRowList[i] = result[i] ? result[i] : 0;
      }
      newArr.push(fullRowList);
    }
    return newArr.flat();
  }

  /**
   *
   * @param {*} e
   * 改变score
   */
  changeScore(value) {
    this.setState({ score: this.state.score + value });
  }

  /**
   *
   * @param {*} arr1
   * @param {*} arr2
   * 判断两个数组是否一样
   */
  arrayIsEqual(arr1, arr2) {
    const arr1Len = arr1.length;
    const arr2Len = arr2.length;
    if (arr1Len !== arr2Len) return false;
    let index = 0;
    while (index < arr1Len) {
      if (arr1[index] !== arr2[index]) return false;
      index++;
    }
    return true;
  }

  /**
   * 按下按键事件
   * 修改list方向，使方向全部向左进行计算，计算完后，将列表方向改回
   * 判断返回的数组和计算之前是否相同
   */
  pushButton(e) {
    let rowList = [[], [], [], []];
    let temp = [];
    let finalList = [[], [], [], []];
    switch (e.key) {
      case "a" || "ArrowLeft":
        for (let i in this.state.data) {
          rowList[(i / xLen) | 0][i % xLen] = this.state.data[i];
        }
        finalList = this.changeData(rowList);
        if (!this.arrayIsEqual(this.state.data, finalList)) {
          this.setState({ data: finalList, a: true });
          this.random();
        }

        break;
      case "d" || "ArrowRight":
        for (let i in this.state.data) {
          rowList[(i / 4) | 0][3 - (i % 4)] = this.state.data[i];
        }
        temp = this.changeData(rowList);
        for (let i in temp) {
          finalList[(i / xLen) | 0][xLen - 1 - (i % 4)] = temp[i];
        }
        if (!this.arrayIsEqual(this.state.data, finalList.flat())) {
          this.setState({ data: finalList.flat(), d: true });
          this.random();
        }

        break;
      case "s" || "ArrowDown":
        for (let i in this.state.data) {
          rowList[xLen - 1 - (i % 4)][
            xLen - 1 - ((i / 4) | 0)
          ] = this.state.data[i];
        }
        temp = this.changeData(rowList);
        for (let i in temp) {
          finalList[xLen - 1 - (i % 4)][xLen - 1 - ((i / 4) | 0)] = temp[i];
        }
        if (!this.arrayIsEqual(this.state.data, finalList.flat())) {
          this.setState({ data: finalList.flat(), s: true });
          this.random();
        }
        break;
      case "w" || "ArrowUp":
        for (let i in this.state.data) {
          rowList[i % xLen][(i / xLen) | 0] = this.state.data[i];
        }
        temp = this.changeData(rowList);
        for (let i in temp) {
          finalList[i % xLen][(i / xLen) | 0] = temp[i];
        }
        if (!this.arrayIsEqual(this.state.data, finalList.flat())) {
          this.setState({ data: finalList.flat(), w: true });
          this.random();
        }

        break;
    }
  }

  /**
   *
   * 松开按键事件
   */
  releaseButton(e) {
    switch (e.key) {
      case "a":
        this.setState({ a: false });
        break;
      case "d":
        this.setState({ d: false });
        break;
      case "s":
        this.setState({ s: false });
        break;
      case "w":
        this.setState({ w: false });
        break;
    }
  }

  /**
   * 所用方块内的数值设置为0
   */
  reset() {
    const newData = new Array(xLen * yLen).fill(0);
    newData[Math.round(Math.random() * newData.length)] =
      Math.random() > 0.5 ? 2 : 4;
    this.setState({ data: newData, score: 0 });
  }

  /**
   * 没有数值的方块内随机生成2/4
   */
  random() {
    const restIndex = [];
    this.state.data.forEach((v, i) => {
      if (v === 0) restIndex.push(i);
    });
    let index = restIndex[Math.round(Math.random() * restIndex.length)];
    this.state.data[index] = Math.random() > 0.5 ? 2 : 4;
    let temp = [...this.state.data];
    this.setState({ data: temp });
  }

  render() {
    return (
      <Fragment>
        <div className="boardCon">
          <div className="boardSubCon">
            {this.state.data.map((v, index) => (
              <Pieces key={index} value={v} />
            ))}
          </div>
        </div>
        <div className="side ">
          <h1
            className={"title"}
            style={{ color: "#776e65", fontSize: "44px", textAlign: "center" }}
          >
            2048
          </h1>
          <div className="scoreCon">{this.state.score}</div>
          <div className="operationCon">
            <div className={!this.state.a ? "left" : "leftPush"}></div>
            <div className={!this.state.d ? "right" : "rightPush"}></div>
            <div className={!this.state.w ? "top" : "topPush"}></div>
            <div className={!this.state.s ? "bottom" : "bottomPush"}></div>
          </div>
          <div className="clear">
            <div onClick={this.reset} className="newGameButton">
              New Game
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function Pieces(props) {
  return (
    <div className={changeClasseName(props.value)}>
      {props.value ? props.value : null}
    </div>
  );
}

/**
 * 改变背景颜色
 */
const changeClasseName = (value) => {
  let colorName = "";
  switch (value) {
    case 2:
      colorName = "color-2";
      break;
    case 4:
      colorName = "color-4";
      break;
    case 8:
      colorName = "color-8";
      break;
    case 16:
      colorName = "color-16";
      break;
    case 32:
      colorName = "color-32";
      break;
    case 64:
      colorName = "color-64";
      break;
    case 128:
      colorName = "color-128";
      break;
    case 256:
      colorName = "color-256";
      break;
    case 512:
      colorName = "color-512";
      break;
    case 1024:
      colorName = "color-1024";
      break;
    case 2048:
      colorName = "color-2048";
      break;
    case 4096:
      colorName = "color-4096";
      break;
  }
  return `pieceCon ${colorName}`;
};
