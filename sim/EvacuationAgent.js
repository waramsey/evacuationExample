
import EvacuationBehavior from "../data/EvacuationBehavior.js"
import Vector3 from "../behavior/Vector3.js";


class EvacuationAgent {
  startX;
  startY;
  startZ;
  destX;
  destY;
  destZ;
  startMSec;
  inSimulation = false;
  hasEntered = false;
  behavior;

  static index = 0;
  idx; //Corresponds to the internal idx number used by recast

  constructor(agent, locations) {
    this.name = agent.name;
    this.locations = locations;
    agent.locations = locations;
    this.startMSec = agent.arrivalTick * 25; // We simulate 25 fps
    this.arrivalLocation = agent.arrivalLocation;
    this.id = agent.id;

    let startLocation = locations.find(i => i.name == agent.arrivalLocation);
    if (!startLocation) console.error("Bad starting location " + agent.arrivalLocation);


    this.startX = startLocation.position.x
    this.startY = startLocation.position.y;
    this.startZ = startLocation.position.z;

    this.destX = 0;
    this.destY = 0;
    this.destZ = 0;

    this.behavior = new EvacuationBehavior(this, agent.id, new Vector3(0, 0.25, -20));


  }


  getStart() { return [this.startX, this.startY, this.startZ]; }

  getEnd() { return [this.destX, this.destY, this.destZ]; }

  setId(i) { this.id = i; }

  getId() { return this.id; }

  getStartMSec() { return this.startMSec; }
  /**
   * If current agent is active, update its newDestination to App() class's update method
   */
  isActive() { return active; }
  setActive(active) { this.active = active; }
}

export default EvacuationAgent;