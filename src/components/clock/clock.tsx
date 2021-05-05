import { Fragment, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ClockAtom, CounterAtom } from "../../atom";
import { TimerType } from "./clock.types";
import useSound from 'use-sound';
import alarmSound from '../../sounds/alarm.mp3';

const LengthSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const LengthSelection = styled.div`
  padding: 20px;
  margin: 50px 20px;
  font-size: 1.25em;
  text-align: center;
  border: 4px solid #40798c;
  border-radius: 5px;
  div {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
    p {
      padding: 0 8px;
    }
  }
`;

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  div {
    min-width: 200px;
    width: 35%;
    padding: 15px 0 15px 0;
    font-size: 1.75em;
    border: 6px solid #40798c;
    border-radius: 10px;
    p {
      font-size: 1.75em;
    }
    button {
      margin: 0 8px 0 8px;
    }
  }
`;

const Button = styled.button`
  border:1.5px solid #40798C;
  border-radius: 6px;
  text-decoration:none;
  color:#CFD7C7;
  background-color:#40798C;
  text-align:center;
  padding: 4px 8px;
  font-weight: 500;
  font-size: .75em;
  :hover:enabled{
    border-color:#4391ab;
    color: #F6F1D1;
  }
  :active{
    background-color:#70A9A1;
  }
  :disabled{
    opacity: 50%;
    cursor: not-allowed;
    pointer-events: all !important;
  }
`;

const useTimer = (): TimerType => {
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

  return {
    Stop: stopCounter,
    Start: startCounter,
    Reset: reset,
  };
};

const getTime = (time: number): string => {
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
  useEffect(() => {
    if (!clock.started) {
      setCounter(clock.session * 60);
    }
  }, [clock.started, clock.session, setCounter]);

  const timer = useTimer();

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
      <Timer>
        <div>
          {clock.onBreak ? "Break" : "Session"}
          <p>{getTime(counter)}</p>
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
      </Timer>
    </Fragment>
  );
};
