import { create } from 'zustand';

/**
 * Trade data store with initial state & update actions.
 */

type State = {
  deposited: number,
  changePercent: number
};

type Actions = {
  updateDeposited: (value: number) => void,
  updateChangePercent: (value: number) => void
};

export default create<State & Actions>((set) => ({
  deposited: 100,
  changePercent: 10,
  updateDeposited: (value) => set(() => ({ deposited: value })),
  updateChangePercent: (value) => set(() => ({ changePercent: value }))
}));