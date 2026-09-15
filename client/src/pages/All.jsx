import React from "react";
import Card from "../components/Card";
import RowCard from "../components/RowCard";
import { useSelector } from "react-redux";

function All() {
  const tasks = useSelector((store) => store.tasks.tasksList);

  const searchQuery = useSelector(
    (store) => store.tasks.searchQuery
  );

  const sortOption = useSelector(
    (store) => store.tasks.sortOption
  );

  const viewState = useSelector((store) => store.view);

  const filteredTasks = tasks.filter((task) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortOption) {
      case "earlierFirst":
        return new Date(a.deadline) - new Date(b.deadline);

      case "laterFirst":
        return new Date(b.deadline) - new Date(a.deadline);

      case "completedFirst":
        return Number(b.completed) - Number(a.completed);

      case "uncompletedFirst":
        return Number(a.completed) - Number(b.completed);

      case "orderAdded":
      default:
        return 0;
    }
  });

  return (
    <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
      {sortedTasks.map((task, index) =>
        viewState === "cards" ? (
          <Card
            key={task._id}
            data={task}
            index={index}
          />
        ) : viewState === "rows" ? (
          <RowCard
            key={task._id}
            data={task}
            index={index}
          />
        ) : null
      )}
    </div>
  );
}

export default All;