import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import RowCard from "../components/RowCard";

function Important() {
  const data = useSelector((store) => store.tasks);
  const viewState = useSelector((store) => store.view);

  return (
    <div className="flex gap-4 flex-wrap">
      {data
        .filter((task) => task.isImportant)
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

export default Important;
