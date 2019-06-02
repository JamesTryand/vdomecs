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

export const  createPromisingScheduler = () => {
    /// with the promises, we wrap this up such that
    /// we're able to work with Promises.

    /// The promises as a whole has to differentiate the beginning
    /// and the rest of the flow.
    /// As such rather than just a completion, we also need to know when it starts.

    /// the benefit of this is that the promises do not bleed into the rest of the system.
    let started = false;
    let cancelled = false;
    let schedulerFunction = (k) => {
        if(!started) {
            started  = true;
            return begin();
        }
        return cancelled ? 
            Promise.resolve() :
            continuation(k);
    };
    let cancellationFunction = (id) => {
        cancelled = true;
    };
    let begin = () => {
        Promise.resolve();
    }
    let continuation = (k) => {
        Promise.resolve().then(() => k(continuation));
    }

    return {schedulerFunction,cancellationFunction};
}

