import { create } from "zustand";

import type { } from "@redux-devtools/extension"; // required for devtools typing
import { devtools, persist } from "zustand/middleware";

interface BearState {
  bears: number;
  increment: () => void;
  decrement: () => void;
  extinct: () => void;
}

export const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increment: () => set((state) => ({ bears: state.bears + 1 })),
        decrement: () => set((state) => ({ bears: state.bears - 1 })),
        extinct: () => set(() => ({ bears: 0 })),
      }),
      {
        name: "bear-storage",
      }
    )
  )
);
