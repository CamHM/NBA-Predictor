import React, { useState, useEffect } from 'react';
import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import logos from "./lgos.json";
import MaterialIcon from "material-icons-react";
import Team from "./Team";
import Prediction from "./Prediction";
import './App.css';
import 'bulma/css/bulma.css';

function App() {
    let history = useHistory();
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});

    useEffect(() => {
        fetch('https://ic-nba.herokuapp.com/teams_season_results')
            .then(res => res.json())
            .then(data => setTeams(data))
    }, []);

    const handleTeam = team => {
        setTeam(team);
        history.push(`/${team.team}`);
    };

    const navigate = () => {
        history.push('/prediction');
    };

    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <p className="title">NBA Predictor</p>
                    <div className="mainButton" onClick={navigate}>
                        Predicción de Temporada
                    </div>
                    <div className="Teams">
                        {teams.map((t, i) => <TeamCard key={`team-${t.team}`} team={{...t, id: i}} onClick={handleTeam} />)}
                    </div>
                </Route>
                <Route exact path="/prediction">
                    <Prediction />
                </Route>
                <Route exact path="/:team">
                    <Team team={team} />
                </Route>
            </Switch>
        </div>
    );
}

const TeamCard = ({ team, onClick }) => {
  return (
      <div className="TeamCard" onClick={() => onClick(team)}>
        <img src={logos[team.team]} alt="" width="100%" />
        <p className="TeamName">{team.team}</p>
        <div className="TeamWins">
            <div className="wins">
                <MaterialIcon icon="arrow_upward" color="#5EBC00" />
                <h3>{team.win}</h3>
            </div>
            <div className="loss">
                <MaterialIcon icon="arrow_downward" color="#FF3D13" />
                <p>{team.loss}</p>
            </div>
        </div>
      </div>
  )
};

export default App;
