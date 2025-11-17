import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import {Story} from "@/models/story";

type StoriesState = {
  stories: Story[];
  hydrated: boolean;
  selectedStoryIndex: number;
  setSelectedStoryIndex: (index: number) => void;
  addStory: (image: string) => void;
  removeStory: (id: string) => void;
  _setHydrated: (hydrate: boolean) => void;
  revalidate: () => void;
};

export const useStoriesStore = create<StoriesState>()(
  persist(
    (set) => ({
      stories: [],
      hydrated: false,
      selectedStoryIndex: -1,
      setSelectedStoryIndex(index) {
        set({selectedStoryIndex: index});
      },
      addStory(image: string) {
        const newStory: Story = {
          id: `story-${Math.floor(Math.random() * 999999)}`,
          image,
          timestamp: new Date().getTime(),
        };
        set((state) => ({stories: [...state.stories, newStory]}));
      },
      removeStory(id) {
        set((state) => ({
          stories: state.stories.filter((story) => story.id !== id),
        }));
      },
      _setHydrated(v) {
        set({hydrated: v});
      },
      revalidate() {
        set((state) => ({
          stories: state.stories.filter(
            (story) =>
              new Date().getTime() - story.timestamp < 24 * 60 * 60 * 1000, // 24 hours in milliseconds
          ),
        }));
      },
    }),
    {
      name: "stories",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({stories: state.stories}),
      onRehydrateStorage: () => (state) => {
        state?._setHydrated(true);
        state?.revalidate();
      },
    },
  ),
);
