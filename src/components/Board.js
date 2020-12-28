import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { chestMoveAndWinSide } from "../store/actions/";

const Board = ({ data }) => {
  // Render the Board based on the
  const renderedList = () => {
    const { chests, side, winSide } = data;
    console.log(data, chests, side, winSide);
    return chests.present.map((chestList, chestListIndex) => {
      return (
        <div className="row" key={chestListIndex}>
          {chestList.map((chest, chestIndex) => {
            if (chests.present[chestListIndex][chestIndex] === "") {
              return (
                <div
                  className="col"
                  key={(chestListIndex, chestIndex)}
                  // onClick={(e) => onChestClick(e, chestListIndex, chestIndex)}
                >
                  {chest}
                </div>
              );
            } else {
              return (
                <div className="col" key={(chestListIndex, chestIndex)}>
                  <img
                    src={require(`../assets/${chests.present[chestListIndex][chestIndex]}_chess.png`)}
                    alt={`${chests.present[chestListIndex][chestIndex]}_chess`}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    });
  };

  return data && data.chests ? renderedList() : <div></div>;
};

export default Board;
