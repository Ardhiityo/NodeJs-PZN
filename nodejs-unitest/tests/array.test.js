test('test array simple', () => {
    const person = ['Eko', "Kurniawan", "khannedy"];

    expect(person).toContain('Eko');
    expect(person).toEqual(['Eko', "Kurniawan", "khannedy"]);
});

test('test array object', () => {
    const person = [
        { name: 'Eko' },
        { name: 'Kurniawan' },
        { name: 'khannedy' }
    ];

    expect(person).toContainEqual({ name: 'Eko' });
});