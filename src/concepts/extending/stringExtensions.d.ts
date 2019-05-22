declare module "stringExtensions" {
  global {
    interface StringConstructor {
      isEmpty(value: String): Boolean;
    }
  }
}
