
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import RecommendationCard from "./RecommendationCard";
import MoodHistory from "./MoodHistory";
import { Loader2, Sparkles, History } from "lucide-react";

interface MoodRecommendation {
  id: string;
  timestamp: Date;
  userInput: string;
  moodSummary: string;
  musicVibe: string;
  youtubeSearch: string;
  spotifySearch: string;
  appleMusicSearch: string;
  recommendations: string[];
}

const MoodAnalyzer = () => {
  const [userInput, setUserInput] = useState("");
  const [recommendation, setRecommendation] = useState<MoodRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodRecommendation[]>([]);

  const analyzeMood = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Enhanced AI analysis simulation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const moodRecommendation = generateEnhancedMoodRecommendation(userInput);
    setRecommendation(moodRecommendation);
    
    // Add to history
    setMoodHistory(prev => [moodRecommendation, ...prev.slice(0, 9)]); // Keep last 10
    
    setIsAnalyzing(false);
  };

  const generateEnhancedMoodRecommendation = (input: string): MoodRecommendation => {
    const lowercaseInput = input.toLowerCase();
    
    const moodMappings = [
      {
        keywords: ['stressed', 'overwhelmed', 'anxious', 'worried', 'pressure'],
        summary: 'Stressed and overwhelmed',
        vibe: 'Calming ambient & nature sounds',
        youtubeSearch: 'stress relief ambient music meditation',
        spotifySearch: 'chill ambient stress relief',
        appleMusicSearch: 'relaxation meditation music',
        recommendations: ['Rain sounds with piano', 'Forest ambience', 'Deep breathing meditation music']
      },
      {
        keywords: ['sad', 'depressed', 'down', 'melancholy', 'heartbroken'],
        summary: 'Sad and reflective',
        vibe: 'Melancholic indie folk & acoustic',
        youtubeSearch: 'sad indie folk emotional acoustic',
        spotifySearch: 'melancholic indie folk',
        appleMusicSearch: 'sad acoustic songs',
        recommendations: ['Bon Iver type artists', 'Acoustic covers of popular songs', 'Emotional indie playlists']
      },
      {
        keywords: ['happy', 'excited', 'joyful', 'energetic', 'celebration'],
        summary: 'Happy and energetic',
        vibe: 'Upbeat pop hits & dance music',
        youtubeSearch: 'upbeat happy pop dance music',
        spotifySearch: 'feel good pop hits',
        appleMusicSearch: 'happy dance music',
        recommendations: ['Current pop chart toppers', 'Feel-good throwbacks', 'High-energy workout music']
      },
      {
        keywords: ['focused', 'concentrated', 'working', 'studying', 'productive'],
        summary: 'Focused and determined',
        vibe: 'Lo-fi study beats & instrumental',
        youtubeSearch: 'lofi hip hop study focus beats',
        spotifySearch: 'lofi study instrumental',
        appleMusicSearch: 'focus music instrumental',
        recommendations: ['ChilledCow style beats', 'Classical music for focus', 'Video game soundtracks']
      },
      {
        keywords: ['romantic', 'love', 'intimate', 'cozy', 'date'],
        summary: 'Romantic and warm',
        vibe: 'Smooth jazz, R&B & soul',
        youtubeSearch: 'romantic jazz r&b love songs',
        spotifySearch: 'romantic soul r&b',
        appleMusicSearch: 'love songs jazz',
        recommendations: ['Classic soul artists', 'Modern R&B slow jams', 'Jazz standards for romance']
      },
      {
        keywords: ['angry', 'frustrated', 'mad', 'irritated', 'furious'],
        summary: 'Frustrated and intense',
        vibe: 'Rock, metal & alternative',
        youtubeSearch: 'rock metal angry music playlist',
        spotifySearch: 'rock metal alternative angry',
        appleMusicSearch: 'hard rock metal music',
        recommendations: ['Heavy metal classics', 'Punk rock energy', 'Alternative rock anthems']
      },
      {
        keywords: ['nostalgic', 'memories', 'past', 'reminiscing', 'throwback'],
        summary: 'Nostalgic and wistful',
        vibe: 'Classic throwback hits',
        youtubeSearch: 'nostalgic throwback hits 90s 2000s',
        spotifySearch: 'throwback classics nostalgic',
        appleMusicSearch: 'retro hits nostalgia',
        recommendations: ['90s/2000s hits', 'Childhood movie soundtracks', 'Classic rock ballads']
      },
      {
        keywords: ['motivated', 'determined', 'driven', 'ambitious', 'workout'],
        summary: 'Motivated and driven',
        vibe: 'Uplifting electronic & workout beats',
        youtubeSearch: 'motivational electronic workout music',
        spotifySearch: 'workout motivation electronic',
        appleMusicSearch: 'gym motivation music',
        recommendations: ['High-energy EDM', 'Motivational hip-hop', 'Workout pump-up songs']
      }
    ];

    const matchedMood = moodMappings.find(mood => 
      mood.keywords.some(keyword => lowercaseInput.includes(keyword))
    );

    const selectedMood = matchedMood || {
      summary: 'Mixed emotions',
      vibe: 'Eclectic mix & discovery',
      youtubeSearch: 'chill music mixed emotions playlist',
      spotifySearch: 'chill mixed mood music',
      appleMusicSearch: 'mood music playlist',
      recommendations: ['Genre-blending playlists', 'Artist radio stations', 'Mood-based discoveries']
    };

    return {
      id: Date.now().toString(),
      timestamp: new Date(),
      userInput: input,
      moodSummary: selectedMood.summary,
      musicVibe: selectedMood.vibe,
      youtubeSearch: selectedMood.youtubeSearch,
      spotifySearch: selectedMood.spotifySearch,
      appleMusicSearch: selectedMood.appleMusicSearch,
      recommendations: selectedMood.recommendations
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label htmlFor="mood-input" className="block text-lg font-semibold text-gray-700">
                How are you feeling right now?
              </label>
              <Button
                onClick={() => setShowHistory(!showHistory)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <History className="w-4 h-4" />
                History ({moodHistory.length})
              </Button>
            </div>
            
            <Textarea
              id="mood-input"
              placeholder="Describe your emotions, mood, or what's on your mind... (e.g., 'I'm feeling overwhelmed but motivated to get things done')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[120px] text-base resize-none"
            />
            
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

      {showHistory && moodHistory.length > 0 && (
        <MoodHistory 
          history={moodHistory} 
          onSelectMood={setRecommendation}
          onClearHistory={() => setMoodHistory([])}
        />
      )}

      {recommendation && (
        <RecommendationCard recommendation={recommendation} />
      )}
    </div>
  );
};

export default MoodAnalyzer;
