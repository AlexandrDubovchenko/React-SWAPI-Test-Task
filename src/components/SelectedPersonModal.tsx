import {
  Modal,
  Paper,
  CircularProgress,
  Stack,
  Grid,
  Typography,
} from '@mui/material';
import { Box, SystemStyleObject } from '@mui/system';
import React, { FC } from 'react';

const modalBoxStyle: SystemStyleObject = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
};

type SelectedPersonModalProps = {
  open: boolean;
  onClose: () => void;
  isLoadingData: boolean;
  personData: {
    name: string;
    films: string;
    starships: string;
    species: string;
  };
};

export const SelectedPersonModal: FC<SelectedPersonModalProps> = ({
  open,
  onClose,
  isLoadingData,
  personData,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxStyle}>
        <Paper>
          {isLoadingData ? (
            <Box mx='auto' width={50} py={10}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack p={2}>
              <Grid mb={2} container>
                <Grid xs={2} item>
                  <Typography color='text.secondary'>Name:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{personData?.name}</Typography>
                </Grid>
              </Grid>
              <Grid mb={2} container>
                <Grid xs={2} item>
                  <Typography color='text.secondary'>Species:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{personData.species}</Typography>
                </Grid>
              </Grid>
              <Grid mb={2} container>
                <Grid xs={2} item>
                  <Typography color='text.secondary'>Movies:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{personData.films}</Typography>
                </Grid>
              </Grid>
              <Grid mb={2} container>
                <Grid xs={2} item>
                  <Typography color='text.secondary'>Spaceships:</Typography>
                </Grid>
                <Grid item>
                  <Typography>{personData.starships}</Typography>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Paper>
      </Box>
    </Modal>
  );
};
