const Animal = require('../modules/animal.js');

let cat = null;

beforeEach(() => {
  cat = new Animal('Jimbo', 'Cat', [
    'meat',
    'cheese',
    'grass',
    'baked beans',
    'doughnuts',
  ]);
});

describe('Animal', () => {
  test('Public fields include a name, type, and a list of preferred foods', () => {
    expect(cat.name).toBe('Jimbo');
    expect(cat.type).toBe('Cat');
    expect(cat.preferredFoods).toStrictEqual([
      'meat',
      'cheese',
      'grass',
      'baked beans',
      'doughnuts',
    ]);
  });

  describe('FindFood method', () => {
    const area = {
      terrainType: 'grass',
      safe: true,
    };

    test('FindFood method throws an error if area does not have an area property', () => {
      expect(() => cat.findFood(area)).toThrow();
    });

    test("FindFood method looks for food in the provided area and returns an array containing animal's preferred foods if found", () => {
      area.items = ['grass', 'baked beans', 'trees'];
      expect(cat.findFood(area)).toStrictEqual(['grass', 'baked beans']);

      area.items = ['grass', 'trees'];
      expect(cat.findFood(area)).toStrictEqual(['grass']);
    });

    test('FindFood method looks for food in the provided area and returns null if nothing found', () => {
      area.items = ['trees', 'rocks'];
      expect(cat.findFood(area)).toStrictEqual([]);
    });

    test('FindFood method works with an empty items array', () => {
      area.items = [];
      expect(cat.findFood(area)).toStrictEqual([]);
    });
  });

  test('EatFood and Plop methods', () => {
    cat.eatFood('grass');
    cat.eatFood('tree');
    expect(cat.plop()).toBe('grass');
    expect(cat.plop()).toBe('tree');
    expect(cat.plop()).toBe(null);
  });
});
