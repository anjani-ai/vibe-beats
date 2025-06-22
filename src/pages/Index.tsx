
import { useState } from "react";
import MoodAnalyzer from "@/components/MoodAnalyzer";
import { Music } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Music className="w-12 h-12 text-white mr-3" />
            <h1 className="text-5xl font-bold text-white">
              Music Vibe Assistant
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Describe how you're feeling, and discover the perfect music to match your mood
          </p>
        </div>
        
        <MoodAnalyzer />
      </div>
    </div>
  );
};

export default Index;
