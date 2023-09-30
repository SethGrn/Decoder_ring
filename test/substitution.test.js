const { expect } = require("chai");
const { substitution } = require("../src/substitution");

describe ("substitution tests written by Seth Greene", () => {
    describe ("improper input", () => {
        it ("should return false if the given alphabet is not 26 characters long", () => {
            const expected = false;
            const actual = substitution("asdnmgi");
            expect(actual).to.equal(expected);
        })

        it ("should return false if the given alphabet has duplicate characters", () => {
            const expected = false;
            const actual = substitution("Hello world!", "ayxwvuaarqponmlajihjfedcba");
            expect(actual).to.equal(expected);
        })
    })

    describe ("encoding tests", () => {
        it ("should correctly translate the provided phrase", () => {
            const expected = "zyxwvutsrqponmlkjihgfedcba";
            const actual = substitution("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba");
            expect(actual).to.equal(expected);
        })

        it ("should ignore capital letters when encoding", () => {
            const expected = "zyxw";
            const actual = substitution("ABCD", "zyxwvutsrqponmlkjihgfedcba");
            expect(actual).to.equal(expected);
        })

        it ("should maintain space in the message when encoding", () => {
            const expected = "zy x w";
            const actual = substitution("ab c d", "zyxwvutsrqponmlkjihgfedcba");
            expect(actual).to.equal(expected);
        })
    })

    describe ("decoding tests", () => {
        it ("should ignore capital letters when decoding", () => {
            const expected = "abcd";
            const actual = substitution("ZYXW", "zyxwvutsrqponmlkjihgfedcba", false)
            expect(actual).to.equal(expected);
        })

        it ("should maintain spaces in the message when decoding", () => {
            const expected = "ab c d"
            const actual = substitution("zy x w", "zyxwvutsrqponmlkjihgfedcba", false)
        })
    })
})