const ecsManager = () => {
    return new ECSManager();
}

export class ECSManager {
    constructor() {
        this.cancellationFunction = ()=>{};
        this.cancellationToken = {};
        this.workflow = () => {
            console.log("worker");
        };
        this.worker = (schedulerFunction) => {
            this.workflow();
            this.cancellationToken = schedulerFunction(this.worker);
        };
    }
    withScheduler({schedulerFunction,cancellationFunction}) {
        this.schedulerFunction = schedulerFunction;
        this.cancellationFunction = cancellationFunction;
        return this;
    }
    start(){
        if(!this.cancellationFunction && !this.schedulerFunction) {
            return;
        }
        this.cancellationToken = this.worker(this.schedulerFunction,this.workflow);
    }
    stop(cancellationFunction = this.cancellationFunction){
        cancellationFunction(this.cancellationToken);
    }
}