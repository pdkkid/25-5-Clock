import { Fragment, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ClockAtom, CounterAtom } from "../../atom";
import { TimerType } from "./clock.types";

const LengthSelectionContainer = styled.div``;

const LengthSelection = styled.div``;

const Timer = styled.div``;

const TimerButtons = styled.div``;

const useTimer = (): TimerType => {
    const timer = useRef<unknown>(null);

    const [ clock, setClock ] = useRecoilState(ClockAtom)
    const [ counter, setCounter ] = useRecoilState(CounterAtom);

    const timerEnd = () => {
      if(clock.onBreak){
        setCounter(clock.session * 60)
        setClock({...clock, onBreak: false})
      } else {
        setCounter(clock.break * 60)
        setClock({...clock, onBreak: true})
      }
    };

    const stop = () => {
      clearTimeout(timer.current as number)
      setClock({...clock, paused:true})
    }

    const start = () => {
      setClock({...clock, paused:false, started:true})
    }

    const reset = () => {
      clearTimeout(timer.current as number)
      setCounter(clock.session * 60)
      setClock({...clock, onBreak: false, paused: true, started: false})
    }

    useEffect(() => {
      if(!clock.paused){
        if (counter <= 0){
          timerEnd()
          return
        }
        timer.current = setTimeout(() => setCounter(counter - 10), 1000)
      }
    }, [clock.paused, counter, setCounter]);

    return {
      Stop: stop,
      Start: start,
      Reset: reset,
    }
}

const getTime = (time: number): string => {
  
  var m: string = Math.floor(time / 60).toString().padStart(2,'0'),
      s: string = Math.floor(time % 60).toString().padStart(2,'0');

  return m + ":" + s
}

export const Clock = (): JSX.Element => {
  const [ clock, setClock ] = useRecoilState(ClockAtom)
  const [ counter, setCounter ] = useRecoilState(CounterAtom);

  useEffect(()=> {
    if (!clock.started) {
      setCounter(clock.session * 60)
    }
  }, [clock.started, clock.session])

  const timer = useTimer();

  const handleBreak = (val: number) => {
    if (clock.break + val <= 0 || clock.break + val > 60){
      return
    }
    setClock({...clock, break: clock.break + val})
  }

  const handleSession = (val: number) => {
    if (clock.session + val <= 0 || clock.session + val > 60){
      return
    }
    setClock({...clock, session: clock.session + val})
  }

  return (
    <Fragment>
      <LengthSelectionContainer>
        <LengthSelection>
          <p>Break Length</p>
          <button onClick={() => handleBreak(-1)}>-</button>
          {clock.break}
          <button onClick={() => handleBreak(1)}>+</button>
        </LengthSelection>
        <LengthSelection>
          <p>Session Length</p>
          <button onClick={() => handleSession(-1)}>-</button>
          {clock.session}
          <button onClick={() => handleSession(1)}>+</button>
        </LengthSelection>
      </LengthSelectionContainer>
      <Timer>
        <p>{clock.onBreak ? 'Break' : 'Session'}</p>
        {getTime(counter)}
      </Timer>
      <TimerButtons>
        <p>Timer Buttons</p>
        <button disabled={clock.paused} onClick={() => timer.Stop()}>Stop</button>
        <button disabled={!clock.paused} onClick={() => timer.Start()}>Start</button>
        <button onClick={() => timer.Reset()}>Reset</button>
      </TimerButtons>
    </Fragment>
  );
};
