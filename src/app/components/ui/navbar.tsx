export async function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="w-full px-4 h-16 flex items-center justify-center">
        <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-400 via-cyan-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Rick and Morty Serie
        </h1>
      </div>
    </nav>
  )
}
