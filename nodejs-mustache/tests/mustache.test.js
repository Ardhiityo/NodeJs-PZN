import Mustache from "mustache";

test("mustache render", () => {
    const template = Mustache.render("Hello {{name}}", { name: "John" });
    expect(template).toBe("Hello John");
});