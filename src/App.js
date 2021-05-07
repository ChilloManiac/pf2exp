import './App.css';
import {useCallback, useEffect, useState} from 'react'

function App() {
  const [myExp, setMyExp] = useState(0)
  const [highestExp, setHighestExp] = useState(0)
  const [myLevel, setMyLevel] = useState(0)
  const [highestLevel, setHighestLevel] = useState(0)
  const [givenExp, setGivenExp] = useState(0)
  const [isActive, setActive] = useState(false)

  const set = (setter) => (event) => {
    const val = parseInt(event.target.value);

    setter(val)
  }

  const onClick = () => {
    setActive(!isActive)
  }

  const calculate = useCallback(() => {
    const modifier = highestLevel - myLevel + 1;
    setMyExp((m) => m + modifier)
    setHighestExp((h) => h + 1)
    setGivenExp(givenExp - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [givenExp])

  useEffect(() => {
    if (highestExp >= 1000 & isActive) {
      setHighestLevel((h) => h + 1)
      setHighestExp(highestExp - 1000)
    }
  }, [highestExp, isActive])

  useEffect(() => {
    if (myExp >= 1000 && isActive) {
      setMyLevel((m) => m + 1)
      setMyExp(myExp - 1000)
    }
  }, [myExp, isActive])

  useEffect(() => {
    if (givenExp === 0) {
      setActive(false);
      return;
    }
    if (isActive) {
      setTimeout(() => calculate(), 5)
    }
  }, [isActive, givenExp, calculate])

  return (
    <div className="container">
      <div className="card">
        <div className="inner-container">
          <div className="row">
            <label htmlFor="myExp">
              My experience:
            </label>
            <input type="number" id="myExp" className="small" value={myExp} onChange={set(setMyExp)} />
          </div>
          <div className="row">
            <label htmlFor="myLevel">
              My level:
            </label>
            <input type="number" id="myLevel" className="small" value={myLevel} onChange={set(setMyLevel)} />
          </div>
        </div>
        <div className="inner-container">
          <div className="row">
            <label htmlFor="highestExp">
              Highest experience:
            </label>
            <input type="number" id="highestExp" className="small" value={highestExp} onChange={set(setHighestExp)} />
          </div>
          <div className="row">
            <label htmlFor="highestLvl">
              Highest level:
            </label>
            <input type="number" id="highestLevel" className="small" value={highestLevel} onChange={set(setHighestLevel)} />
          </div>
        </div>
        <div className="inner-container inner-container--wide">
          <div className="row">
            <label htmlFor="givenExp">
              Given experience:
            </label>
            <input type="number" id="givenExp" className="small" value={givenExp} onChange={set(setGivenExp)} />
          </div>
          <div className="row">
            <button onClick={onClick}>{isActive ? 'Stop' : 'Start'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
