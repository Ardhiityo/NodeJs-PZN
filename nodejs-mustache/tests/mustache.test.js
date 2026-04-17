import Mustache from "mustache";

test("mustache render", () => {
    //proses render template, proses cache dilakukan ketika memanggil render
    const template = Mustache.render("Hello {{name}}", { name: "John" });
    expect(template).toBe("Hello John");
});

test("mustache cache", () => {
    //proses compile template
    Mustache.parse("Hello {{name}}");

    //proses render template, langsung menggunakan template yang sudah di compile
    const template = Mustache.render("Hello {{name}}", { name: "John" });
    expect(template).toBe("Hello John");
});

test("mustache tags", () => {
    //proses render template, langsung menggunakan template yang sudah di compile
    const template = Mustache.render("Hello {{name}} my hobby is {{{hobby}}}",
        {
            name: "John",
            hobby: "<b>Coding</b>"
        }
    );

    expect(template).toBe("Hello John my hobby is <b>Coding</b>");
});