import {
  Container,
  Grid,
  Stack,
  Typography,
  Box,
  Switch,
  CircularProgress,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { getAllFilms } from './api/films';
import { getAllPeople } from './api/people';
import { getAllSpecies } from './api/species';
import { AgeSlider } from './components/AgeSlider';
import { FiltersSection } from './components/FiltersSection';
import { PeopleList } from './components/PeopleList';
import { SelectedPersonModal } from './components/SelectedPersonModal';
import { convertAge, getIntersection } from './helpers';
import { Film, Person, Species, Starship, FilterOption } from './types';

function App() {
  const [loading, setLoading] = useState(true);
  const [isAndMode, setIsAndMode] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeopleUrls, setFilteredPeopleUrls] = useState<string[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [species, setSpecies] = useState<Species[]>([]);
  const [filters, setFilters] = useState<FilterOption[]>([]);
  const [ageInterval, setAgeInterval] = useState<number[]>([0, 0]);
  const [selectedPersonStarships, setSelectedPersonStarships] = useState<
    Starship[]
  >([]);

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isLoadingSelectedData, setIsLoadingSelectedData] = useState(false);
  const { minAge, maxAge } = useMemo(() => {
    if (people.length) {
      return {
        minAge: Math.min(
          ...people
            .filter((p) => p.birth_year !== 'unknown')
            .map((p) => convertAge(p.birth_year))
        ),
        maxAge: Math.max(
          ...people
            .filter((p) => p.birth_year !== 'unknown')
            .map((p) => convertAge(p.birth_year))
        ),
      };
    } else {
      return {
        minAge: 0,
        maxAge: 0,
      };
    }
  }, [people]);

  const selectedPersonSpecies = useMemo(() => {
    if (selectedPerson) {
      return (
        species
          .filter((s) => {
            return selectedPerson.species.includes(s.url);
          })
          .map((s) => s.name)
          .join(', ') || 'Unknown'
      );
    }
    return 'Unknown';
  }, [selectedPerson, species]);

  const selectedPersonMovies = useMemo(() => {
    if (selectedPerson) {
      return films
        .filter((s) => {
          return selectedPerson.films.includes(s.url);
        })
        .map((s) => s.title)
        .join(', ');
    }
    return 'None';
  }, [selectedPerson, films]);

  //Initial fetch
  useEffect(() => {
    const promises: [
      Promise<{ data: { results: Person[] } }>,
      Promise<AxiosResponse<{ results: Film[] }>>,
      Promise<AxiosResponse<{ results: Species[] }>>
    ] = [getAllPeople(), getAllFilms(), getAllSpecies()];
    Promise.all(promises)
      .then((res) => {
        setPeople(res[0].data.results);
        setFilms(res[1].data.results);
        setSpecies(res[2].data.results);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  //Selected Person starships fetch
  useEffect(() => {
    if (selectedPerson) {
      setIsLoadingSelectedData(true);
      const promises = selectedPerson.starships.map((url: string) =>
        axios(url)
      );
      Promise.all<AxiosResponse>(promises)
        .then((res) => setSelectedPersonStarships(res.map((r) => r.data.name)))
        .finally(() => setIsLoadingSelectedData(false));
    }
  }, [selectedPerson]);

  // Filter people
  useEffect(() => {
    if (filters.length) {
      if (!isAndMode) {
        const urls = filters.map((f) => f.people).flat();
        setFilteredPeopleUrls(Array.from(new Set(urls)));
      } else {
        const urls = filters.map((f) => f.people);
        setFilteredPeopleUrls(
          urls.reduce((acc, array, i) => {
            if (i === 0) {
              return array;
            }
            return getIntersection(acc, array);
          }, [])
        );
      }
    } else {
      setFilteredPeopleUrls([]);
    }
  }, [isAndMode, filters]);

  //Get Filtered people by url
  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      const fitAge =
        p.birth_year === 'unknown' ||
        (convertAge(p.birth_year) >= ageInterval[0] &&
          convertAge(p.birth_year) <= ageInterval[1]);

      if (!filteredPeopleUrls.length && !filters.length) {
        return fitAge;
      }

      return filteredPeopleUrls.includes(p.url) && fitAge;
    });
  }, [ageInterval, filteredPeopleUrls, filters.length, people]);

  // Change handlers
  const handleSwitchChange = () => {
    setIsAndMode(!isAndMode);
  };

  if (loading) {
    return (
      <Box mx='auto' width={50} py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Box mb={4} component='header'>
        <Typography variant='h3'>Star Wars People</Typography>
      </Box>
      <Grid container>
        <Grid xs={4} item component='aside'>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography>OR Mode</Typography>
            <Switch checked={isAndMode} onChange={handleSwitchChange} />
            <Typography>AND Mode</Typography>
          </Stack>
          <FiltersSection
            films={films}
            species={species}
            filters={filters}
            setFilters={setFilters}
          />
          <Box sx={{ width: 250 }}>
            <AgeSlider min={minAge} max={maxAge} onChange={setAgeInterval} />
          </Box>
        </Grid>
        <Grid xs={8} item>
          <PeopleList
            data={filteredPeople}
            handleItemClick={setSelectedPerson}
          />
        </Grid>
      </Grid>
      <SelectedPersonModal
        open={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        isLoadingData={isLoadingSelectedData}
        personData={{
          name: selectedPerson?.name || 'Unknown',
          species: selectedPersonSpecies,
          films: selectedPersonMovies,
          starships: selectedPersonStarships.join(', ') || 'None',
        }}
      />
    </Container>
  );
}

export default App;
