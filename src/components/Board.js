import React from "react";
import { connect } from "react-redux";

import "./Board.css";
import { FirebaseDatabaseMutation } from "@react-firebase/database";
import { chestMoveAndWinSide } from "../store/actions/";

const Board = ({ data }) => {
  const onChestClick = async (_, runMutation, chestListIndex, chestIndex) => {
    try {
      console.log("hellpo");
      const { chests, side, winSide } = data;
      console.log("side", side);
      // Disable onClick if there is a winner
      if (!winSide) {
        await runMutation({
          ...data,
          chests: {
            ...chests,
            present: chests.present.map((el, index) =>
              index === chestListIndex
                ? el.map((ele, i) => (i === parseInt(chestIndex) ? side : ele))
                : el
            ),
          },
          side: side === "black" ? "white" : "black",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                <FirebaseDatabaseMutation type="set" path="/">
                  {({ runMutation }) => {
                    return (
                      <div
                        className="col"
                        key={(chestListIndex, chestIndex)}
                        onClick={(e) =>
                          onChestClick(
                            e,
                            runMutation,
                            chestListIndex,
                            chestIndex
                          )
                        }
                      >
                        {chest}
                      </div>
                    );
                  }}
                </FirebaseDatabaseMutation>
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
