import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingOrError = ({
  isLoading,
  error,
}: {
  isLoading: boolean;
  error: React.ReactNode;
}) => {
  return (
    <Box my={2} display="flex" justifyContent="center" alignItems="center">
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : null}
    </Box>
  );
};

export default LoadingOrError;
