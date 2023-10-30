import { Diary } from '../type';

const DiaryEntries = ({ diaries }: { diaries: Diary[] }) => {
    return (
        <div>
            <h1>Diary entries</h1>
            {diaries.map((diary) => (
                <div key={diary.id}>
                    <h3>{diary.date}</h3>
                    <p>visibility: {diary.visibility}</p>
                    <p>weather: {diary.weather}</p>
                </div>
            ))}
        </div>
    );
};

export default DiaryEntries;