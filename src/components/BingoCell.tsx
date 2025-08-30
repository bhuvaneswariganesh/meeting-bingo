import { cn } from "@/lib/utils";

interface BingoCellProps {
  phrase: string;
  isMarked: boolean;
  isWinningCell: boolean;
  onClick: () => void;
}

export const BingoCell = ({ phrase, isMarked, isWinningCell, onClick }: BingoCellProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bingo-cell",
        "relative aspect-square p-2 rounded-lg",
        "bg-card text-card-foreground",
        "flex items-center justify-center text-center",
        "text-xs md:text-sm font-medium",
        "border border-border",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "marked text-accent-foreground": isMarked,
          "bingo-winner": isWinningCell,
        }
      )}
    >
      <span className="leading-tight">{phrase}</span>
      {isMarked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-accent-foreground/20 flex items-center justify-center">
            <span className="text-lg">✓</span>
          </div>
        </div>
      )}
    </button>
  );
};