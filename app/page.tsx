

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%_80%] lg:grid-cols-[20%_60%_20%] h-screen border-2 border-white">

      {/* Left Section (Hidden on small screens) */}
      <div className="hidden md:block sticky top-0 h-screen border-2 border-white">
        Left
      </div>

      {/* Center Section (Scrollable) */}
      <div className="overflow-y-auto h-screen border-2 border-white p-4">
        {/* Infinite Scrolling Content */}
        <div className="space-y-4">
          {Array.from({ length: 100 }).map((_, index) => (
            <p key={index} className="text-white">This is Center main page - Item {index + 1}</p>
          ))}
        </div>
      </div>

      {/* Right Section (Hidden on small & medium screens) */}
      <div className="hidden lg:block sticky top-0 h-screen border-2 border-white">
        Right
      </div>

    </div>
  );
}
