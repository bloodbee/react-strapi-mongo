import VideosList from '../components/VideosList';

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <header className="mt-20">
          <h1 className="text-2xl sm:text-4xl text-blue-700 uppercase font-extrabold">TL;DV technical test</h1>
        </header>

        <main className="mt-10 flex flex-col items-center justify-start w-full flex-1 sm:px-20 text-center">
          <div className="flex flex-wrap items-center justify-around max-w-min sm:max-w-6xl mt-6 w-full">
            <VideosList></VideosList>
          </div>
        </main>

        <footer className="mt-20 flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://bloodbee.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by Bloodbee
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
