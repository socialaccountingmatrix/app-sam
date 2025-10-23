import './App.css';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';
import Header from './components/Header/Header';
import InformationBand from './components/InformationBand/InformationBand';

function App() {
  // Convert simple 2D array to Fortune Sheet format
  const initialData: any[] = [
    {
      name: 'Sheet1',
      data: [
        [{ value: 'Name' }, { value: 'Age' }, { value: 'City' }],
        [{ value: 'Milan' }, { value: 28 }, { value: 'Kathmandu' }],
        [{ value: 'Anita' }, { value: 25 }, { value: 'Pokhara' }],
      ],
    },
  ];

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'SAM', path: '/' },
    { label: 'Generate', path: '/' },
  ];

  return (
    <div className="app-container w-full h-full min-w-[1024px] min-h-[768px] overflow-auto bg-gray-50">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Spreadsheet data={initialData} />
      </div>
    </div>
  );
}

export default App;
