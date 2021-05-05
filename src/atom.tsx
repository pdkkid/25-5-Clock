import { atom } from "recoil";

export const ClockAtom = atom({
    key: 'clock',
    default: {
        paused: true,
        started: false,
        session: 25,
        break: 5,
        onBreak: false,
    },
})

export const CounterAtom = atom({
    key: 'counter',
    default: 20,
});