import {expect, should} from "chai";
import {
    createEntity, 
    createComponent, 
    createSystem,
    createSimpleScheduler,
    createTimeoutScheduler
} from "../src/builder";
import {ECSManager} from "../src/ecsManager";

describe("Entities", () => {
    describe("creating an entity", ()=>{
        it("should return an object",() => {
            const result = createEntity();
            expect(result).to.have.property("id").and.equal("hello");
        });
    });
});
describe("a component",() => {
    describe("the components structure", ()=>{
        it("should have a name which is a string",() => {
            const result = createComponent();
            expect(result).to.have.property("name").and.be.a("string");
        });
        it("should have a state which is an object",() => {
            const result = createComponent();
            expect(result).to.have.property("state").and.be.a("object");
        });
    });
});
describe("Systems",() => {
    describe("creating a new system", ()=>{
        it("should require a component ",() => {
            expect(() => {createSystem()}).to.throw();

        });
    });
});
describe("manager",() => {
    describe("creating a new manager", ()=>{
        it("should give you a manager",() => {
            const result = new ECSManager();
            expect(result).to.be.an.instanceof(ECSManager);
        });
    });
    describe("a manager needs a scheduler to start",() => {
        it("should require a scheduler",() => {
            const result = new ECSManager();
            const scheduler = () => {};
            expect(() => result.start(scheduler)).to.be.an.instanceof(Object);
        });
    });
    
    describe("starting a flow",() => {
        it("should be able to run for at least a couple of iterations - with a simple scheduler",() => {
            // scheduler config
            
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
            
            //setup
            const manager = new ECSManager()
            .withScheduler({
                schedulerFunction,
                cancellationFunction
            });
            
            // task definition
            let iterator = 0;
            manager.workflow = () => {
                console.log(`iteration ${iterator}`)
                iterator++;
                if(iterator > 2) {
                    manager.stop();
                    expect(iterator).to.equal(3)
                }
            }

            // start things off
            manager.start();
        });
    });

    describe("starting a flow",() => {
        it("should be able to run for at least a couple of iterations - with a setTimeout scheduler",() => {
            // scheduler config
            let scheduler = createSimpleScheduler();
           
            //setup
            const manager = new ECSManager()
            .withScheduler(scheduler);
            
            // task definition
            let iterator = 0;
            manager.workflow = () => {
                console.log(`iteration ${iterator}`)
                iterator++;
                if(iterator > 2) {
                    manager.stop();
                    expect(iterator).to.equal(3)
                }
            }

            // start things off
            manager.start();
        });
    });
    describe("starting a flow",() => {
        
        it("should be able to run for at least a couple of iterations - with a setTimeout scheduler",() => {
            // scheduler config
            let scheduler = createTimeoutScheduler();
           
            //setup
            const manager = new ECSManager()
            .withScheduler(scheduler);
            
            // task definition
            let iterator = 0;
            manager.workflow = () => {
                console.log(`iteration ${iterator}`)
                iterator++;
                if(iterator > 2) {
                    manager.stop();
                    expect(iterator).to.equal(3)
                }
            }

            // start things off
            manager.start();
        });
        it("should be able to run for at least a couple of iterations - with a setTimeout scheduler set to 1 second",() => {
            // scheduler config
            let scheduler = createTimeoutScheduler(1000);
           
            //setup
            const manager = new ECSManager()
            .withScheduler(scheduler);
            
            // task definition
            let iterator = 0;
            manager.workflow = () => {
                console.log(`iteration ${iterator}`)
                iterator++;
                if(iterator > 2) {
                    manager.stop();
                    expect(iterator).to.equal(3)
                }
            }

            // start things off
            manager.start();
        });
    });


});
