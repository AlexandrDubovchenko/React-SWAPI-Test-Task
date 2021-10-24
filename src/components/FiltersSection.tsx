import {
  Typography,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import React, { FC } from 'react';
import { Species, Film, FilterOption } from '../types';

type FiltersSectionProps = {
  filters: FilterOption[];
  setFilters: (v: FilterOption[]) => void;
  films: Film[];
  species: Species[];
};

export const FiltersSection: FC<FiltersSectionProps> = ({
  filters,
  setFilters,
  species,
  films,
}) => {
  const handleFiltersChange = (item: Species | Film) => {
    const itemIndex = filters.findIndex((filter) => filter.url === item.url);
    if (itemIndex !== -1) {
      const newFilters = [...filters];
      newFilters.splice(itemIndex, 1);
      setFilters(newFilters);
    } else {
      setFilters([
        ...filters,
        {
          url: item.url,
          people: (item as Film).characters || (item as Species).people,
        },
      ]);
    }
  };
  return (
    <>
      <Typography variant='subtitle2' color='text.secondary'>
        Movie Filters
      </Typography>
      <List>
        {films.map((film) => (
          <ListItem key={film.url} disablePadding>
            <FormControlLabel
              control={<Checkbox onChange={() => handleFiltersChange(film)} />}
              label={film.title}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant='subtitle2' color='text.secondary'>
        Species Filters
      </Typography>
      <List>
        {species.map((s) => (
          <ListItem key={s.name} disablePadding>
            <FormControlLabel
              control={<Checkbox onChange={() => handleFiltersChange(s)} />}
              label={s.name}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
