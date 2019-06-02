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

export const createTimeoutScheduler = (pause = 60) => {
    let cancelled = false;
    let schedulerFunction = (k) => {
        if(cancelled) {
            return false;
        }
        let recurse = () => k(schedulerFunction);
        
        return setTimeout(recurse,pause);
    };
    let cancellationFunction = (id) => {
        clearTimeout(id);
        cancelled = true;
    };
    return {schedulerFunction,cancellationFunction};
}

