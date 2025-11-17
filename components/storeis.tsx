"use client";

import {useEffect, useMemo} from "react";
import {useStoriesStore} from "@/stores/stories.store";
import {useShallow} from "zustand/react/shallow";
import {StoryItem} from "@/components/story-item";
import {AddStoryButton} from "@/components/add-story-button";
import StoryViewer from "@/components/story-viewer";

export default function Stories() {
  const {stories, revalidate, hydrated, currentIndex} = useStoriesStore(
    useShallow((state) => ({
      stories: state.stories,
      revalidate: state.revalidate,
      hydrated: state.hydrated,
      currentIndex: state.selectedStoryIndex
    })),
  );
  const isSelected = currentIndex >= 0

  const StoryViewerMemo = useMemo(() => StoryViewer, [])

  useEffect(() => {
    // Check for expired stories every minute
    const interval = setInterval(revalidate, 60000);
    return () => clearInterval(interval);
  }, [revalidate]);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {/* Add Story Button */}
        <AddStoryButton/>

        {/* Story Thumbnails */}
        {!hydrated ? (
          <div
            className={
              "flex-shrink-0 flex flex-col items-center gap-2 size-20 justify-center"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={"block size-10 animate-spin opacity-50"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v4"/>
              <path d="m16.2 7.8 2.9-2.9"/>
              <path d="M18 12h4"/>
              <path d="m16.2 16.2 2.9 2.9"/>
              <path d="M12 18v4"/>
              <path d="m4.9 19.1 2.9-2.9"/>
              <path d="M2 12h4"/>
              <path d="m4.9 4.9 2.9 2.9"/>
            </svg>
          </div>
        ) : (
          stories.map((story, index) => (
            <StoryItem key={story.id} story={story} index={index}/>
          ))
        )}
      </div>

      {/* Story Viewer */}
      {isSelected && <StoryViewerMemo stories={stories}/>}
    </>
  );
}
