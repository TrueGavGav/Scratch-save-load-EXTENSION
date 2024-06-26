class SaveLoadExtension {
  constructor(runtime) {
    this.runtime = runtime;
  }

  getInfo() {
    return {
      id: 'saveloadextension',
      name: 'Save/Load Variables',
      blocks: [
        {
          opcode: 'saveVariables',
          blockType: Scratch.BlockType.COMMAND,
          text: 'save variables'
        },
        {
          opcode: 'loadVariables',
          blockType: Scratch.BlockType.COMMAND,
          text: 'load variables'
        }
      ]
    };
  }

  saveVariables() {
    const vm = this.runtime;
    const stage = vm.getTargetForStage();

    if (stage) {
      const savedVariables = {};
      const variables = stage.variables;

      Object.keys(variables).forEach(varId => {
        const variable = variables[varId];
        savedVariables[variable.name] = variable.value;
      });

      localStorage.setItem('scratchVariables', JSON.stringify(savedVariables));
    }
  }

  loadVariables() {
    const vm = this.runtime;
    const stage = vm.getTargetForStage();

    if (stage) {
      const savedVariables = JSON.parse(localStorage.getItem('scratchVariables'));

      if (savedVariables) {
        const variables = stage.variables;

        Object.keys(variables).forEach(varId => {
          const variable = variables[varId];
          if (savedVariables.hasOwnProperty(variable.name)) {
            variable.value = savedVariables[variable.name];
          }
        });
      }
    }
  }
}

Scratch.extensions.register(new SaveLoadExtension());
