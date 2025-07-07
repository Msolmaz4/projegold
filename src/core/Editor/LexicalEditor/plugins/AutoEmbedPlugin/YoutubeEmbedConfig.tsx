import { EmbedMatchResult } from "@lexical/react/LexicalAutoEmbedPlugin";
import type { LexicalEditor } from "lexical";
import { INSERT_YOUTUBE_COMMAND } from "../YouTubePlugin";
import { PlaygroundEmbedConfig } from "./types";

const YoutubeEmbedConfig: PlaygroundEmbedConfig = {
  contentName: "Youtube Video",

  exampleUrl: "https://www.youtube.com/watch?v=h8Q-jlHBcXM",

  // Icon for display.
  icon: <i className="icon youtube" />,

  insertNode: (editor: LexicalEditor, result: EmbedMatchResult) => {
    editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, result.id);
  },

  keywords: ["youtube", "video"],

  // Determine if a given URL is a match and return url data.
  parseUrl: async (url: string) => {
    const match =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

    const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

    if (id != null) {
      return {
        id,
        url,
      };
    }

    return null;
  },

  type: "youtube-video",
};

export default YoutubeEmbedConfig;
