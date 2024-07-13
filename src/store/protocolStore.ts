import { create } from 'zustand';

/**
 * Protocol data store with initial state & update actions.
 */

type State = {
  avaxPrice: number,
  avaxDeposited: number,
  ausdCirculation: number,
  baseAusdPrice: number,
  xavaxCirculation: number
};

type Actions = {
  updateAvaxPrice: (value: number) => void,
  updateAusdCirculation: (value: number) => void,
  updateXavaxCirculation: (value: number) => void
};

export const useProtocolStore = create<State & Actions>((set) => ({
  avaxPrice: 30,
  avaxDeposited: 90000,
  ausdCirculation: 2000000,
  baseAusdPrice: 1,
  xavaxCirculation: 575802,
  updateAvaxPrice: (value) => set(() => ({ avaxPrice: value })),
  updateAusdCirculation: (value) => set(() => ({ ausdCirculation: value })),
  updateXavaxCirculation: (value) => set(() => ({ xavaxCirculation: value }))
}));