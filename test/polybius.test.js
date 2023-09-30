const { expect } = require("chai");
const { polybius } = require("../src/polybius");

describe ("polybius tests written by Seth Greene", () => {

    /*

When decoding, it translates 42 to (i/j).

It maintains spaces in the message, before and after encoding or decoding.
    */

    describe ("encoding tests", () => {
        it ("should translate the letters i and j to 42 when encoding", () => {
            const expected = "4242";
            const actual = polybius("ij");
            expect(actual).to.equal(expected);
        })

        it ("should ignore capital letters", () => {
            const expected = polybius("iab")
            const actual = polybius("IAB")
            expect(actual).to.equal(expected);
        })

        it ("should maintain spaces when encoding", () => {
            const expected = "3251131343 2543241341"
            const actual = polybius("hello world");
            expect(actual).to.equal(expected);
        })
    })

    describe ("decoding tests", () => {
        it ("should translate 42 to (i/j)", () => {
            const expected = "(i/j)";
            const actual = polybius("42", false);
            expect(actual).to.equal(expected);
        })

        it ("should maintain spaces when decoding", () => {
            const expected = "hello world";
            const actual = polybius("3251131343 2543241341", false);
            expect(actual).to.equal(expected);
        })
    })
})