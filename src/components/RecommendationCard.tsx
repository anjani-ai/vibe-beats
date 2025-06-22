
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Heart, Music2, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SpotifyIntegration from "./SpotifyIntegration";
import SharingOptions from "./SharingOptions";

interface RecommendationCardProps {
  recommendation: {
    id: string;
    timestamp: Date;
    userInput: string;
    moodSummary: string;
    musicVibe: string;
    youtubeSearch: string;
    spotifySearch: string;
    appleMusicSearch: string;
    recommendations: string[];
  };
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showSharing, setShowSharing] = useState(false);

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

  const openPlatform = (platform: 'youtube' | 'spotify' | 'appleMusic') => {
    let searchUrl = '';
    
    switch (platform) {
      case 'youtube':
        searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recommendation.youtubeSearch)}`;
        break;
      case 'spotify':
        searchUrl = `https://open.spotify.com/search/${encodeURIComponent(recommendation.spotifySearch)}`;
        break;
      case 'appleMusic':
        searchUrl = `https://music.apple.com/search?term=${encodeURIComponent(recommendation.appleMusicSearch)}`;
        break;
    }
    
    window.open(searchUrl, '_blank');
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
          <Music2 className="w-6 h-6 mr-2 text-purple-600" />
          Your Music Recommendation
          <Button
            onClick={() => setShowSharing(!showSharing)}
            variant="ghost"
            size="sm"
            className="ml-auto"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {showSharing && (
          <SharingOptions recommendation={recommendation} />
        )}
        
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

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-gray-800 mb-2">AI Recommendations</h3>
              <ul className="space-y-1">
                {recommendation.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            {/* YouTube */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <ExternalLink className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-gray-800">YouTube</h3>
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
                  onClick={() => openPlatform('youtube')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Search
                </Button>
              </div>
            </div>

            {/* Spotify */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <ExternalLink className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Spotify</h3>
              </div>
              <p className="text-gray-700 mb-3 font-mono bg-gray-100 p-2 rounded text-sm">
                {recommendation.spotifySearch}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(recommendation.spotifySearch)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={() => openPlatform('spotify')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Search
                </Button>
              </div>
            </div>

            {/* Apple Music */}
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border">
              <div className="flex items-center mb-2">
                <ExternalLink className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Apple Music</h3>
              </div>
              <p className="text-gray-700 mb-3 font-mono bg-gray-100 p-2 rounded text-sm">
                {recommendation.appleMusicSearch}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(recommendation.appleMusicSearch)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={() => openPlatform('appleMusic')}
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <SpotifyIntegration searchQuery={recommendation.spotifySearch} />
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
