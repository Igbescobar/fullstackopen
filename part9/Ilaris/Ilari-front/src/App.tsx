import { useEffect, useState } from 'react';
import { Diary, Visibility, Weather } from './type';
import { getAllDiaries } from './services/diaryService';
import DiaryEntries from './components/diaryEntries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Cloudy);
  const [visibility, setVisibility] = useState(Visibility.Poor);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries()
      .then(data => {
        setDiaries(data);
      });
  }, []);

  return (
    <div>
      <DiaryForm
        diaries={diaries}
        setDiaries={setDiaries}
        date={date}
        setDate={setDate}
        weather={weather}
        setWeather={setWeather}
        visibility={visibility}
        setVisibility={setVisibility}
        comment={comment}
        setComment={setComment}
        setNewDiary={setNewDiary}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <DiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
