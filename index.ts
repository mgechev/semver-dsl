import * as semver from 'semver';

export interface ISemVerDSL {
  gte(version: string, callback: Function): ISemVerContextBoundDSL;
  lte(version: string, callback: Function): ISemVerContextBoundDSL;
  gt(version: string, callback: Function): ISemVerContextBoundDSL;
  lt(version: string, callback: Function): ISemVerContextBoundDSL;
  eq(version: string, callback: Function): ISemVerContextBoundDSL;
  neq(version: string, callback: Function): ISemVerContextBoundDSL;
  between(v1: string, v2: string, callback: Function): ISemVerContextBoundDSL;
}

export interface ISemVerContextBoundDSL {
  elseIf: ISemVerDSL;
  else(callback: Function): void;
}

export const SemVerDSL = (target: string, lastPredicate = () => true) => {

  function createBoundContext(lastPredicate: () => boolean): ISemVerContextBoundDSL {
    const result = () => false;
    const object = Object.create({}, {
      else: {
        value(callback: Function) {
          if (!lastPredicate()) callback();
        }
      },
      elseIf: {
        get() {
          return SemVerDSL(target, () => !lastPredicate())
        }
      }
    });
    Object.setPrototypeOf(result, object);
    return result as any;
  };

  const dsl = {

    gte(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.gte(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    lte(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.lte(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    gt(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.gt(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    lt(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.lt(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    eq(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.eq(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    neq(version: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.neq(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    between(v1: string, v2: string, callback: Function): ISemVerContextBoundDSL {
      const predicate = () => semver.gte(target, v1) && semver.lte(target, v2) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    }
  };
  return dsl;
};
