import { useState } from 'react';

import { SelectBox } from './ui-kit';

const App = () => {
  const [value, setValue] = useState<string[]>([]);

  const changeSelectboxHandler = (values: string[]) => {
    setValue(values);
  };

  return (
    <SelectBox
      onChange={changeSelectboxHandler}
      options={[
        { label: 'Education', value: 'Education' },
        { label: 'Yeeeeah, science', value: 'Yeeeeah, science' },
      ]}
      value={value}
      placeholder="Search or add new item..."
    />
  );
};

export default App;
