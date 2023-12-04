import { Uniform } from 'three'
import { BlendFunction, Effect, EffectAttribute } from 'postprocessing'
import { wrapEffect } from './util.tsx'
import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { useState } from 'react'

const TiltShiftShader = {
  fragmentShader: `
    // original shader by Evan Wallace

    #define MAX_ITERATIONS 100

    uniform float blur;
    uniform float taper;
    uniform vec2 start;
    uniform vec2 end;
    uniform vec2 direction;
    uniform int sampleCount;

    float random(vec3 scale, float seed) {
        /* use the fragment position for a different seed per-pixel */
        return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

        vec4 color = vec4(0.0);
        float total = 0.0;
        vec2 startPixel = vec2(start.x * resolution.x, start.y * resolution.y);
        vec2 endPixel = vec2(end.x * resolution.x, end.y * resolution.y);

        // use screen diagonal to normalize blur radii
        float maxScreenDistance = distance(vec2(0.0), resolution); // diagonal distance

        float gradientRadius = taper * (maxScreenDistance);
        float blurRadius = blur * (maxScreenDistance / 16.0);

        /* randomize the lookup values to hide the fixed number of samples */
        float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);

        // Adjust the calculation to make the blur vertical
        vec2 normal = normalize(vec2(endPixel.x - startPixel.x, endPixel.y - startPixel.y));
        float radius = smoothstep(0.0, 1.0, abs(dot(uv * resolution - startPixel, normal)) / gradientRadius) * blurRadius;

        float f_samples = float(sampleCount);
        float half_samples = f_samples / 2.0;

        #pragma unroll_loop_start
        for (int i = 0; i <= MAX_ITERATIONS; i++) {
            
            if (i >= sampleCount) { break; } // return early if over sample count

            float f_i = float(i);
            float s_i = -half_samples + f_i;

            float percent = (s_i + offset - 0.5) / half_samples;
            float weight = 1.0 - abs(percent);

            vec4 sample_i = texture2D(inputBuffer, uv + normalize(direction) / resolution * percent * radius);

            /* switch to pre-multiplied alpha to correctly blur transparent images */
            sample_i.rgb *= sample_i.a;

            color += sample_i * weight;
            total += weight;
        }
        #pragma unroll_loop_end

        outputColor = color / total;

        /* switch back from pre-multiplied alpha */
        outputColor.rgb /= outputColor.a + 0.00001;
    }
    `,
};

export class TiltShiftEffect extends Effect {
  constructor({
    blendFunction = BlendFunction.Normal,
    blur = 1.0, // [0, 1], can go beyond 1 for extra
    taper = 0.5, // [0, 1], can go beyond 1 for extra
    start = [0.01, 0.01], // [0,1] percentage x,y of screenspace
    end = [1.0, 1.0], // [0,1] percentage x,y of screenspace
    sampleCount = 40.0, // number of blur samples
    direction = [1, 1] // direction of blur
  } = {}) {
    super('TiltShiftEffect', TiltShiftShader.fragmentShader, {
      blendFunction,
      attributes: EffectAttribute.CONVOLUTION,
      uniforms: new Map([
        ['blur', new Uniform(blur)],
        ['taper', new Uniform(taper)],
        ['start', new Uniform(start)],
        ['end', new Uniform(end)],
        ['sampleCount', new Uniform(sampleCount)],
        ['direction', new Uniform(direction)]
      ])
    })
  }
}

const TiltShift = wrapEffect(TiltShiftEffect)

// function TiltShiftEffects() {
//   const { blur } = useControls({
//     blur: {
//       value: 1,
//       min: 0.0,
//       max: 2.0,
//       label: 'Blur'
//     }
//   })

//   const { taper } = useControls({
//     taper: {
//       value: 0.5,
//       min: 0.0,
//       max: 1.0,
//       label: 'Taper'
//     }
//   })

//   const { start } = useControls({
//     start: {
//       value: {
//         x: 0.6,
//         y: 0.5
//       },
//       step: 0.01,
//       min: 0.0,
//       max: 1.0,
//       joystick: 'invertY',
//       label: 'Start Point'
//     }
//   })

//   const { end } = useControls({
//     end: {
//       value: {
//         x: 0.6,
//         y: 1.0
//       },
//       step: 0.01,
//       min: 0.0,
//       max: 1.0,
//       joystick: 'invertY',
//       label: 'End Point'
//     }
//   })

//   const { sampleCount } = useControls({
//     sampleCount: {
//       value: 40,
//       min: 3.0,
//       max: 100.0,
//       label: 'Samples'
//     }
//   })

//   const { direction } = useControls({
//     direction: {
//       value: {
//         x: 1.0,
//         y: 1.0
//       },
//       step: 0.1,
//       min: -1.0,
//       max: 1.0,
//       joystick: 'invertY',
//       label: 'Direction'
//     }
//   })

//   return (
//     <EffectComposer>
//       <TiltShift blur={blur} taper={taper} start={start} end={end} sampleCount={sampleCount} direction={direction} />
//     </EffectComposer>
//   )
// }
function TiltShiftEffects() {
  const [blur, setBlur] = useState(1);
  const [taper, setTaper] = useState(0.5);
  const [start, setStart] = useState({ x: 0.6, y: 0.5 });
  const [end, setEnd] = useState({ x: 0.6, y: 1.0 });
  const [sampleCount, setSampleCount] = useState(40);
  const [direction, setDirection] = useState({ x: 1.0, y: 1.0 });

  return (
    <EffectComposer>
      <TiltShift
        blur={blur}
        taper={taper}
        start={start}
        end={end}
        sampleCount={sampleCount}
        direction={direction}
      />
    </EffectComposer>
  );
}


export default TiltShiftEffects
