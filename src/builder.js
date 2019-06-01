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

