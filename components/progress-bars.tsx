"use client"

import {useStoriesStore} from "@/stores/stories.store";
import {useShallow} from "zustand/react/shallow";
import {useEffect, useRef, useState} from "react";
import {Story} from "@/models/story";

const STORY_DURATION = 5000; // 5 seconds per story

type Props = {
  stories: Story[],
  currentIndex: number;
  onCurrentIndexChangeAction: (index: number) => void;
}

export const ProgressBars = ({stories, currentIndex, onCurrentIndexChangeAction}: Props) => {
  const {updateIndex} = useStoriesStore(
    useShallow((state) => ({
      updateIndex: state.setSelectedStoryIndex
    })),
  );
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [progress, setProgress] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  // Auto-progress story
  if (currentIndex !== prevIndex) {
    setProgress(0)
    setPrevIndex(currentIndex)
  }

  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1)
            onCurrentIndexChangeAction(currentIndex + 1);
          else updateIndex(-1)
          return 0;
        }
        return prev + 100 / (STORY_DURATION / 100);
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
      {stories.map((_, index) => (
        <div
          key={index}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white transition-all duration-100"
            style={{
              width:
                index < currentIndex
                  ? "100%"
                  : index === currentIndex
                    ? `${progress}%`
                    : "0%",
            }}
          />
        </div>
      ))}
    </div>
  )
}