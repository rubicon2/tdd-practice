class Animal {
  #stomach = [];

  constructor(name, type, preferredFoods) {
    this.name = name;
    this.type = type;
    this.preferredFoods = preferredFoods;
  }

  findFood(area) {
    return area.items.filter((item) => this.preferredFoods.includes(item));
  }

  eatFood(item) {
    this.#stomach.push(item);
  }

  plop() {
    return this.#stomach.shift() || null;
  }
}

module.exports = Animal;
