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

    describe("test scoping nested", () => {
        beforeEach(() => {
            console.log("Before Each Nested");
        });

        afterEach(() => {
            console.log("After Each Nested");
        });

        test("test 3", () => {
            console.log("Test 3");
        });

        test("test 4", () => {
            console.log("Test 4");
        });
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
 * Before Each Nested
 * Test 1
 * After Each Nested
 * After Each Inner
 * After Each Outer
 * 
 * Before Each Outer
 * Before Each Inner
 * Before Each Nested
 * Test 2
 * After Each Nested
 * After Each Inner
 * After Each Outer
 * 
 * Before Each Outer
 * Before Each Inner
 * Before Each Nested
 * Test 3
 * After Each Nested
 * After Each Inner
 * After Each Outer
 * 
 * Before Each Outer
 * Before Each Inner
 * Before Each Nested
 * Test 4
 * After Each Nested
 * After Each Inner
 * After Each Outer
 * 
 * After All Outer
 */