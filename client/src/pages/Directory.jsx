import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import RowCard from "../components/RowCard";

function Directory() {
  const data = useSelector((store) => store.tasks);
  const viewState = useSelector((store) => store.view);
  const current = useSelector((store) => store.directory.currentDirectory);

  return (
    <div className="flex gap-4 flex-wrap">
      {data
        .filter((task) => task.directory === current)
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

export default Directory;