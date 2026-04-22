import Mustache from "mustache";
import { readFile } from 'node:fs/promises';

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

test("mustache nested object", () => {
    //proses render template, langsung menggunakan template yang sudah di compile
    const template = Mustache.render("Hello {{person.name}}",
        {
            person: {
                name: "John"
            }
        }
    );

    expect(template).toBe("Hello John");
});

test('mustache file', async () => {
    const template = await readFile(__dirname + "/../views/hello.mustache", 'utf-8');
  
    const rendered = Mustache.render(template, { name: "John" });
    expect(rendered).toContain("Hello John");
});

test('mustache sections', async () => {
    const template = await readFile(__dirname + "/../views/person.mustache", 'utf-8');
  
    const rendered = Mustache.render(template, { person: { name: "John" } });
    expect(rendered).toContain("Hello John");
});