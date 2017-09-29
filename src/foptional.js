// @flow

export type NoneType = {
  isSome: false,
  isNone: true,
  mapOption: <U>( (any)=>U ) => Optional<U>,
  tap: ((any)=>any) => NoneType
};

export type SomeType<T> = {
  isSome: true,
  isNone: false,
  value: T,
  mapOption: <U>( (T) => U ) => Optional<U>,
  map: <U>( (T) => U ) => SomeType<U>,
  tap: ((T)=>any) => SomeType<T>
};

export type Optional<T> = SomeType<T> | NoneType;

export function None(): NoneType {
  return {
    isSome: false,
    isNone: true,
    mapOption: function<U>(functor: (any)=>U): Optional<U> {
      return this;
    },
    tap: function(func: (any)=>any): NoneType {
      func(null);
      return this;
    }
  }
}

export function Some<T>(val: T): SomeType<T> {
  return {
    isSome: true,
    isNone: false,
    value: val,
    mapOption: function<U>(functor: (T) =>U ): Optional<U> {
      const newVal:U = functor(val);
      return newVal ? Some(newVal) : None();
    },
    map: function<U>(functor: (T) => U ): SomeType<U> {
      return Some(functor(val));
    },
    tap: function(func: (T) => any ): SomeType<T> {
      func(val);
      return this;
    }
  }
}
