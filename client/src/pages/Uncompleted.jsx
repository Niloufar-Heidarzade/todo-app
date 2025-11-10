import React from "react";
import Card from "../components/Card";
import RowCard from "../components/RowCard";
import { useSelector } from "react-redux";

function Uncompleted() {
  const data = useSelector((store) => store.tasks);
  const viewState = useSelector((store) => store.view);

  return (
    <div className="flex gap-4 flex-wrap">
      {data
        .filter((task) => !task.isCompleted)
        .map((task, index) =>
          viewState === "cards" ? (
            <Card data={task} index={index} />
          ) : viewState === "rows" ? (
            <RowCard data={task} index={index} />
          ) : null
        )}
    </div>
  );
}

export default Uncompleted;
