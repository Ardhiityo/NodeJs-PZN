test('test toBe', () => {
    const a = 10;

    //toBe = biasanya digunakan untuk value bukan object
    expect(a).toBe(10);
})

test('test toEqual', () => {
    const person = { firstName: "Arya" };

    Object.assign(person, { lastName: "Putra" });

    //toEqual = membandingkan semua properties secara recursive, atau dikenal dengan deep equality
    expect(person).toEqual({ firstName: "Arya", lastName: "Putra" });
})