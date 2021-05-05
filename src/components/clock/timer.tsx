import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import useSound from "use-sound";
import { TimerType } from "./clock.types";
import { ClockAtom, CounterAtom } from "../../atom";
import alarmSound from '../../sounds/alarm.mp3';

export const Timer = (): TimerType => {
    const timer = useRef<unknown>(null);
  
    const [ play, { stop } ] = useSound(alarmSound, {interrupt: false})
    const [clock, setClock] = useRecoilState(ClockAtom);
    const [counter, setCounter] = useRecoilState(CounterAtom);
  
    const timerEnd = () => {
      if (clock.onBreak) {
        play()
        setCounter(clock.session * 60);
        setClock({ ...clock, onBreak: false});
      } else {
        play()
        setCounter(clock.break * 60);
        setClock({ ...clock, onBreak: true});
      }
    };

    useEffect(() => {
        if (!clock.paused) {
          if (counter <= 0) {
            timerEnd();
            return;
          }
          timer.current = setTimeout(() => setCounter(counter - 30), 1000);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [clock.paused, counter, setCounter]);
  
    const stopCounter = () => {
      clearTimeout(timer.current as number);
      setClock({ ...clock, paused: true });
    };
  
    const startCounter = () => {
      setClock({ ...clock, paused: false, started: true });
    };
  
    const reset = () => {
      stop()
      clearTimeout(timer.current as number);
      setCounter(clock.session * 60);
      setClock({ ...clock, onBreak: false, paused: true, started: false});
    };
  
    return {
      Stop: stopCounter,
      Start: startCounter,
      Reset: reset,
    };
  };