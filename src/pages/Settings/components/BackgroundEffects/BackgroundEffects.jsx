export const BackgroundEffects = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-yellow-500/10 rounded-full blur-[80px]"></div>
    </div>
  )
}
