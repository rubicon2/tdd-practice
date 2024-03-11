// eslint-disable-next-line import/extensions
const {
  checkIfAllNumbers,
  clamp,
  lerp,
  lerpClamp,
  inverseLerp,
  inverseLerpClamp,
} = require('../modules/mathUtil.js');

const badArguments = [
  ['blob', 1, 0.5],
  [0, 'blob', 0.5],
  [0, 1, 'blob'],
  [{}, 1, 0.5],
  [0, {}, 0.5],
  [0, 1, {}],
  [[], 1, 0.5],
  [0, [], 0.5],
  [0, 1, []],
];

describe('CheckIfAllNumbers', () => {
  test.each(badArguments)(
    'Given arguments of type %p, %p and %p, return false.',
    (a, b, c) => {
      expect(checkIfAllNumbers(a, b, c)).toBe(false);
    },
  );

  test('Provided all numbers as arguments, returns true.', () => {
    expect(checkIfAllNumbers(1, 2, 3)).toBe(true);
    expect(checkIfAllNumbers(-1, 2, 97, -989)).toBe(true);
  });
});

describe('Clamp', () => {
  describe('Throws an error if any of the arguments are not of type number', () => {
    test.each(badArguments)(
      'Given arguments of type %p, %p and %p, throws an error.',
      (min, max, value) => {
        expect(() => clamp(min, max, value)).toThrow();
      },
    );
  });

  test('Return value is clamped to min', () => {
    expect(clamp(0, 5, -1)).toBe(0);
    expect(clamp(-5, 12, -10)).toBe(-5);
  });

  test('Return value is clamped to max', () => {
    expect(clamp(0, 5, 8)).toBe(5);
    expect(clamp(-5, 12, 24)).toBe(12);
  });
});

describe('Lerp', () => {
  describe('Throws an error if any of the arguments are not of type number', () => {
    test.each(badArguments)(
      'Given arguments of type %p, %p and %p, throws an error.',
      (min, max, t) => {
        expect(() => lerp(min, max, t)).toThrow();
      },
    );
  });

  test('Lerp return should be of type number', () => {
    expect(typeof lerp(0, 1, 0.5)).toBe('number');
  });

  describe('Lerp should interpolate between min and max values correctly', () => {
    test('Positive min/max', () => {
      expect(lerp(5, 10, 0.5)).toBe(7.5);
    });

    test('Negative min/max', () => {
      expect(lerp(-10, -5, 0.5)).toBe(-7.5);
    });

    test('Negative min, positive max', () => {
      expect(lerp(-5, 5, 0.5)).toBe(0);
    });

    test('Interpolation value of 0 should return the min', () => {
      expect(lerp(-5, 5, 0)).toBe(-5);
    });

    test('Interpolation value of 1 should return the max', () => {
      expect(lerp(-5, 5, 1)).toBe(5);
    });

    test('Interpolation value of -1 should return -max', () => {
      expect(lerp(0, 5, -1)).toBe(-5);
    });

    test('Interpolation value of 2 should return max * 2', () => {
      expect(lerp(0, 5, 2)).toBe(10);
    });

    test('Interpolation where min is larger than max', () => {
      expect(lerp(5, 0, 0.5)).toBe(2.5);
    });
  });
});

describe('LerpClamp', () => {
  test('LerpClamp return should be of type number', () => {
    expect(typeof lerpClamp(0, 1, 0.5)).toBe('number');
  });

  test('Throw error if min is larger than max', () => {
    expect(() => lerpClamp(5, 0, 0.5)).toThrow();
  });

  describe('Interpolation works normally', () => {
    test.each([
      [5, 10, 0.5, 7.5],
      [-10, -5, 0.5, -7.5],
      [-5, 5, 0.5, 0],
      [-5, 5, 0, -5],
      [-5, 5, 1, 5],
    ])(
      'Given a min of %p, max of %p, and t of %p, returns %p',
      (min, max, t, expectedResult) => {
        expect(lerpClamp(min, max, t)).toBe(expectedResult);
      },
    );
  });

  test('Return value is clamped to min', () => {
    expect(lerpClamp(0, 5, -1)).toBe(0);
    expect(lerpClamp(-5, 12, -2)).toBe(-5);
  });

  test('Return value is clamped to max', () => {
    expect(lerpClamp(0, 5, 2)).toBe(5);
    expect(lerpClamp(-5, 12, 10)).toBe(12);
  });
});

describe('InverseLerp', () => {
  test('InverseLerp return should be of type number', () => {
    expect(typeof inverseLerp(0, 1, 0.5)).toBe('number');
  });

  describe('Throws an error if any of the arguments are not of type number', () => {
    test.each(badArguments)(
      'Given arguments of type %p, %p and %p, throws an error.',
      (min, max, value) => {
        expect(() => inverseLerp(min, max, value)).toThrow();
      },
    );
  });

  describe('Inverse lerps between values correctly', () => {
    test('Positive min/max', () => {
      expect(inverseLerp(5, 10, 7.5)).toBe(0.5);
    });

    test('Negative min/max', () => {
      expect(inverseLerp(-10, -5, -7.5)).toBe(0.5);
    });

    test('Negative min, positive max', () => {
      expect(inverseLerp(-5, 5, 0)).toBe(0.5);
    });

    test('Min: -5, max: 5, inverse lerp: -5 should return 0', () => {
      expect(inverseLerp(-5, 5, -5)).toBe(0);
    });

    test('Min: -5, max: 5, inverse lerp: 5 should return 1', () => {
      expect(inverseLerp(-5, 5, 5)).toBe(1);
    });

    test('Min: 0, max: 5, inverse lerp: -5 should return -1', () => {
      expect(inverseLerp(0, 5, -5)).toBe(-1);
    });

    test('Min: 0, max: 5, inverse lerp: 10 should return 2', () => {
      expect(inverseLerp(0, 5, 10)).toBe(2);
    });

    test('Inverse lerp where min is larger than max', () => {
      expect(inverseLerp(5, 0, 2.5)).toBe(0.5);
    });
  });
});

describe('InverseLerpClamp', () => {
  test('InverseLerpClamp return should be of type number', () => {
    expect(typeof inverseLerpClamp(0, 1, 0.5)).toBe('number');
  });

  test('Throw error if min is larger than max', () => {
    expect(() => inverseLerpClamp(5, 0, 0.5)).toThrow();
  });

  describe('Inverse lerping works normally', () => {
    test.each([
      [5, 10, 7.5, 0.5],
      [-5, 5, 0, 0.5],
      [-5, 5, -5, 0],
      [-5, 5, 5, 1],
    ])(
      'Given a min of %p, max of %p, and t of %p, returns %p',
      (min, max, value, expectedResult) => {
        expect(inverseLerpClamp(min, max, value)).toBe(expectedResult);
      },
    );
  });

  test('Min: 0, max: 5, inverse lerp: -5 should return 0', () => {
    expect(inverseLerpClamp(0, 5, -5)).toBe(0);
  });

  test('Min: 0, max: 5, inverse lerp: 10 should return 1', () => {
    expect(inverseLerpClamp(0, 5, 10)).toBe(1);
  });

  test('Return value is clamped to min', () => {
    expect(inverseLerpClamp(0, 5, -10)).toBe(0);
    expect(inverseLerpClamp(-5, 12, -6)).toBe(0);
  });

  test('Return value is clamped to max', () => {
    expect(inverseLerpClamp(0, 5, 10)).toBe(1);
    expect(inverseLerpClamp(-5, 12, 13)).toBe(1);
  });
});
