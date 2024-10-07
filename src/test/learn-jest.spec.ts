import { sumArr } from "./test.jest"

test("Bu funksiya 2, 5, 7 ni qoshib qaytarishi kerak:  14", () => {
    expect(sumArr(2, 5, 7)).toEqual(14)
})