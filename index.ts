import * as semver from 'semver';

export interface ISemDSL {
  gte(version: string, callback: Function): ISemContextBoundDSL;
  lte(version: string, callback: Function): ISemContextBoundDSL;
  gt(version: string, callback: Function): ISemContextBoundDSL;
  lt(version: string, callback: Function): ISemContextBoundDSL;
  eq(version: string, callback: Function): ISemContextBoundDSL;
  neq(version: string, callback: Function): ISemContextBoundDSL;
  between(v1: string, v2: string, callback: Function): ISemContextBoundDSL;
}

export interface ISemContextBoundDSL {
  elseIf: ISemDSL;
  else(callback: Function): void;
}

export const SemDSL = (target: string, lastPredicate = () => true) => {

  function createBoundContext(lastPredicate: () => boolean): ISemContextBoundDSL {
    const result = () => false;
    const object = Object.create({}, {
      else: {
        value(callback: Function) {
          if (!lastPredicate()) callback();
        }
      },
      elseIf: {
        get() {
          return SemDSL(target, () => !lastPredicate())
        }
      }
    });
    Object.setPrototypeOf(result, object);
    return result as any;
  };

  const dsl = {

    gte(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.gte(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    lte(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.lte(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    gt(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.gt(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    lt(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.lt(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    eq(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.eq(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    neq(version: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.neq(target, version) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    },

    between(v1: string, v2: string, callback: Function): ISemContextBoundDSL {
      const predicate = () => semver.gte(target, v1) && semver.lte(target, v2) && lastPredicate();
      if (predicate()) callback();
      return createBoundContext(predicate);
    }
  };
  return dsl;
};
