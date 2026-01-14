export type VideoFile = {
  id: string;
  filename: string;
  path: string;
  size: number;
  createdAt: string;
  modifiedAt: string;
};

export async function getVideos(): Promise<VideoFile[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${apiUrl}/videos`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const videos = await response.json();
    return videos;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}