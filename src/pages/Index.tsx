import { BingoGame } from "@/components/BingoGame";
import heroImage from "@/assets/meeting-bingo-hero.jpg";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional meeting room with business people"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Meeting Bingo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Turn those endless corporate buzzwords into a fun game! 
            Listen for classic meeting phrases and mark them off your bingo card.
          </p>
        </div>
      </section>

      {/* Game Section */}
      <section className="container mx-auto px-4 pb-16">
        <BingoGame />
      </section>
    </main>
  );
};

export default Index;
