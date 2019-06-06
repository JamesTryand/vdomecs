import {expect, should} from "chai";
import {
    createEntity, 
    createComponent, 
    createSystem,
    createSimpleScheduler,
    createTimeoutScheduler,
    createPromisingScheduler
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
            const result = new ECSManager(createSimpleScheduler());
            expect(result).to.be.an.instanceof(ECSManager);
        });
    });
    describe("a manager needs a scheduler to start",() => {
        it("should require a scheduler",() => {
            const result = new ECSManager(createSimpleScheduler());
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
            const manager = new ECSManager({
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
            const manager = new ECSManager(scheduler);
            
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
            const manager = new ECSManager(scheduler);
            
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
        it("should be able to run for at least a couple of iterations - with a setTimeout scheduler set to 1/2 second",() => {
            // scheduler config
            let scheduler = createTimeoutScheduler(500);
           
            //setup
            const manager = new ECSManager(scheduler);
            
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
        it("should be able to run for at least a couple of iterations - with a promising scheduler",() => {
            // scheduler config
            let scheduler = createPromisingScheduler();
           
            //setup
            const manager = new ECSManager(scheduler);
            
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
    describe("defining a component", ()=>{
        it("should mean that an entity can be defined with that component",() => {
            // const manager = new ECSManager(createSimpleScheduler());

            // // component: name, structure
            // manager.defineComponent('first',{ first: 0});

            // // events: name, state, id?
            // manager.defineEvent('event1',{value:0});
            // manager.defineEvent('event1',{value:0},"first");
            
            // // system: name, component, events to listen for
            // manager.defineSystem('systemFirst','first',['event1','event2']);
            // // system = (componentState,event) => componentState

            // // a template for creating an entity
            // manager.defineAssemblage('thing1',['first','second','third'])

            // manager.addComponentToEntity("entityid",['component'])
            // manager.removeComponentFromEntity("entityid",['component'])

            // // manager should have two tables
            // // manager.componentsOfEntity('entityid') => ['first','second','third']
            // // manager.entitiesOfComponent('first') => ['entity1','entity2','entity3']
            // // manager.getComponentForEntity('entityid','first')
            // // manager.getComponent('first') => {'entity1'...}

            // // manager.removeEntity = (entity) => { foreach(let component of manager.componentsOfEntity(entity)) { component.remove(entity) } }
            
            // const result = manager.newEntity('first');
            
            
            

        });
    });

    describe("adding a component to an entity",() => {
        describe("given an entity and a component", ()=>{
            it("should possible to add a component to the entity",() => {
                const manager = new ECSManager(createSimpleScheduler());



                // define component called first with init of () => state
                //- what's the lifecycle of an entity?
                    // add entity to manager
                    // make a new entity (explicitly state new key (use a generator?))
                // from the entity add predefined components

                // so component definition is {name:string, init:()=>state}
                // system definition is {(event,state)=>state}}

                // event options = 
                // {kind:string,subject:string,payload:object}

                // how to handle the events?

                // okay so the manager manages the scheduling
                // entities are created.

                // events: name*sender*state
                // or should there be a channel instead?

                // components: init
                
                // system<kind>: event*state => state
                // manager.defineComponent('first',{ first:0 });
                // manager.defineComponent('second',{second_a:0, second_b:"x" });
                // manager.defineComponent('third',{third: { name: "bob", age: 0}});



manager.addEntity(createEntity(),['first','second','third'])

                
                // manager.
                //     defineComponent('first',(thatwill) => {return { name: "", age: 0}}).
                //     and.
                //     defineSystemFor(['first'])
                //     afterwards.
                //     thenMake(a => 
                //     a.newEntity("1").
                //     with(['first']))


                // const entity = createEntity("1");
                // const componentTemplate = createComponent('first',{ name : "", age : 0 });
                // manager.componentDefinitions['first'] = componentTemplate;
                // const result = manager.addComponent(entity, 'first')
                // expect(getComponentFor(entity,'first')).should.be.instanceOf(() => { name = "", age = 0 });
            });
        });
    });
});
