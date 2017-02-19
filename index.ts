import * as semver from 'semver';

export interface ISemDSL {
  gte(version: string, callback?: Function): ISemContextualDSL;
  lte(version: string, callback?: Function): ISemContextualDSL;
  gt(version: string, callback?: Function): ISemContextualDSL;
  lt(version: string, callback?: Function): ISemContextualDSL;
  eq(version: string, callback?: Function): ISemContextualDSL;
  neq(version: string, callback?: Function): ISemContextualDSL;
  between(v1: string, v2: string, callback?: Function): ISemContextualDSL;
}

export interface ISemContextualDSL {
  (): boolean;
  elseIf(predicate: Function, callback: Function): ISemContextualDSL;
  else(callback: Function);
}

export const SemDSL = (target: string) => {

  function getContextRunner(lastPredicate: Function): ISemContextualDSL {
    const result = () => false;
    const object = Object.create({}, {
      else: {
        value(callback: Function) {
          if (!lastPredicate()) callback();
        }
      },
      elseIf: {
        value(predicate: Function, callback: Function) {
          if (!lastPredicate() && predicate()) callback();
          const nextPredicate = () => predicate() || lastPredicate();
          return getContextRunner(nextPredicate);
        }
      }
    });
    Object.setPrototypeOf(result, object);
    return result as any;
  };

  const dsl = {

    gte(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.gte.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    lte(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.lte.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    gt(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.gt.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    lt(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.lt.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    eq(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.eq.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    neq(version: string, callback?: Function): ISemContextualDSL {
      const predicate = semver.neq.bind(null, target, version);
      if (!callback) {
        return predicate;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    },

    between(v1: string, v2: string, callback?: Function): ISemContextualDSL {
      const predicate = () => {
        return semver.gte(target, v1) && semver.lte(target, v2);
      };
      if (!callback) {
        return predicate as any;
      }
      if (predicate()) {
        callback();
      }
      return getContextRunner(predicate);
    }
  };
  return dsl;
};
