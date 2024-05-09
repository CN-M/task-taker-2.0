import { AuthButton } from "./authButton";

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold">Task Taker</h1>
          </div>
          <div className="flex space-x-4 items-center">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
