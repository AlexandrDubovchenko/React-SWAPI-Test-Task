import { Button, Stack } from '@mui/material';
import React, { FC } from 'react';
import { Person } from '../types';

type PeopleListProps = {
  data: Person[];
  handleItemClick: (v: Person) => void;
};

export const PeopleList: FC<PeopleListProps> = ({ data, handleItemClick }) => {
  return (
    <Stack>
      {data.map((p) => (
        <Button onClick={() => handleItemClick(p)} key={p.name}>
          {p.name} (Birth Year: {p.birth_year})
        </Button>
      ))}
    </Stack>
  );
};
