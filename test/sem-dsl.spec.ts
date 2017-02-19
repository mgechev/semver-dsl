import { SemDSL } from '../index';

describe('SemDSL', () => {

  describe('basic operators', () => {

    it('should has a factory which returns the context', () => {
      expect(SemDSL).not.toBeFalsy();
      expect(SemDSL('2.0.0')).not.toBeFalsy();
    });

    it('should invoke function when "eq" condition matched', () => {
      const target = {
        foo() {}
      };
      const spy = spyOn(target, 'foo');
      SemDSL('2.0.0').eq('2.0.0', target.foo);
      expect(target.foo).toHaveBeenCalled();
    });

    it('should invoke function when "gt" condition matched', () => {
      const target = {
        foo() {}
      };
      const spy = spyOn(target, 'foo');
      SemDSL('2.0.0').gt('1.9.9', target.foo);
      expect(target.foo).toHaveBeenCalled();
    });

    it('should invoke function when "lt" condition matched', () => {
      const target = {
        foo() {}
      };
      const spy = spyOn(target, 'foo');
      SemDSL('2.0.0').lt('2.9.9', target.foo);
      expect(target.foo).toHaveBeenCalled();
    });

    it('should invoke function when "lte" condition matched', () => {
      const target = {
        foo() {},
        bar() {}
      };
      spyOn(target, 'foo');
      spyOn(target, 'bar');
      SemDSL('2.0.0').lte('2.0.0', target.foo);
      SemDSL('2.0.0').lte('3.0.0', target.bar);
      expect(target.foo).toHaveBeenCalled();
      expect(target.bar).toHaveBeenCalled();
    });

    it('should invoke function when "gte" condition matched', () => {
      const target = {
        foo() {},
        bar() {}
      };
      spyOn(target, 'foo');
      spyOn(target, 'bar');
      SemDSL('2.0.0').gte('2.0.0', target.foo);
      SemDSL('2.0.0').gte('1.0.0', target.bar);
      expect(target.foo).toHaveBeenCalled();
      expect(target.bar).toHaveBeenCalled();
    });

    it('should invoke function when "between" condition matched', () => {
      const target = {
        foo() {},
        bar() {}
      };
      spyOn(target, 'foo');
      spyOn(target, 'bar');
      SemDSL('2.0.0').between('1.9.0', '2.2.0', target.foo);
      SemDSL('3.0.0-beta.4').between('1.9.0', '3.0.0', target.bar);
      expect(target.foo).toHaveBeenCalled();
      expect(target.bar).toHaveBeenCalled();
    });

  });

  describe('else and elseIf', () => {
    it('should invoke "else" in case the base condition don\'t match', () => {
      const target = {
        else() {},
        base() {}
      };
      spyOn(target, 'else');
      spyOn(target, 'base');
      SemDSL('3.0.0')
        .between('1.9.0', '2.2.0', target.base)
        .else(target.else);
      expect(target.base).not.toHaveBeenCalled();
      expect(target.else).toHaveBeenCalled();
    });

    it('should invoke "elseIf" in case base does\'t match', () => {
      const target = {
        elseIf() {},
        else() {},
        base() {}
      };
      spyOn(target, 'elseIf');
      spyOn(target, 'else');
      spyOn(target, 'base');
      SemDSL('3.0.0')
        .gt('3.2.1', target.base)
        .elseIf.lt('3.0.1', target.elseIf)
        .else(target.else);
      expect(target.elseIf).toHaveBeenCalled();
      expect(target.base).not.toHaveBeenCalled();
      expect(target.else).not.toHaveBeenCalled();
    });

    it('should invoke proper "elseIf" from the chain', () => {
      const target = {
        elseIf1() {},
        elseIf2() {},
        else() {},
        base() {}
      };
      spyOn(target, 'elseIf1');
      spyOn(target, 'elseIf2');
      spyOn(target, 'else');
      spyOn(target, 'base');
      SemDSL('3.0.0')
        .gt('3.2.1', target.base)
        .elseIf.gt('3.0.1', target.elseIf1)
        .elseIf.lt('3.0.1', target.elseIf2)
        .else(target.else);
      expect(target.elseIf2).toHaveBeenCalled();
      expect(target.elseIf1).not.toHaveBeenCalled();
      expect(target.base).not.toHaveBeenCalled();
      expect(target.else).not.toHaveBeenCalled();
    });

    it('should invoke proper "elseIf" from the chain', () => {
      const target = {
        elseIf1() {},
        elseIf2() {},
        else() {},
        base() {}
      };
      spyOn(target, 'elseIf1');
      spyOn(target, 'elseIf2');
      spyOn(target, 'else');
      spyOn(target, 'base');
      SemDSL('3.0.0')
        .gt('3.2.1', target.base)
        .elseIf.gt('3.0.1', target.elseIf1)
        .elseIf.between('3.0.1', '3.1.8', target.elseIf2)
        .else(target.else);
      expect(target.elseIf2).not.toHaveBeenCalled();
      expect(target.elseIf1).not.toHaveBeenCalled();
      expect(target.base).not.toHaveBeenCalled();
      expect(target.else).toHaveBeenCalled();
    });
  });
});
