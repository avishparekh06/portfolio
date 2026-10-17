import { Float, RoundedBox } from '@react-three/drei';

const GEOMETRY = {
  sphere: <sphereGeometry args={[1, 48, 48]} />,
  torus: <torusGeometry args={[1, 0.35, 24, 64]} />,
  capsule: <capsuleGeometry args={[0.5, 1, 8, 24]} />,
};

// One matte, soft-shaded clay primitive that floats gently. `reduced` freezes the float.
export default function ClayShape({
  kind = 'sphere',
  color,
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  float = 1,
  reduced = false,
}) {
  const material = <meshStandardMaterial color={color} roughness={0.88} metalness={0} />;
  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.4 * float}
      floatIntensity={reduced ? 0 : 0.8 * float}
    >
      {kind === 'block' ? (
        <RoundedBox args={[1, 1, 1]} radius={0.22} smoothness={4} position={position} scale={scale} rotation={rotation}>
          {material}
        </RoundedBox>
      ) : (
        <mesh position={position} scale={scale} rotation={rotation}>
          {GEOMETRY[kind]}
          {material}
        </mesh>
      )}
    </Float>
  );
}
