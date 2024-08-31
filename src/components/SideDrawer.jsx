export default function SideDrawer({ children }) {
    return (
      <div className="bg-base-300 h-screen rounded-lg m-2">
        <div className="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
          {children}
        </div>
      </div>
    );
  }