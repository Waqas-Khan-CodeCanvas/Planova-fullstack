import React from "react";

const AvatarGroup = ({ users = [], maxVisible = 5, size = 32 }) => {
  const visibleUsers = users.slice(0, maxVisible);
  const extraCount = users.length - maxVisible;

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="flex items-center">
      {visibleUsers.map((user, index) => (
        <div
          key={user?._id || index}
          className="relative -ml-2 first:ml-0 rounded-full border-2 border-white bg-gray-200 overflow-hidden flex items-center justify-center"
          style={{ width: size, height: size }}
          title={user?.name}
        >
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-gray-600">
              {getInitials(user?.name)}
            </span>
          )}
        </div>
      ))}

      {extraCount > 0 && (
        <div
          className="relative -ml-2 rounded-full border-2 border-white bg-gray-100 text-xs font-semibold text-gray-600 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
