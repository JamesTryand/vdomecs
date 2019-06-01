import {expect, should} from "chai";
import {createEntity, createComponent, createSystem} from "../src/builder";

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
// describe("manager",() => {
//     describe("creating a new manager", ()=>{
//         it("should give you a manager",() => {
//             const result = new ECSManager();
//             expect(result).to.be.an.instanceof(ECSManager);
//         });
//     });
//     describe("a manager needs a scheduler to start",() => {
//         it("should require a scheduler",() => {
//             const result = new ECSManager();
//             const scheduler = () => {};
//             expect(() => result.start(scheduler)).to.be.an.instanceof(ECSCancellationToken);
//         });
//     });
// });
