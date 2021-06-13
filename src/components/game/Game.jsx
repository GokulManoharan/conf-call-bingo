import React, { useState, useEffect, useCallback, memo } from 'react';
import { GameContainer, BingoScore } from './components';
import initialGameData from "../../assets/data/phrases.json";
import { findBingos } from "../../assets/utils/gameUtils";
import celeberate from '../../assets/utils/confetti';
import Cell from '../cell/Cell';

const Game = () => {
    const [gameData, setGameData] = useState([]);
    const [gameRows] = useState(5);
    const [centerCell, setCenterCell] = useState("");
    const [bingos, setBingos] = useState([]);
    const [bingosWon, setBingosWon] = useState(0);
    const [matchedPossibilityIndexes, setMatchedPossibilityIndexes] = useState([]);

    useEffect(() => {
        shuffleBoard();
    }, []);

    useEffect(() => {
        checkWinnings(gameData);
    }, [gameData]);

    const shuffleBoard = () => {
        let temp = [];
        let addedIndexes = [];
        do {
            const random = Math.floor(Math.random() * (gameRows*gameRows));
            if (!addedIndexes.includes(random)) {
                temp.push(initialGameData[random]);
                addedIndexes.push(random);
            }
        } while (temp.length !== (gameRows*gameRows));
        findCenterCellIndex(temp);
        setGameData(temp);
    }

    const findCenterCellIndex = useCallback(temp => {
        let middleCell = Math.floor(temp.length / 2);
        setCenterCell(middleCell);
    })

    const handleCellClick = useCallback((cellIndex) => {
        let rows = [...gameData];
        rows[cellIndex].isStriked = true;
        setGameData(rows)
    })

    const checkWinnings = useCallback((data) => {
        const { matchingBingos, matchedPossibilityIndex } = findBingos([...data], matchedPossibilityIndexes);
        if (matchingBingos?.length > 0) {
            let temp = bingos;
            matchingBingos.forEach(b => temp.push(b))
            setBingos(temp);
            setBingosWon(temp.length)
            celeberate();
            setMatchedPossibilityIndexes(prev => [...prev, ...matchedPossibilityIndex]);
        }
    })

    const renderCell = (cell, cellIndex) => {
        return (
            <React.Fragment key={cellIndex}>
                <Cell
                    cellIndex={cellIndex}
                    isCellCentered={centerCell === cellIndex}
                    phrase={cell.phrase}
                    handleCellClick={handleCellClick}
                    isStriked={cell.isStriked}
                />
            </React.Fragment>
        )
    }

    return (
        <>
            <BingoScore>Bingos won: {bingosWon}/12</BingoScore>
            <GameContainer>
                {
                    gameData?.length > 0 && gameData?.map((cell, cellIndex) => {
                        return (
                            <React.Fragment key={cellIndex}>
                                {
                                    renderCell(cell, cellIndex)
                                }
                            </React.Fragment>
                        )
                    })
                }
            </GameContainer>
        </>
    );
};

export default memo(Game);