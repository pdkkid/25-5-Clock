import { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import { ClockAtom, CounterAtom } from "../../atom";
import {LengthSelectionContainer, LengthSelection, TimerContainer, Button} from './clock.styles';
import { Timer } from './timer'


const formatTime = (time: number): string => {
  var m: string = Math.floor(time / 60)
      .toString()
      .padStart(2, "0"),
    s: string = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

  return m + ":" + s;
};

export const Clock = (): JSX.Element => {
  const [clock, setClock] = useRecoilState(ClockAtom);
  const [counter, setCounter] = useRecoilState(CounterAtom); 
  const timer = Timer();

  useEffect(() => {
    if (!clock.started) {
      setCounter(clock.session * 60);
    }
  }, [clock.started, clock.session, setCounter]);

  const handleBreak = (val: number) => {
    if (clock.break + val <= 0 || clock.break + val > 60) {
      return;
    }
    setClock({ ...clock, break: clock.break + val });
  };

  const handleSession = (val: number) => {
    if (clock.session + val <= 0 || clock.session + val > 60) {
      return;
    }
    setClock({ ...clock, session: clock.session + val });
  };

  return (
    <Fragment>
      <LengthSelectionContainer>
        <LengthSelection>
          <p>Break Length</p>
          <div>
          <Button onClick={() => handleBreak(-1)}>{'<'}</Button>
          <p>{clock.break}</p>
          <Button onClick={() => handleBreak(1)}>{'>'}</Button>
          </div>
        </LengthSelection>
        <LengthSelection>
          <p>Session Length</p>
          <div>
          <Button onClick={() => handleSession(-1)}>{'<'}</Button>
          <p>{clock.session}</p>
          <Button onClick={() => handleSession(1)}>{'>'}</Button>
          </div>
        </LengthSelection>
      </LengthSelectionContainer>
      <TimerContainer>
        <div>
          {clock.onBreak ? "Break" : "Session"}
          <p>{formatTime(counter)}</p>
          <Button disabled={clock.paused} onClick={() => timer.Stop()}>
            Stop
          </Button>
          <Button disabled={!clock.paused} onClick={() => timer.Start()}>
            Start
          </Button>
          <Button disabled={!clock.started} onClick={() => timer.Reset()}>
            Reset
          </Button>
        </div>
      </TimerContainer>
    </Fragment>
  );
};
