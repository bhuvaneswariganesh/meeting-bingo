import { useState, useEffect } from "react";
import { BingoCell } from "./BingoCell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRandomPhrases } from "@/data/meetingPhrases";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Trophy } from "lucide-react";

export const BingoGame = () => {
  const [phrases, setPhrases] = useState<string[]>([]);
  const [markedCells, setMarkedCells] = useState<Set<number>>(new Set());
  const [winningCells, setWinningCells] = useState<Set<number>>(new Set());
  const [hasWon, setHasWon] = useState(false);
  const { toast } = useToast();

  // Initialize game
  const initializeGame = () => {
    const newPhrases = getRandomPhrases(25);
    // Set center cell as "FREE SPACE"
    newPhrases[12] = "FREE SPACE";
    setPhrases(newPhrases);
    setMarkedCells(new Set([12])); // Center is always marked
    setWinningCells(new Set());
    setHasWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Check for winning combinations
  const checkForWin = (marked: Set<number>) => {
    const winPatterns = [
      // Rows
      [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], 
      [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
    ];

    for (const pattern of winPatterns) {
      if (pattern.every(index => marked.has(index))) {
        return new Set(pattern);
      }
    }
    return null;
  };

  // Handle cell click
  const handleCellClick = (index: number) => {
    if (hasWon) return;

    const newMarked = new Set(markedCells);
    if (newMarked.has(index)) {
      newMarked.delete(index);
    } else {
      newMarked.add(index);
    }

    setMarkedCells(newMarked);

    // Check for win
    const winningPattern = checkForWin(newMarked);
    if (winningPattern && !hasWon) {
      setWinningCells(winningPattern);
      setHasWon(true);
      toast({
        title: "🎉 BINGO! 🎉",
        description: "Congratulations! You've got a winning line!",
        duration: 5000,
      });
      
      // Add confetti effect
      createConfetti();
    }
  };

  // Create confetti animation
  const createConfetti = () => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      
      container.appendChild(confetti);
      
      setTimeout(() => {
        container.removeChild(confetti);
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Meeting Bingo
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Listen for these corporate buzzwords and mark them off your card!
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={initializeGame}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Game
            </Button>
            {hasWon && (
              <div className="flex items-center gap-2 text-success font-semibold">
                <Trophy className="w-5 h-5" />
                BINGO! You Won!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bingo Grid */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-5 gap-2 md:gap-3 mx-auto max-w-2xl">
            {phrases.map((phrase, index) => (
              <BingoCell
                key={index}
                phrase={phrase}
                isMarked={markedCells.has(index)}
                isWinningCell={winningCells.has(index)}
                onClick={() => handleCellClick(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">How to Play</h3>
          <p className="text-muted-foreground">
            During your next meeting, listen for these classic corporate phrases. 
            Click on a phrase when you hear it. Get 5 in a row (horizontal, vertical, or diagonal) to win!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};