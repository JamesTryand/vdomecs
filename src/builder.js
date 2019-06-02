export const createComponent = () => {
    return { name: "", state: {} };
};

export const createEntity = () => {
    console.log("creating entity");
    return { id: "hello" };
};

export const createSystem = (component) => {
    if (!component) {
        throw "component not provided";
    }
}; 

export const createSimpleScheduler = () => {            
    let cancelled = false;
    let schedulerFunction = (k) => {
        if(cancelled) {
            return false;
        }
        k(schedulerFunction);
    };
    let cancellationFunction = (id) => {
        cancelled = true;
    };
    return {schedulerFunction,cancellationFunction};
}

