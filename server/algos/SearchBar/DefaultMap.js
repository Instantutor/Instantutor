module.exports = class DefaultMap extends Map {
    constructor(getDefaultValue, ...mapConstructorArgs) {
      super(mapConstructorArgs);
  
      if (typeof getDefaultValue !== 'function') {
        throw new Error('getDefaultValue must be a function');
      }
  
      this.getDefaultValue = getDefaultValue;
    }
  
    get = key => {
      if (!this.has(key)) {
        this.set(key, this.getDefaultValue(key));
      }
  
      return super.get(key);
    };
  };