import Episode from './components/Episode';

function App() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-600 via-teal-7 to-gray-800 p-3">
      <div className="w-full h-full bg-white rounded shadow-md">
        
        <form method="GET">
          <div className="relative bg-green-200 rounded-t-sm p-1 border-b-2 border-gray-800">
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
              autoFocus={true}
              className="w-full pl-10 py-1 text-lg bg-transparent outline-none text-black"
            />
          </div>
        </form>

        <div className="overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={1}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={7}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={6}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={5}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={4}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={3}
          />
          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={2}
          />

          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens"
            key={8}
          />

          <Episode
            imageAlt="image of Star Wars - The Force Awakens"
            imageSrc="https://cdn-images-1.listennotes.com/podcasts/the-rough-cut-AzKVtPeMOL4-53MLh7NpAwm.300x300.jpg"
            date={1579507216047}
            duration={1694}
            title="Star Wars - The Force Awakens The Force Awakens The Force Awakens The Force Awakens"
            key={9}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
