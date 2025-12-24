export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center bg-white overflow-hidden">
      <div className="animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
