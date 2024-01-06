import renderer from 'react-test-renderer';

import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Кнопка', () => {
  it('содержит текст', () => {
    const buttonWithText = renderer.create(<Button text="Текст" />).toJSON();

    expect(buttonWithText).toMatchSnapshot();
  });

  it('не содержит текст', () => {
    const buttonNoText = renderer.create(<Button />).toJSON();

    expect(buttonNoText).toMatchSnapshot();
  });

  it('неактивна', () => {
    const buttonDisabled = renderer.create(<Button disabled />).toJSON();

    expect(buttonDisabled).toMatchSnapshot();
  });

  it('в состоянии загрузки', () => {
    const buttonDisabled = renderer.create(<Button isLoader />).toJSON();

    expect(buttonDisabled).toMatchSnapshot();
  });

  it('при нажатии вызывает переданную функцию', () => {
    const onClick = jest.fn();

    render(<Button text="Кнопка" onClick={onClick}></Button>);

    const button = screen.getByText('Кнопка');

    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
