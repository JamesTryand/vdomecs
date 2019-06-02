const ecsManager = () => {
    return new ECSManager();
}
export class ECSManager {
    constructor() {
        this.cancellationFunction = ()=>{};
        this.cancellationToken = {};
        this.workflow = () => {};
    }
    workflow = () => {
        console.log("worker");
    }
    start({schedulerFunction,cancellationFunction}){
        
        this.cancellationFunction = cancellationFunction
        this.schedulerFunction = schedulerFunction
        
        this.cancellationToken = worker(schedulerFunction,workflow);
    }
    worker = (schedulerFunction) => {
        this.workflow();
        this.cancellationToken = schedulerFunction(worker);
    }
    stop(cancellationFunction = this.cancellationFunction){
        cancellationFunction(this.cancellationToken);
    }
}