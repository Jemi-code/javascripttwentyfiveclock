import React, { useEffect, useRef, useState } from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import music from "./ding-ding-sound-effect.mp3";

const Timer = () => {
    const [sess, setSess] = useState(25);
    const [br, setBr] = useState(5);
    const [timeLeft, updateTime] = useState();
    const [keyword, setKeyWord] = useState("Session");
    const [disTime, setDisplay] = useState(`${sess}`);
    let sessTimer = useRef();
    let sessionTimer = useRef();
    let brkTimer = useRef();
    let breakTimer = useRef();
    let increaseBreak = useRef();
    let decreaseBreak = useRef();
    let increaseSess = useRef();
    let decreaseSess = useRef();
    let stop = useRef(true);

    useEffect(() => {
        updateTime(sess*60);
    }, [sess])

    useEffect(()=> {
        let minutes = Math.floor(timeLeft/60);
        let seconds = timeLeft - minutes * 60;
        seconds < 10 ? setDisplay(`${minutes} : 0${seconds}`) : setDisplay(`${minutes} : ${seconds}`);
        increaseBreak.current = () => {
            setBr(prev => prev += 1);
        }
    
        decreaseBreak.current = () => {
            if(br > 1){
                setBr(prev => prev -= 1);
            }
        }
    
        increaseSess.current = () => {
            if(sess < 60){
                setSess(prev => prev += 1);
            }
        }
    
        decreaseSess.current = () => {
            if(sess > 1) {
                setSess(prev => prev -= 1);
            }
        }


        sessTimer.current = () => {
            setKeyWord("Session");
            stop.current = true;
            sessionTimer.current = setInterval(() => {
                updateTime((prev) => prev -= 1);
            }, 1000);
        }

        brkTimer.current = () => {
            setKeyWord("Break");
            stop.current = false;
            breakTimer.current = setInterval(() => {
                updateTime((prev) => prev -= 1);
            },1000)
        }

        if(timeLeft <= -1){
            const audio = document.getElementById("beep");
            audio.play();
            if(stop.current){
                clearInterval(sessionTimer.current);
                updateTime(br * 60);
                brkTimer.current();
            } else {
                clearInterval(breakTimer.current);
                updateTime(sess * 60);
                sessTimer.current();
            }    
        }
    
        if(timeLeft <= 60) {
            document.getElementById("time-left").style.color = "red";
        } else {
            document.getElementById("time-left").style.color = "#fff";
        }

        return () => {
            clearInterval(sessTimer);
            clearInterval(brkTimer);
        }
    }, [timeLeft, br, sess]);

    const startTimer = (event) => {
        event.currentTarget.style.pointerEvents = "none";
        const pause = document.getElementById("pause").style;
        pause.pointerEvents = "auto";
        console.log(stop.current);
        if(stop.current){
            sessTimer.current();
        } else {
            brkTimer.current();
        }
    }

    const pauseTimer = (event) => {
        event.currentTarget.style.pointerEvents = "none";
        const play = document.getElementById("start_stop play").style;
        play.pointerEvents = "auto";
        if(stop.current){
            clearInterval(sessionTimer.current);
            console.log("pause session");
        } else {
            clearInterval(breakTimer.current);
            console.log("pause break");
        }
    }

    const resTimer = () => {
        clearInterval(sessionTimer.current);
        clearInterval(breakTimer.current);
        setBr(5);
        setSess(25);
        updateTime(sess*60);
    }

    return (
        <Container className = "wrapper text-center d-flex flex-column align-items-center justify-content-center">
            <header>
                <h1>25 + 5 Clock</h1>
            </header>

            <Container>
                <Row>
                    <Col>
                        <h2 id = "break-label">Break Length</h2>
                        <h4><i id = "break-increment" role = "button" onClick={() => increaseBreak.current()} className="fa-solid fa-arrow-up"></i><span id = "break-length" className='p-2'>{br}</span><i id = "break-decrement" role = "button" onClick={() => decreaseBreak.current()} className="fa-solid fa-arrow-down"></i></h4>
                    </Col>
                    <Col>
                        <h2 id = "session-label">Session Length</h2>
                        <h4><i id = "session-increment" role = "button" onClick={() => increaseSess.current()} className="fa-solid fa-arrow-up"></i><span id = "session-length" className='p-2'>{sess}</span><i id = "session-decrement" onClick={() => decreaseSess.current()} role = "button" className="fa-solid fa-arrow-down"></i></h4>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <Col xs = {{offset: 2, span: 8}} md = {{span: 3, offset: 5}} className='session-place py-4 my-3'>
                        <h2 id = "timer-label">{keyword}</h2>
                        <h4 id = "time-left" className='display-2'>{disTime}</h4>
                        {/* <h4 id = "time-left" className='display-2'>{timeLeft}</h4> */}
                    </Col>
                </Row>
            </Container>

            <div className='text-center'>
                <p className='display-5' role = "button" id = "start_stop play" onClick={startTimer}><i className="fa-solid fa-play"></i></p>
                <p className='display-5' role = "button" id = "pause" onClick={pauseTimer}><i className="fa-solid fa-pause"></i></p>
                <p className='display-5' role = "button" id = "reset" onClick={() => resTimer()}><i className="fa-solid fa-arrows-rotate"></i></p>
            </div>
            <audio id = "beep" src = {music}>
            </audio>
        </Container>
    );
};

export default Timer;