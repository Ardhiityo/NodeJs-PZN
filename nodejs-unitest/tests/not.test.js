test('test not', () => {
    const name = "Eko";
    expect(name).not.toBe('Budi');
    expect(name).not.toEqual('Budi');
    expect(name).not.toBeNull();
    expect(name).not.toBeUndefined();
    expect(name).not.toBeFalsy();
});

test('test not array', () => {
    const names = ['Eko', 'Kurniawan', 'Khannedy'];
    expect(names).not.toContain('Budi');
    expect(names).not.toEqual(['Budi', 'Joko', 'Siti']);
});