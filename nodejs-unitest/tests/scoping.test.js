beforeAll(() => {
    console.log("Before All Outer");
});
afterAll(() => {
    console.log("After All Outer");
});

beforeEach(() => {
    console.log("Before Each Outer");
});
afterEach(() => {
    console.log("After Each Outer");
});

describe("test scoping", () => {

    beforeEach(() => {
        console.log("Before Each Inner");
    });

    afterEach(() => {
        console.log("After Each Inner");
    });

    test("test 1", () => {
        console.log("Test 1");
    });

    test("test 2", () => {
        console.log("Test 2");
    });
});

/**
 * beforeAll dan afterAll hanya akan dijalankan sekali
 * beforeEach dan afterEach akan dijalankan setiap kali test dijalankan
 * 
 * Outputnya akan seperti ini:
 * Before All Outer
 * Before Each Outer
 * Before Each Inner
 * Test 1
 * After Each Inner
 * After Each Outer
 * Before Each Outer
 * Before Each Inner
 * Test 2
 * After Each Inner
 * After Each Outer
 * After All Outer
 */