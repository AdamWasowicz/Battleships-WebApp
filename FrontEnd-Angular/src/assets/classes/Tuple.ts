export default class Tuple<T, K> {

    item1: T;
    item2: K;

    constructor(item1: T, item2: K) {
        this.item1 = item1;
        this.item2 = item2;
    }
}