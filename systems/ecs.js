// ECS class that contains all entities and system of the game
export default class ECS {
  constructor() {
    this.entities = [];
    this.systems = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.entities = this.entities.filter((e) => e.id !== entity.id);
    let entityElement = document.getElementById(entity.id);
    if (entityElement) entityElement.remove();
  }

  clear() {
    this.entities.forEach((entity) => {
      this.removeEntity(entity);
    });
    this.systems = [];

    document.getElementById("HUD").innerHTML = "";
  }

  addSystem(system) {
    this.systems.push(system);
  }

  // apply the update method of every systems on every entities
  update(dt) {
    for (const system of this.systems) {
      system.update(this.entities, dt);
    }
  }
}
