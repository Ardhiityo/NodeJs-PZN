test('test string match 1', () => {
    expect('team').not.toMatch(/I/);
});

test('test string match 2', () => {
    expect('Christoph').toMatch(/stop/);
});