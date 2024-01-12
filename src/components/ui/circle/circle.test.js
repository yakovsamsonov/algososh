import renderer from 'react-test-renderer';

import { Circle } from './circle';
import { ElementStates } from '../../../types';

describe('Круг', () => {
  it('без буквы', () => {
    const circleNoText = renderer.create(<Circle />).toJSON();

    expect(circleNoText).toMatchSnapshot();
  });

  it('с буквой', () => {
    const circleWithText = renderer.create(<Circle letter="345" />).toJSON();

    expect(circleWithText).toMatchSnapshot();
  });

  it('с текстом сверху', () => {
    const circleWithSimpleHead = renderer
      .create(<Circle head={'head'} />)
      .toJSON();

    expect(circleWithSimpleHead).toMatchSnapshot();
  });

  it('с элементом сверху', () => {
    const circleWithElementHead = renderer
      .create(<Circle head={<Circle isSmall letter={'1'}></Circle>} />)
      .toJSON();

    expect(circleWithElementHead).toMatchSnapshot();
  });

  it('с текстом снизу', () => {
    const circleWithSimpleTail = renderer
      .create(<Circle tail={'tail'} />)
      .toJSON();

    expect(circleWithSimpleTail).toMatchSnapshot();
  });

  it('с элементом снизу', () => {
    const circleWithElementTail = renderer
      .create(<Circle tail={<Circle isSmall letter={'2'}></Circle>} />)
      .toJSON();

    expect(circleWithElementTail).toMatchSnapshot();
  });

  it('в индексом', () => {
    const circleWithIndex = renderer.create(<Circle index={0} />).toJSON();

    expect(circleWithIndex).toMatchSnapshot();
  });

  it('маленький', () => {
    const circleSmall = renderer.create(<Circle isSmall />).toJSON();

    expect(circleSmall).toMatchSnapshot();
  });

  it('в базовом состоянии', () => {
    const circleSmall = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();

    expect(circleSmall).toMatchSnapshot();
  });

  it('в состоянии изменения', () => {
    const circleSmall = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();

    expect(circleSmall).toMatchSnapshot();
  });

  it('в состоянии после изменения', () => {
    const circleSmall = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();

    expect(circleSmall).toMatchSnapshot();
  });
});

//в состоянии default;
//в состоянии changing;
//в состоянии modified.
