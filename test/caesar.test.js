const { expect } = require("chai");
const { caesar } = require("../src/caesar");

describe ("Caesar tests written by Seth Greene", () => {
    describe ("improper input", () => {
        it ("should return false if shift is 0", () => {
            const message = "foo"
            const shift = 0;
            const expected = false;
            const actual = caesar(message, shift);
            expect(actual).to.be.false;
        })

        it ("should return false if the shift is <= -26", () => {
            const message = "foo"
            const shift = -26;
            const expected = false;
            const actual = caesar(message, shift);
            expect(actual).to.be.false;
        })

        it ("should return false if the shift is >= 26", () => {
            const message = "foo"
            const shift = 26;
            const expected = false;
            const actual = caesar(message, shift);
            expect(actual).to.be.false;
        })

        it ("should return false if there is no message", () => {
            const message = ""
            const shift = 5;
            const expected = false;
            const actual = caesar(message, shift);
            expect(actual).to.be.false;
        })

        it ("should return false if there is no shift", () => {
            const message = "foo"
            const expected = false;
            const actual = caesar(message);
            expect(actual).to.be.false;
        })
    })

    describe ("encoding tests", () => {
        it ("should ignore capital letters", () => {
            const capitalTest = caesar("MeSsAgE", 5)
            const lowerTest = caesar("message", 5)
            expect(capitalTest).to.equal(lowerTest);
        })

        it ("handles shifts that go past the end of the alphabet", () => {
            const expected = "abc";
            const actual = caesar("xyz", 3)
            expect(actual).to.equal(expected);
        })

        it ("ignores spaces and nonalphabetic characters when encoding", () => {
            const expected = "jgnnq yqtnf!";
            const actual = caesar("hello world!", 2);
            expect(actual).to.equal(expected);
        })
    })
});