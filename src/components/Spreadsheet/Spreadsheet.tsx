// Spreadsheet.tsx
import React, { useEffect, useRef } from 'react';
import { Workbook } from '@fortune-sheet/react';
import '@fortune-sheet/react/dist/index.css';

interface SpreadsheetProps {
  data: any[];
  onChange?: (data: any[]) => void;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ data, onChange }) => {
  const workbookRef = useRef<any>(null);

  useEffect(() => {
    if (workbookRef.current) {
      console.log('Workbook instance ready');
    }
  }, []);

  return (
    <Workbook
      ref={workbookRef}
      data={data}
      onChange={onChange}
      showToolbar={true}
    />
  );
};

export default Spreadsheet;
