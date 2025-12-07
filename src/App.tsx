import CipherSuite from './components/CipherSuite';
import AppBar from './components/AppBar';

export default function App() {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 dark:text-white md:h-screen">
      <AppBar />
      <CipherSuite />
    </div>
  );
}
