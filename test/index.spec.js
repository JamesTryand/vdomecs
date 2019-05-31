import {expect} from "chai";
import sayHello from "../src/index";
import createEntity from "../src/createEntity";

describe("index test", () => {
    describe("sayHello function", () => {
        it("should say Hello Worlds!", () => {
            const str = sayHello();
            expect(str).to.equal("Hello Worlds!");
        })
    });
    describe("createEntity things", ()=>{
        it("should return an object",() => {
            const result = createEntity();
            expect(result).to.have.property("id").and.equal("hello");
        })
    });
})
