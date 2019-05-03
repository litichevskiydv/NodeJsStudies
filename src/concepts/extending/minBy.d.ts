import * as Manipula from "manipula";

declare module "manipula" {
  interface IEnumerable<T> {
    minBy<TKey>(keySelector: (element: T) => TKey, comparer: (x: T, y: T) => number): T;
  }
}
