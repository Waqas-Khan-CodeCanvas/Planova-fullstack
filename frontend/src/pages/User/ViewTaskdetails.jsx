import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";

const ViewTaskdetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  // get task info by id
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id))
      if(response.data){
        console.log(response.data)
        const taskInfo = response.data;
        setTask(taskInfo)
      }

    } catch (error) {
      console.error("Error: Fetching task details :", error);
    }
  };

  // handle todo chekk
  const updateTodoChecklist = async (index) => {};

  // handle attachment link click
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
    return () => {};
  }, [id]);
  return (
    <div>
      ViewTaskdetails
      <h2>hello world </h2>
    </div>
  );
};

export default ViewTaskdetails;
