import * as fx from 'glfx';

export default function colorShift() {
	var shader = new fx.Shader(null, '\
		uniform sampler2D texture;\
		uniform float texSizeX;\
		varying vec2 texCoord;\
		\
		void main() {\
			vec2 ofs = vec2(2.0 / texSizeX, 0.0);\
			vec4 pl = texture2D(texture, texCoord - ofs);\
			vec4 pc = texture2D(texture, texCoord);\
			vec4 pr = texture2D(texture, texCoord + ofs);\
			gl_FragColor = vec4(pl.r, pc.g, pr.b, pc.a);\
		}\
	');
	fx.simpleShader.call(this, shader, {
		texSizeX: this.width
	});
	return this;
}
