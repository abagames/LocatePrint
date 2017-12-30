declare module 'glfx' {
  function canvas();
  function wrap(shader: any);
  class Shader {
    constructor(v: any, code: string);
  }
  function simpleShader();
}