import { GameLauncher } from './components/GameLauncher';
import { AnimatedBackground } from './components/AnimatedBackground';

export default function App() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <GameLauncher />
    </div>
  );
}