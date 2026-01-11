import { useState, useRef, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import './DesignStudio.css';

// Componente de Taza 3D
function Mug({ designImage, mugColor }) {
  const texture = designImage ? useLoader(THREE.TextureLoader, designImage) : null;

  // Configurar textura para que se repita alrededor del cilindro
  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
  }

  return (
    <group>
      {/* Cuerpo de la taza (cilindro) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 0.9, 2, 64]} />
        <meshStandardMaterial 
          color={mugColor} 
          map={texture}
        />
      </mesh>

      {/* Asa de la taza - más cerca del cuerpo */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI]} />
        <meshStandardMaterial color={mugColor} />
      </mesh>

      {/* Base de la taza */}
      <mesh position={[0, -1, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 64]} />
        <meshStandardMaterial color={mugColor} />
      </mesh>
    </group>
  );
}

// Componente de Playera 3D - Forma más realista
function Shirt({ designImage, shirtColor, designPosition }) {
  const texture = designImage ? useLoader(THREE.TextureLoader, designImage) : null;

  const positions = {
    chest: { position: [0, 0.3, 0.52], rotation: [0, 0, 0], scale: 0.6 },
    back: { position: [0, 0.3, -0.52], rotation: [0, Math.PI, 0], scale: 0.6 },
    leftSleeve: { position: [-1.15, 0.5, 0.25], rotation: [0, -Math.PI / 6, 0], scale: 0.25 },
    rightSleeve: { position: [1.15, 0.5, 0.25], rotation: [0, Math.PI / 6, 0], scale: 0.25 },
  };

  const designPos = positions[designPosition];

  return (
    <group>
      {/* Torso principal - más redondeado */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2.2, 1]} />
        <meshStandardMaterial 
          color={shirtColor}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Esquinas redondeadas del torso */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[1.8, 0.2, 0.95]} />
        <meshStandardMaterial color={shirtColor} roughness={0.8} />
      </mesh>

      {/* Manga izquierda - forma más orgánica */}
      <group position={[-1.2, 0.6, 0]} rotation={[0, 0, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 1.2, 0.9]} />
          <meshStandardMaterial color={shirtColor} roughness={0.8} />
        </mesh>
        {/* Hombro redondeado */}
        <mesh position={[0.1, 0.6, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Manga derecha - forma más orgánica */}
      <group position={[1.2, 0.6, 0]} rotation={[0, 0, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 1.2, 0.9]} />
          <meshStandardMaterial color={shirtColor} roughness={0.8} />
        </mesh>
        {/* Hombro redondeado */}
        <mesh position={[-0.1, 0.6, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Cuello en V más realista */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.25, 16]} />
        <meshStandardMaterial color={shirtColor} roughness={0.8} />
      </mesh>

      {/* Diseño aplicado según posición seleccionada */}
      {texture && designPos && (
        <mesh
          position={designPos.position}
          rotation={designPos.rotation}
        >
          <planeGeometry args={[1.2 * designPos.scale / 0.6, 1.2 * designPos.scale / 0.6]} />
          <meshStandardMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Componente principal
export default function DesignStudio() {
  const [productType, setProductType] = useState('mug'); // 'mug' o 'shirt'
  const [designImage, setDesignImage] = useState(null);
  const [mugColor, setMugColor] = useState('#ffffff');
  const [shirtColor, setShirtColor] = useState('#000000');
  const [designPosition, setDesignPosition] = useState('chest');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetDesign = () => {
    setDesignImage(null);
    // Resetear el input file para permitir subir la misma imagen de nuevo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <main className="design-studio">
      <div className="studio-header">
        <h1>🎨 Diseña tu producto</h1>
        <p>Sube tu diseño y visualízalo en 3D</p>
      </div>

      <div className="studio-container">
        {/* Panel de controles */}
        <aside className="controls-panel">
          <div className="control-group">
            <h3>Producto</h3>
            <div className="product-selector">
              <button
                className={productType === 'mug' ? 'active' : ''}
                onClick={() => setProductType('mug')}
              >
                ☕ Taza
              </button>
              <button
                className={productType === 'shirt' ? 'active' : ''}
                onClick={() => setProductType('shirt')}
              >
                👕 Playera
              </button>
            </div>
          </div>

          <div className="control-group">
            <h3>Tu diseño</h3>
            <label className="upload-btn">
              📤 Subir imagen
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
            {designImage && (
              <button onClick={resetDesign} className="reset-btn">
                🗑️ Quitar diseño
              </button>
            )}
          </div>

          {productType === 'mug' && (
            <div className="control-group">
              <h3>Color de taza</h3>
              <div className="color-options">
                <button
                  className={`color-btn ${mugColor === '#ffffff' ? 'active' : ''}`}
                  style={{ backgroundColor: '#ffffff', border: '2px solid #ccc' }}
                  onClick={() => setMugColor('#ffffff')}
                  title="Blanco"
                />
                <button
                  className={`color-btn ${mugColor === '#000000' ? 'active' : ''}`}
                  style={{ backgroundColor: '#000000' }}
                  onClick={() => setMugColor('#000000')}
                  title="Negro"
                />
                <button
                  className={`color-btn ${mugColor === '#ef4444' ? 'active' : ''}`}
                  style={{ backgroundColor: '#ef4444' }}
                  onClick={() => setMugColor('#ef4444')}
                  title="Rojo"
                />
                <button
                  className={`color-btn ${mugColor === '#3b82f6' ? 'active' : ''}`}
                  style={{ backgroundColor: '#3b82f6' }}
                  onClick={() => setMugColor('#3b82f6')}
                  title="Azul"
                />
              </div>
            </div>
          )}

          {productType === 'shirt' && (
            <>
              <div className="control-group">
                <h3>Color de playera</h3>
                <div className="color-options">
                  <button
                    className={`color-btn ${shirtColor === '#ffffff' ? 'active' : ''}`}
                    style={{ backgroundColor: '#ffffff', border: '2px solid #ccc' }}
                    onClick={() => setShirtColor('#ffffff')}
                    title="Blanco"
                  />
                  <button
                    className={`color-btn ${shirtColor === '#000000' ? 'active' : ''}`}
                    style={{ backgroundColor: '#000000' }}
                    onClick={() => setShirtColor('#000000')}
                    title="Negro"
                  />
                  <button
                    className={`color-btn ${shirtColor === '#ef4444' ? 'active' : ''}`}
                    style={{ backgroundColor: '#ef4444' }}
                    onClick={() => setShirtColor('#ef4444')}
                    title="Rojo"
                  />
                  <button
                    className={`color-btn ${shirtColor === '#3b82f6' ? 'active' : ''}`}
                    style={{ backgroundColor: '#3b82f6' }}
                    onClick={() => setShirtColor('#3b82f6')}
                    title="Azul"
                  />
                  <button
                    className={`color-btn ${shirtColor === '#22c55e' ? 'active' : ''}`}
                    style={{ backgroundColor: '#22c55e' }}
                    onClick={() => setShirtColor('#22c55e')}
                    title="Verde"
                  />
                </div>
              </div>

              <div className="control-group">
                <h3>Posición del diseño</h3>
                <div className="position-selector">
                  <button
                    className={designPosition === 'chest' ? 'active' : ''}
                    onClick={() => setDesignPosition('chest')}
                  >
                    Pecho
                  </button>
                  <button
                    className={designPosition === 'back' ? 'active' : ''}
                    onClick={() => setDesignPosition('back')}
                  >
                    Espalda
                  </button>
                  <button
                    className={designPosition === 'leftSleeve' ? 'active' : ''}
                    onClick={() => setDesignPosition('leftSleeve')}
                  >
                    Manga Izq.
                  </button>
                  <button
                    className={designPosition === 'rightSleeve' ? 'active' : ''}
                    onClick={() => setDesignPosition('rightSleeve')}
                  >
                    Manga Der.
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="control-group">
            <div className="hint">
              💡 Arrastra para rotar el modelo
            </div>
          </div>
        </aside>

        {/* Vista 3D */}
        <div className="canvas-container">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls enableZoom={true} enablePan={false} />
            
            {/* Iluminación */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[-5, 5, 5]} intensity={0.3} />

            {/* Modelos 3D */}
            <Suspense fallback={null}>
              {productType === 'mug' ? (
                <Mug designImage={designImage} mugColor={mugColor} />
              ) : (
                <Shirt
                  designImage={designImage}
                  shirtColor={shirtColor}
                  designPosition={designPosition}
                />
              )}
            </Suspense>

            {/* Plano de sombra */}
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -2, 0]}
              receiveShadow
            >
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.2} />
            </mesh>
          </Canvas>
        </div>
      </div>
    </main>
  );
}
