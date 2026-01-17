import { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  // Add todo
  const handleAddOption = () => {
    const trimmed = option.trim();
    if (!trimmed) return;

    setTodoList([...todoList, trimmed]);
    setOption("");
  };

  // Delete todo
  const handleDeleteOption = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };

  return (
    <div>
      {/* TODO LIST */}
      {todoList.map((item, index) => (
        <div
          key={`${item}-${index}`}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* INPUT */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="text"
          placeholder="Enter Task"
          value={option}
          onChange={(e) => setOption(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />

        <button
          type="button"
          className="card-btn"
          onClick={handleAddOption}
          disabled={!option.trim()}
        >
          <HiMiniPlus className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
