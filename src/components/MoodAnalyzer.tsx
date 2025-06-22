
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import RecommendationCard from "./RecommendationCard";
import { Loader2, Sparkles } from "lucide-react";

interface MoodRecommendation {
  moodSummary: string;
  musicVibe: string;
  youtubeSearch: string;
}

const MoodAnalyzer = () => {
  const [userInput, setUserInput] = useState("");
  const [recommendation, setRecommendation] = useState<MoodRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMood = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a more sophisticated mood analyzer
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const moodRecommendation = generateMoodRecommendation(userInput);
    setRecommendation(moodRecommendation);
    setIsAnalyzing(false);
  };

  const generateMoodRecommendation = (input: string): MoodRecommendation => {
    const lowercaseInput = input.toLowerCase();
    
    // Mood keywords mapping
    const moodMappings = [
      {
        keywords: ['stressed', 'overwhelmed', 'anxious', 'worried'],
        summary: 'Stressed and overwhelmed',
        vibe: 'Calming ambient sounds',
        search: 'relaxing ambient music stress relief'
      },
      {
        keywords: ['sad', 'depressed', 'down', 'melancholy'],
        summary: 'Sad and reflective',
        vibe: 'Melancholic indie folk',
        search: 'sad indie folk emotional playlist'
      },
      {
        keywords: ['happy', 'excited', 'joyful', 'energetic'],
        summary: 'Happy and energetic',
        vibe: 'Upbeat pop hits',
        search: 'upbeat happy pop music playlist'
      },
      {
        keywords: ['focused', 'concentrated', 'working', 'studying'],
        summary: 'Focused and determined',
        vibe: 'Lo-fi study beats',
        search: 'lofi hip hop study focus playlist'
      },
      {
        keywords: ['romantic', 'love', 'intimate', 'cozy'],
        summary: 'Romantic and warm',
        vibe: 'Smooth jazz and R&B',
        search: 'romantic jazz r&b love songs'
      },
      {
        keywords: ['angry', 'frustrated', 'mad', 'irritated'],
        summary: 'Frustrated and intense',
        vibe: 'Rock and alternative',
        search: 'rock alternative angry music playlist'
      },
      {
        keywords: ['nostalgic', 'memories', 'past', 'reminiscing'],
        summary: 'Nostalgic and wistful',
        vibe: 'Classic throwback hits',
        search: 'nostalgic throwback hits playlist'
      },
      {
        keywords: ['motivated', 'determined', 'driven', 'ambitious'],
        summary: 'Motivated and driven',
        vibe: 'Uplifting electronic beats',
        search: 'motivational electronic workout music'
      }
    ];

    // Find matching mood
    const matchedMood = moodMappings.find(mood => 
      mood.keywords.some(keyword => lowercaseInput.includes(keyword))
    );

    if (matchedMood) {
      return {
        moodSummary: matchedMood.summary,
        musicVibe: matchedMood.vibe,
        youtubeSearch: matchedMood.search
      };
    }

    // Default recommendation for unmatched moods
    return {
      moodSummary: 'Mixed emotions',
      musicVibe: 'Eclectic mix',
      youtubeSearch: 'chill music mixed emotions playlist'
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="mood-input" className="block text-lg font-semibold text-gray-700 mb-2">
                How are you feeling right now?
              </label>
              <Textarea
                id="mood-input"
                placeholder="Describe your emotions, mood, or what's on your mind... (e.g., 'I'm feeling overwhelmed but motivated to get things done')"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[120px] text-base resize-none"
              />
            </div>
            
            <Button 
              onClick={analyzeMood}
              disabled={!userInput.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-semibold"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing your vibe...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Find My Music Vibe
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {recommendation && (
        <RecommendationCard recommendation={recommendation} />
      )}
    </div>
  );
};

export default MoodAnalyzer;
