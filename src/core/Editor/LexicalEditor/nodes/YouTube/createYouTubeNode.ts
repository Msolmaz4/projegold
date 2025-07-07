import YouTubeNode from "./YouTubeNode";

export function $createYouTubeNode(videoID: string): YouTubeNode {
  return new YouTubeNode(videoID);
}
