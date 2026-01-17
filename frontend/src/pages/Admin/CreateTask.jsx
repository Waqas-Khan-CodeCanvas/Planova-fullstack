import { useEffect, useState } from "react";
import DashboardLayout from "../../Components/layouts/DashboardLayout.jsx";
import { PRIORITY_DATA } from "../../utils/data.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";

import SelectDropdown from "../../Components/Inputs/SelectDropdown.jsx";
import SelectUsers from "../../Components/Inputs/SelectUsers.jsx";
import AddAttachmentsInput from "../../Components/Inputs/AddAttachementsInput.jsx";
import TodoListInput from "../../Components/Inputs/TodoListInput.jsx";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Load task data (EDIT MODE)
  // ----------------------------
  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
        );

        const task = res.data;

        setTaskData({
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate
            ? task.dueDate.split("T")[0]
            : "",
          assignedTo: task.assignedTo.map(u => u._id),
          todoChecklist: task.todoChecklist.map(item => item.text),
          attachments: task.attachments || [],
        });
      } catch (err) {
        toast.error("Failed to load task");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, navigate]);

  const handleValueChange = (key, value) => {
    setTaskData(prev => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // ----------------------------
  // CREATE TASK
  // ----------------------------
  const createTask = async () => {
    setLoading(true);
    try {
      const todoChecklist = taskData.todoChecklist.map(text => ({
        text,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist,
      });

      toast.success("Task created successfully");
      clearData();
      navigate(-1);
    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // UPDATE TASK
  // ----------------------------
  const updateTask = async () => {
    setLoading(true);
    try {
      const todoChecklist = taskData.todoChecklist.map(text => ({
        text,
        completed: false,
      }));

      await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist,
        }
      );

      toast.success("Task updated successfully");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // DELETE TASK
  // ----------------------------
  const deleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(
        API_PATHS.TASKS.DELETE_TASK(taskId)
      );
      toast.success("Task deleted successfully");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleSubmit = () => {
    setError("");

    if (!taskData.title.trim()) return setError("Title is required");
    if (!taskData.description.trim()) return setError("Description is required");
    if (!taskData.dueDate) return setError("Due date is required");
    if (taskData.assignedTo.length === 0)
      return setError("Task must be assigned to at least one user");
    if (taskData.todoChecklist.length === 0)
      return setError("Add at least one todo item");

    taskId ? updateTask() : createTask();
  };

  return (
    <DashboardLayout activeMenu={taskId ? "Update Task" : "Create Task"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 px-2 py-1 border border-rose-100 hover:bg-rose-50"
                  onClick={deleteTask}
                >
                  <LuTrash2 /> Delete
                </button>
              )}
            </div>

            {/* TITLE */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                className="form-input"
                value={taskData.title}
                onChange={e =>
                  handleValueChange("title", e.target.value)
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={e =>
                  handleValueChange("description", e.target.value)
                }
              />
            </div>

            {/* PRIORITY / DATE / ASSIGN */}
            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={value =>
                    handleValueChange("priority", value)
                  }
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={e =>
                    handleValueChange("dueDate", e.target.value)
                  }
                />
              </div>

              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={value =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>

            {/* TODO */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoChecklist}
                setTodoList={value =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            {/* ATTACHMENTS */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={value =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">
                {error}
              </p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
