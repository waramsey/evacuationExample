import Vector3 from "../behavior/Vector3.js";

class EvacuationBehavior {

  constructor(agent, myIndex, start) {
    //this.index = myIndex;
    this.waypoints = [];
    this.waypoints.push(start);
    this.agent = agent;
    
    const builder = new fluentBehaviorTree.BehaviorTreeBuilder();

    let self = this;//Since we need to reference this in anonymous functions, we need a reference

    this.tree = builder
      .sequence("Go To")
      //Set the destination. This is a one-shot behavior since we only want to
      //update the return value once
      .do("Set destination goal", (t) => {
        let agent = t.agents.find(a=>a.id==self.index);
        self.agent.destination = new Vector3(self.waypoints[0].x,self.waypoints[0].y,self.waypoints[0].z)
        return fluentBehaviorTree.BehaviorTreeStatus.Success;
      })
      //Now return null as we head to that destination
      //We return running until we're close to it.
      .do("Traveling to goal", (t) => {
        //let agent = t.agents.find(a=>a.id==self.agent.index);
        if (self.agent.inSimulation) {
          self.agent.destination = new Vector3(self.waypoints[0].x,self.waypoints[0].y,self.waypoints[0].z);
          let simulationAgent = t.crowd.find(a=>a.id == self.agent.id);
          if (simulationAgent === undefined)
            return fluentBehaviorTree.BehaviorTreeStatus.Running;
            
          let loc = new Vector3(simulationAgent.x, simulationAgent.y, simulationAgent.z);  
          let difference = Vector3.subtract(loc, self.waypoints[0])
          let distanceToWaypoint = difference.length();
  
          if (distanceToWaypoint < 2) {
            self.agent.inSimulation = false;
            return fluentBehaviorTree.BehaviorTreeStatus.Success;
          }
          return fluentBehaviorTree.BehaviorTreeStatus.Running;
        }
        return fluentBehaviorTree.BehaviorTreeStatus.Running;
      })
      .end()
      .build();
  }

  async update(agents, crowd, msec) {
    await this.tree.tick({ agents, crowd, msec }) //Call the behavior tree
  }

}

export default EvacuationBehavior;
