import logo from '../assets/logo.svg';

import VideosList from '../components/VideosList';

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <header className="mt-20">
          <h1 className="text-4xl text-blue-700 uppercase font-extrabold">TL;DV technical test</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>

        <main className="mt-10 flex flex-col items-center justify-start w-full flex-1 sm:px-20 text-center">
          {/* <Link passHref href="/">
            <h1 className="text-4xl sm:text-6xl font-bold hover:cursor-pointer">
              Welcome to
              <span className="text-green-400 ml-2">
                Veesual-Spotify
              </span>
            </h1>
          </Link> */}

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
