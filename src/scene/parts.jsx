import { RoundedBox } from '@react-three/drei';

// Matte clay primitive whose emissive intensity can be animated via a ref to the mesh.
export function Part({ kind = 'block', color, size = [1, 1, 1], ...props }) {
  const mat = <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0} roughness={0.88} />;
  if (kind === 'sphere') {
    return (
      <mesh {...props}>
        <sphereGeometry args={[size[0], 32, 32]} />
        {mat}
      </mesh>
    );
  }
  if (kind === 'wheel') {
    return (
      <mesh rotation={[Math.PI / 2, 0, 0]} {...props}>
        <cylinderGeometry args={[size[0], size[0], size[1], 24]} />
        {mat}
      </mesh>
    );
  }
  return (
    <RoundedBox args={size} radius={Math.min(0.15, Math.min(...size) / 2.5)} smoothness={3} {...props}>
      {mat}
    </RoundedBox>
  );
}
