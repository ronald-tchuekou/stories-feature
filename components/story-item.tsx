"use client";

import Image from "next/image";
import { getTimeAgo } from "@/lib/utils";
import { Story } from "@/models/story";
import { useStoriesStore } from "@/stores/stories.store";

type Props = { story: Story; index: number };

export const StoryItem = ({ story, index }: Props) => {
  const setSelectedStoryIndex = useStoriesStore(
    (state) => state.setSelectedStoryIndex,
  );

  return (
    <button
      onClick={() => setSelectedStoryIndex(index)}
      className="flex-shrink-0 flex flex-col items-center gap-2"
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
        <div className="w-full h-full rounded-full bg-background p-1">
          <Image
            width={100}
            height={100}
            src={story.image || "/placeholder.svg"}
            alt="Story"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-muted-foreground">
        {getTimeAgo(story.timestamp)}
      </span>
    </button>
  );
};
