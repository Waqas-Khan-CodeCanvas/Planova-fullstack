import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { LuUsers } from "react-icons/lu";
import Modal from "../Modal.jsx";

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // -----------------------------
  // Fetch users
  // -----------------------------
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axiosInstance.get(
          API_PATHS.USERS.GET_ALL_USERS
        );
        setAllUsers(res.data || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getAllUsers();
  }, []);

  // -----------------------------
  // Sync temp state when modal opens
  // -----------------------------
  useEffect(() => {
    if (isModalOpen) {
      setTempSelectedUsers(selectedUsers);
    }
  }, [isModalOpen, selectedUsers]);

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserDetails = allUsers.filter((user) =>
    selectedUsers.includes(user._id)
  );

  return (
    <div className="space-y-2 mt-2">
      {/* Selected Avatars */}
      {selectedUserDetails.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {selectedUserDetails.map((user) => (
            <img
              key={user._id}
              src={user.profileImageUrl}
              alt={user.name}
              title={user.name}
              className="w-8 h-8 rounded-full border object-cover"
            />
          ))}

          <button
            className="card-btn flex items-center gap-1"
            onClick={() => setIsModalOpen(true)}
          >
            <LuUsers className="text-sm" /> Edit
          </button>
        </div>
      )}

      {/* Add Members Button */}
      {selectedUserDetails.length === 0 && (
        <button
          className="card-btn flex items-center gap-1"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-3 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => {
            const isChecked = tempSelectedUsers.includes(user._id);

            return (
              <label
                key={user._id}
                className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleUserSelection(user._id)}
                />

                <img
                  src={user.profileImageUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="secondary-btn"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button className="add-btn" onClick={handleAssign}>
            Assign
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
