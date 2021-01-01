import React from "react";

import "./Board.css";
import { FirebaseDatabaseMutation } from "@react-firebase/database";

const Board = ({ data }) => {
  const onChestClick = async (_, runMutation, chestListIndex, chestIndex) => {
    try {
      const { chests, side, winSide } = data;
      console.log("chests", chests.present["0"]);
      console.log("side", side);
      // Disable onClick if there is a winner
      if (!winSide) {
        await runMutation({
          ...chests.present[chestListIndex],
          [chestIndex]: side,
        });
      }
      console.log("finished refresh, side: ", side.value);
    } catch (e) {
      console.log(e);
    }
  };

  // Render the Board based on the
  const renderedList = () => {
    const { chests, side, winSide } = data;
    console.log("data", data);
    return chests.present.map((chestList, chestListIndex) => {
      return (
        <div className="row" key={chestListIndex}>
          {chestList.map((chest, chestIndex) => {
            if (chests.present[chestListIndex][chestIndex] === "") {
              return (
                <FirebaseDatabaseMutation
                  type="set"
                  path={`/chests/present/${chestListIndex}`}
                >
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
                      />
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
