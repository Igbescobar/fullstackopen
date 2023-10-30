import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Diary, Visibility, Weather } from '../type';
import { createDiary } from '../services/diaryService';
import axios from 'axios';

interface DiaryFormProps {
    diaries: Diary[]
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
    date: string
    setDate: (date: string) => void
    weather: Weather
    setWeather: React.Dispatch<React.SetStateAction<Weather>>
    visibility: Visibility
    setVisibility: React.Dispatch<React.SetStateAction<Visibility>>
    comment: string
    setComment: React.Dispatch<React.SetStateAction<string>>
    setNewDiary: React.Dispatch<React.SetStateAction<string>>
    errorMessage: string
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
}

const DiaryForm: React.FC<DiaryFormProps> = ({ diaries, setDiaries, date, setDate, weather, setWeather, visibility, setVisibility, comment, setComment, setNewDiary, errorMessage, setErrorMessage }) => {

    interface weatherOptions {
        label: string
        value: Weather
    }

    const weatherOptions: weatherOptions[] = Object.values(Weather).map(w => ({
        label: w.toString(), value: w
    }));

    const onWeatherChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string') {
            const value = event.target.value;
            const weather = Object.values(Weather).find(w => w.toString() === value);
            if (weather) {
                setWeather(weather);
            }
        }
    };

    interface visibilityOptions {
        label: string;
        value: Visibility;
    }

    const visibilityOptions: visibilityOptions[] = Object.values(Visibility).map(w => ({
        label: w.toString(),
        value: w
    }));

    const onVisibilityChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if (typeof event.target.value === 'string') {
            const value = event.target.value;
            const visibility = Object.values(Visibility).find(w => w.toString() === value);
            if (visibility) {
                setVisibility(visibility);
            }
        }
    };

    const createDiaryEntry = async (e: React.SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        try {
            const data = await createDiary({ date, weather, visibility, comment });
            setDiaries(diaries.concat(data));

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data);
            }
        }
        setNewDiary('');
    };

    return (
        <div>
            <h1>Add new entry</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={createDiaryEntry}>
                <TextField
                    id='outlined-basic'
                    label='Date'
                    variant='outlined'
                    placeholder='YYYY-MM-DD'
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />

                <InputLabel id='select-weather'>Weather</InputLabel>
                <Select
                    value={weather}
                    label='Weather'
                    onChange={onWeatherChange}
                >
                    {weatherOptions.map(option =>
                        <MenuItem
                            key={option.label}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    )}
                </Select>
                <div>
                    <InputLabel id='select-visibility'>Visibilty</InputLabel>
                    <Select
                        value={visibility}
                        label='Visibility'
                        onChange={onVisibilityChange}
                    >
                        {visibilityOptions.map(option =>
                            <MenuItem
                                key={option.label}
                                value={option.value}
                            >
                                {option.label}
                            </MenuItem>
                        )}
                    </Select>
                </div>
                <div>
                    <TextField
                        id='outlined-basic'
                        label='Comment'
                        variant='outlined'
                        placeholder='comment'
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                </div>
                <div>
                    <Grid>
                        <Grid item>
                            <Button
                                style={{ marginTop: 25 }}
                                color='primary'
                                type='submit'
                                fullWidth
                                variant='contained'
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </div>
    );
};

export default DiaryForm;