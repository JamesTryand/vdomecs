import {expect, should} from "chai";
import {createEntity, createComponent, createSystem} from "../src/builder";
import {ECSManager} from "../src/ecsManager";
import { domainToUnicode } from "url";

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
    // describe("starting a flow",() => {
    //     it("should be able to run for at least a couple of iterations - with a setTimeout scheduler",() => {
    //         const manager = new ECSManager();
    //         let iterator = 0;
    //         manager.workflow = () => {
    //             console.log(`iteration ${iterator}`)
    //             iterator++;
    //             if(iterator > 2) {
    //                 manager.stop();
    //                 expect(iterator).to.equal(3)
    //             }
    //         }
    //         let lastTime = 0;
    //         let schedulerFunction = (callback, context) => {
    //             // var currTime = new Date().getTime();
    //             // var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    //             // var id = setTimeout(callback, timeToCall);
    //             // lastTime = currTime + timeToCall;
    //             // return id;
    //             let id = setTimeout(callback(schedulerFunction),60);
    //             return id;
    //         };
    //         let cancellationFunction = (id) => {
    //             clearTimeout(id);
    //         };
    //         manager.cancellationFunction = cancellationFunction;
    //         manager.schedulerFunction = schedulerFunction;
    //         manager.start({schedulerFunction,cancellationFunction});
            
    //     });
        describe("starting a flow",() => {
            it("should be able to run for at least a couple of iterations - with a setTimeout scheduler",() => {
                const manager = new ECSManager();
                let iterator = 0;
                manager.workflow = () => {
                    console.log(`iteration ${iterator}`)
                    iterator++;
                    if(iterator > 2) {
                        manager.stop();
                        expect(iterator).to.equal(3)
                    }
                }
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
                manager.cancellationFunction = cancellationFunction;
                manager.schedulerFunction = schedulerFunction;
                manager.start({schedulerFunction,cancellationFunction});
                
            });
    });
});
