import {expect, should} from "chai";
import createEntity from "../src/createEntity";
import createComponent from "../src/createComponent";

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
    const createSystem = (component) => {
        if(!component || component === undefined) {
            throw 'components missing'; 
        }
        
        console.log("system created");
    }
    describe("creating a new system", ()=>{
        it("should require a component ",() => {
            expect(() => {createSystem()}).to.throw();

        });
    });
});