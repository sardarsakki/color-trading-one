import React from 'react';
import { Stack } from '@mui/material';
import { SizeButton } from '../styled/StyledComponents';

const SizeSelection = ({ selectedBet, gamePhase, onSelection }) => {
  return (
    <Stack direction="row" spacing={1} mb={2}>
      <SizeButton
        fullWidth
        variant="contained"
        size="big"
        selected={selectedBet?.type === 'big'}
        disabled={gamePhase !== 'betting'}
        onClick={() => onSelection('big', 'big', 'Big (5-9)')}
      >
        Big (5-9)
      </SizeButton>
      <SizeButton
        fullWidth
        variant="contained"
        size="small"
        selected={selectedBet?.type === 'small'}
        disabled={gamePhase !== 'betting'}
        onClick={() => onSelection('small', 'small', 'Small (0-4)')}
      >
        Small (0-4)
      </SizeButton>
    </Stack>
  );
};

export default SizeSelection;