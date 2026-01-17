const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-black mb-6">Planova</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
