export class UUID {
    static create() {
        let uuid = "", i, random;

        for (i = 0; i < 32; i++) {
            // tslint:disable-next-line:no-bitwise
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            // tslint:disable-next-line:no-bitwise
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return uuid;
    }
}
