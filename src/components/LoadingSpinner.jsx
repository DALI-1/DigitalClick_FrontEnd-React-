import Spinner from 'react-bootstrap/Spinner';
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
function LoadingSpinner() {
  return (
    <>
       <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>

    </>
  );
}

export default LoadingSpinner;

