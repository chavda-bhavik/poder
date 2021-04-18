import React from 'react'

interface SearchProps {
    onSearch: (e: React.FormEvent<EventTarget>) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
    return <form method="GET" onSubmit={onSearch}>
    <div className="flex-grow-0 relative bg-whiteGray rounded-t-md p-1 border-b-2 border-yellow-900 drop-shadow-sm">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline text-gray-800">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </span>
      <input
        type="search" name="search" id="search"
        autoComplete="off"
        placeholder="search podcasts, episodes, artists and more..."
        autoFocus={true}
        className="w-full pl-10 py-1 text-lg sm:text-base bg-transparent outline-none text-black"
      />
    </div>
  </form>;
}