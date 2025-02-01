import { Button } from "@/components/ui/button";
import { authYouTube } from "@/services/api/api";


const YouTubeAuthorization = () => {

    const handleAuth = () => {
        authYouTube();
    }
    return (  
        <div>
            <Button onClick={handleAuth}>Authorize YouTube</Button>
        </div>
    );
}
 
export default YouTubeAuthorization;