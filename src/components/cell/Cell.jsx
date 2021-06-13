import React, { memo } from 'react';
import { CellContainer, CenterDiv } from './components';

const Cell = ({ handleCellClick,
    cellIndex,
    width,
    isStriked,
    phrase,
    isCellCentered
}) => (<CellContainer
    onClick={() => (!isCellCentered && !isStriked) && handleCellClick(cellIndex)}
    width={width}
    isStriked={isStriked}
>
    {
        isCellCentered ? (
            <CenterDiv>
                <span>Bingo</span>
            </CenterDiv>
        ) : <span>{phrase}</span>

    }

</CellContainer>);

export default memo(Cell);
