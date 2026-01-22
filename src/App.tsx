import CipherSuite from './components/CipherSuite';
import AppBar from './components/AppBar';

export default function App() {
  return (
    <div className="flex flex-col bg-neutral-200 dark:bg-black dark:text-neutral-100 md:h-screen">
      <AppBar />
      <CipherSuite />
    </div>
  );
}
