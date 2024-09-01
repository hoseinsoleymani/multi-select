import { useState } from 'react';

import { SelectBox } from './ui-kit/selectBox/selectBox';

const App = () => {
  const [value, setValue] = useState<string[]>([]);

  const changeSelectboxHandler = (values: string[]) => {
    setValue(values);
  };

  return (
    <SelectBox
      onChange={changeSelectboxHandler}
      options={[{ label: 'Hello', value: 'Its value' }]}
      value={value}
      placeholder="Click to see items.."
    />
  );
};

export default App;
