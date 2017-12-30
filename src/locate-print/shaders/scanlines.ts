import * as fx from 'glfx';

export default function scanlines(offset) {
	var shader = new fx.Shader(null, '\
		uniform sampler2D texture;\
		uniform float texSizeY;\
		uniform float offset;\
		varying vec2 texCoord;\
		\
		void main() {\
			vec4 p = texture2D(texture, texCoord);\
			float br = clamp(sin((texCoord.y + offset) / texSizeY * 50000.0) *\
				0.1 + 1.0, 0.0, 1.0);\
			p.rgb *= br;\
			gl_FragColor = p;\
		}\
	');
	fx.simpleShader.call(this, shader, {
		texSizeY: this.height,
		offset: offset
	});
	return this;
}
