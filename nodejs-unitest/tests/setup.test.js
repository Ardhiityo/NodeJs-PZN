beforeAll(() => {
    console.log("Before All");
});

afterAll(() => {
    console.log("After All");
});

beforeEach(() => {
    console.log("Before Each");
});

afterEach(() => {
    console.log("After Each");
});

test("test 1", () => {
    console.log("Test 1");
});

test("test 2", () => {
    console.log("Test 2");
});