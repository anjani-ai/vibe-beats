
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SpotifyIntegrationProps {
  searchQuery: string;
}

const SpotifyIntegration = ({ searchQuery }: SpotifyIntegrationProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [spotifyConnected, setSpotifyConnected] = useState(false);

  const connectSpotify = async () => {
    setIsConnecting(true);
    
    // Simulate Spotify connection process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would use Spotify's OAuth flow
    toast.success("Spotify integration demo activated! 🎵");
    setSpotifyConnected(true);
    setIsConnecting(false);
  };

  const createPlaylist = () => {
    toast.success("Feature coming soon: Auto-create Spotify playlist from your mood!");
    // This would create a playlist in the user's Spotify account
  };

  const generateSpotifyEmbed = () => {
    // Generate a demo Spotify embed URL
    const spotifyEmbedUrl = `https://open.spotify.com/embed/search/${encodeURIComponent(searchQuery)}`;
    return spotifyEmbedUrl;
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-green-800 flex items-center">
          <Music className="w-5 h-5 mr-2" />
          Spotify Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!spotifyConnected ? (
          <div className="text-center space-y-3">
            <p className="text-green-700">
              Connect your Spotify account to create instant playlists and get personalized recommendations!
            </p>
            <Button
              onClick={connectSpotify}
              disabled={isConnecting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isConnecting ? (
                <>Connecting to Spotify...</>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect Spotify (Demo)
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/80 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🎵 Connected Features:</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Auto-generate playlists from your mood
                </li>
                <li className="flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Get AI-powered song recommendations
                </li>
                <li className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Sync with your listening history
                </li>
              </ul>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={createPlaylist}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Create Playlist
              </Button>
              <Button
                onClick={() => window.open(generateSpotifyEmbed(), '_blank')}
                variant="outline"
                className="flex-1 border-green-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Spotify
              </Button>
            </div>
            
            <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
              💡 <strong>Hackathon Demo:</strong> In production, this would use Spotify's Web API to create real playlists and fetch personalized recommendations based on your mood analysis.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpotifyIntegration;
