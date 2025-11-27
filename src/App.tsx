import { useAppSelector } from './store/hooks';
import TitleScreen from './components/layout/TitleScreen';
import GameContainer from './components/game/GameContainer';

function App() {
  const gameStatus = useAppSelector((state) => state.game.gameStatus);

  return (
    <div className="min-h-screen bg-game-bg">
      {gameStatus === 'menu' ? <TitleScreen /> : <GameContainer />}
    </div>
  );
}

export default App;
