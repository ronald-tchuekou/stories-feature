"use client";

import React, {useEffect, useState} from "react";
import {useStoriesStore} from "@/stores/stories.store";
import {useShallow} from "zustand/react/shallow";
import {getTimeAgo} from "@/lib/utils";
import Image from "next/image";
import {ProgressBars} from "@/components/progress-bars";
import {Story} from "@/models/story";

const MIN_SWIPE_DISTANCE = 50;

type Props = {
  stories: Story[]
}

export default function StoryViewer({stories}: Props) {
  const {initialIndex, removeStory} = useStoriesStore(
    useShallow((state) => ({
      removeStory: state.removeStory,
      initialIndex: state.selectedStoryIndex,
    })),
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentStory = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex(currentIndex < stories.length - 1 ? currentIndex + 1 : -1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDelete = () => {
    removeStory(currentStory.id);
    if (stories.length === 1) {
      setCurrentIndex(-1);
    } else if (currentIndex === stories.length - 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrentIndex(-1);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setCurrentIndex]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Progress bars */}
      <ProgressBars stories={stories} currentIndex={currentIndex} onCurrentIndexChangeAction={setCurrentIndex}/>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 pt-4">
        <span className="text-white text-sm">
          {currentStory ? getTimeAgo(currentStory.timestamp) : 'none'}
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentIndex(-1)}
            className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Story Image */}
      <div
        className="relative w-full h-full max-w-lg flex items-center justify-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Image
          height={1000}
          width={1000}
          src={currentStory?.image || "/placeholder.svg"}
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation Areas */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
          aria-label="Previous story"
        />
        <button
          onClick={handleNext}
          className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
          aria-label="Next story"
        />
      </div>

      {/* Navigation arrows (visible on hover for desktop) */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 hover:opacity-100"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 hover:opacity-100"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
