declare module "stringExtensions" {
  global {
    interface StringConstructor {
      isEmpty(value: String): Boolean;
    }

    interface String {
      reverse(): String;
    }
  }
}
