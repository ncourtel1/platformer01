import TimerSystem from "./timerSystem.js";

export default class ECS {
  constructor() {
    this.entities = [];
    this.systems = [];
    this.initialized = false;
    this.eventListeners = new Map(); // Stockage des événements
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.entities = this.entities.filter((e) => e.id !== entity.id);
    let entityElement = document.getElementById(entity.id);
    if (entityElement) entityElement.remove();
  }

  // Nouvelle méthode pour ajouter un listener d'événement
  addEventListener(element, eventType, callback) {
    if (!this.eventListeners.has(element)) {
      this.eventListeners.set(element, new Map());
    }
    
    const elementEvents = this.eventListeners.get(element);
    if (!elementEvents.has(eventType)) {
      elementEvents.set(eventType, new Set());
    }
    
    const callbacks = elementEvents.get(eventType);
    callbacks.add(callback);
    
    element.addEventListener(eventType, callback);
  }

  // Méthode améliorée pour supprimer les listeners
  removeEventListeners(eventTypes = ['click', 'keydown', 'keyup', 'keypress', 'blur', 'focus']) {
    console.log("removing listeners...");
    
    // Parcourir tous les éléments dans notre Map d'écouteurs
    for (const [element, elementEvents] of this.eventListeners) {
      for (const [eventType, callbacks] of elementEvents) {
        // Si eventTypes est spécifié, ne supprimer que ces types d'événements
        if (eventTypes.includes(eventType)) {
          for (const callback of callbacks) {
            element.removeEventListener(eventType, callback);
          }
          callbacks.clear();
        }
      }
      
      // Nettoyer la Map si tous les callbacks ont été supprimés
      if (elementEvents.size === 0) {
        this.eventListeners.delete(element);
      }
    }
  }

  clear() {
    this.entities.forEach((entity) => {
      this.removeEntity(entity);
    });
  
    const timerSystem = this.getSystem(TimerSystem);
    if (timerSystem && timerSystem.timer) {
      clearInterval(timerSystem.timer);
    }
  
    this.systems = [];
    this.removeEventListeners();
    document.getElementById("HUD").innerHTML = "";
    
    // Vider la Map des écouteurs
    this.eventListeners.clear();
  }
  
  addSystem(system) {
    this.systems.push(system);
  }

  getSystem(systemClass) {
    console.log('Recherche de', systemClass.name);
    const system = this.systems.find(system => system instanceof systemClass) || null;
    console.log('Résultat:', system);
    return system;
  }

  update(dt) {
    for (const system of this.systems) {
      system.update(this.entities, dt);
    }
  }
}