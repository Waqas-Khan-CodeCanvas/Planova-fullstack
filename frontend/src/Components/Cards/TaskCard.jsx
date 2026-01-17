import React from "react";
import moment from "moment";
import { LuPaperclip } from "react-icons/lu";
import Progress from "../Progress.jsx";
import AvatarGroup from "../layouts/AvatarGroup.jsx";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo = [],
  attachmentCount = 0,
  completedTodoCount = 0,
  todoChecklist = [],
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-500 bg-emerald-50 border border-emerald-500/10";
      case "Medium":
        return "text-amber-500 bg-amber-50 border border-amber-500/10";
      default:
        return "text-rose-500 bg-rose-50 border border-rose-500/10";
    }
  };

  const getBorderColor = () => {
    if (status === "In Progress") return "border-cyan-500";
    if (status === "Completed") return "border-lime-500";
    return "border-violet-500";
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl py-4 shadow-md border border-gray-200/50 cursor-pointer hover:shadow-lg transition"
    >
      {/* STATUS & PRIORITY */}
      <div className="flex items-center gap-2 px-4">
        <span
          className={`text-[11px] font-medium px-3 py-0.5 rounded ${getStatusTagColor()}`}
        >
          {status}
        </span>

        <span
          className={`text-[11px] font-medium px-3 py-0.5 rounded ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </span>
      </div>

      {/* CONTENT */}
      <div className={`px-4 mt-3 border-l-[3px] ${getBorderColor()}`}>
        <p className="text-sm font-medium text-gray-800 line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2">
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedTodoCount} / {todoChecklist.length}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* DATES & FOOTER */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {createdAt
                ? moment(createdAt).format("Do MMM YYYY")
                : "N/A"}
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {dueDate
                ? moment(dueDate).format("Do MMM YYYY")
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatars={assignedTo} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-primary text-sm" />
              <span className="text-xs font-medium text-gray-900">
                {attachmentCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
