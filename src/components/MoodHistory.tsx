
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

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

interface MoodHistoryProps {
  history: MoodRecommendation[];
  onSelectMood: (mood: MoodRecommendation) => void;
  onClearHistory: () => void;
}

const MoodHistory = ({ history, onSelectMood, onClearHistory }: MoodHistoryProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  const handleClearHistory = () => {
    onClearHistory();
    toast.success("Mood history cleared!");
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            Your Mood Journey
          </CardTitle>
          <Button
            onClick={handleClearHistory}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((mood) => (
            <div
              key={mood.id}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectMood(mood)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-semibold text-purple-700">
                      {mood.moodSummary}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTimeAgo(mood.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    "{mood.userInput.length > 100 ? mood.userInput.substring(0, 100) + '...' : mood.userInput}"
                  </p>
                  <p className="text-sm text-pink-600 mt-1">
                    → {mood.musicVibe}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMood(mood);
                  }}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {history.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No mood history yet. Start by analyzing your first mood!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodHistory;
