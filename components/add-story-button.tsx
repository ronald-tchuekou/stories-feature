"use client";

import React, {useRef} from "react";
import {useStoriesStore} from "@/stores/stories.store";

export const AddStoryButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addStory = useStoriesStore((state) => state.addStory);

  const handleAddStory = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      addStory(reader.result as string);
    };

    reader.readAsDataURL(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <button
        onClick={handleAddStory}
        className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer sticky left-0 bg-background pr-2"
      >
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-80 transition-opacity">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <span className="text-xs text-foreground">Add Story</span>
      </button>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
