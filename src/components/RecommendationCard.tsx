
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Heart, Music2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RecommendationCardProps {
  recommendation: {
    moodSummary: string;
    musicVibe: string;
    youtubeSearch: string;
  };
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Search query copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const openYouTube = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recommendation.youtubeSearch)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
          <Music2 className="w-6 h-6 mr-2 text-purple-600" />
          Your Music Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <Heart className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Mood Summary</h3>
              </div>
              <p className="text-gray-700 text-lg">{recommendation.moodSummary}</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <Music2 className="w-5 h-5 text-pink-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Music Vibe</h3>
              </div>
              <p className="text-gray-700 text-lg">{recommendation.musicVibe}</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <ExternalLink className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="font-semibold text-gray-800">YouTube Search</h3>
            </div>
            <p className="text-gray-700 mb-3 font-mono bg-gray-100 p-2 rounded text-sm">
              {recommendation.youtubeSearch}
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard(recommendation.youtubeSearch)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                onClick={openYouTube}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                size="sm"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Search YouTube
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
