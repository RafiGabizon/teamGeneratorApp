import {useState,useEffect} from 'react';

export default function usePlayers() {
    const [players,setPlayers] =useState([]);
    useEffect(() => {
        const sorted = JSON.parse(localStorage.getItem('players')) || [];
        setPlayers(sorted);
    }, []);
    useEffect(() => {
        localStorage.setItem('players', JSON.stringify(players));
    }, [players]);



  return [players,setPlayers];
}
