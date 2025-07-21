import { useEffect, useRef, useState } from 'react';
import Stats from 'stats.js';
import {
  Vector3,
  Clock,
  AmbientLight,
  AnimationMixer,
  DirectionalLight,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Object3D
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { degToRad } from 'three/src/math/MathUtils';

import { IS_DEBUG } from '@/constant';
import { useAssets } from '@/context/AssetLoaderContext';

if (typeof window !== 'undefined' && IS_DEBUG) {
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  const animate = () => {
    stats?.update();
    requestAnimationFrame(animate);
  };

  animate();
}

type TThreeSceneProps = {
  hasSeparateCSSRenderer?: boolean;
  hasOrbitControls?: boolean;
  hasPointerLockControls?: boolean;
  hasAmbientLight?: boolean;
  hasDirectionalLight?: boolean;
};

export function useThree({
  hasSeparateCSSRenderer,
  hasOrbitControls,
  hasPointerLockControls,
  hasAmbientLight,
  hasDirectionalLight
}: TThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    webglScene: Scene;
    camera: PerspectiveCamera;
    enableModelLookAtMouse: (modelObjectToLookAtMouse: Object3D) => void;
    disableModelLookAtMouse: () => void;
    updateIsSceneReadyForModelToLookAtMouse?: (val: boolean) => void;
    directionalLight?: DirectionalLight;
    ambientLight?: AmbientLight;
    webglRenderer: WebGLRenderer;
    cssRenderer?: CSS2DRenderer;
    cssScene?: Scene;
    pointerLockControls?: PointerLockControls;
    orbitControls?: OrbitControls; // Placeholder for potential future use
    initialCameraPosition: Vector3;
    isMounted: boolean;
  } | null>(null);
  let now: number = 0;
  let then: number = 0;
  let elapsed: number = 0;

  const [isFreelyViewing, setIsFreelyViewing] = useState(1);
  const { animationMixers } = useAssets();
  const [isMounted, setIsMounted] = useState(false);
  const frameId = useRef<number | null>(null);

  const animationMixersRef = useRef<{ [key: string]: AnimationMixer }>({});
  animationMixersRef.current = animationMixers;

  const [cssRenderer, setCSSRenderer] = useState<CSS2DRenderer | undefined>();
  const [cssScene, setCSSScene] = useState<Scene | undefined>();
  const orbitControls = useRef<OrbitControls | undefined>(undefined);
  const pointerLockControls = useRef<PointerLockControls | undefined>(undefined);
  const directionalLightRef = useRef<DirectionalLight | undefined>(undefined);
  const ambientLightRef = useRef<AmbientLight | undefined>(undefined);
  const isSceneReadyForModelToLookAtMouse = useRef<boolean>(false);

  const updateAnimationMixers = (delta: number) => {
    if (!animationMixers || Object.keys(animationMixersRef.current).length < 1) return;
    Object.values(animationMixersRef.current).forEach(mixer => {
      mixer.update(delta);
    });
  };
  const modelToLookAtMouseRef = useRef<Object3D | undefined>(undefined);

  // const [initialCameraPosition, setInitialCameraPosition] = useState<Vector3 | undefined>();

  // const updateCSSObjects = (cssScene: Scene, camera: PerspectiveCamera) => {
  //   cssScene.traverse((child) => {
  //     if (child instanceof CSS3DObject) {
  //       // child.quaternion.copy(camera.quaternion);
  //     }
  //   });
  // }

  function enableModelLookAtMouse(modelObjectToLookAtMouse: Object3D) {
    modelToLookAtMouseRef.current = modelObjectToLookAtMouse;
  }

  function disableModelLookAtMouse() {
    modelToLookAtMouseRef.current = undefined;
  }

  function updateIsSceneReadyForModelToLookAtMouse(val: boolean) {
    isSceneReadyForModelToLookAtMouse.current = val;
  }

  useEffect(() => {
    if (!state || !hasPointerLockControls || !state.pointerLockControls) return;
    state.pointerLockControls.pointerSpeed = isFreelyViewing;
  }, [isFreelyViewing, state]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const webglScene = new Scene();
    if (hasSeparateCSSRenderer) setCSSScene(new Scene());
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 90);
    camera.position.set(0, 0, 0);

    const webglRenderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    webglRenderer.setPixelRatio(window.devicePixelRatio);
    webglRenderer.shadowMap.enabled = true;
    webglRenderer.shadowMap.type = PCFSoftShadowMap;
    webglRenderer.setSize(window.innerWidth, window.innerHeight);
    const webglDiv = document.createElement('div');
    webglDiv.id = 'webgl';
    webglDiv.appendChild(webglRenderer.domElement);
    mountRef.current.appendChild(webglDiv);

    if (hasSeparateCSSRenderer) {
      // CSS2D Renderer (for HTML elements)
      const cssRenderer = new CSS2DRenderer();
      cssRenderer.setSize(window.innerWidth, window.innerHeight);
      cssRenderer.domElement.style.position = 'absolute';
      cssRenderer.domElement.style.top = '0';
      cssRenderer.domElement.classList.add('css2d-renderer');

      setCSSRenderer(cssRenderer);

      const css3dDiv = document.createElement('div');
      css3dDiv.id = 'css';
      css3dDiv.appendChild(cssRenderer.domElement);
      mountRef.current.appendChild(css3dDiv);
    }

    // Light
    if (hasAmbientLight) {
      const ambientLight = new AmbientLight(0xffffff, 1);
      webglScene.add(ambientLight);
      ambientLightRef.current = ambientLight;
    }
    if (hasDirectionalLight) {
      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 1024; // default
      directionalLight.shadow.mapSize.height = 1024; // default
      webglScene.add(directionalLight);
      directionalLightRef.current = directionalLight;
    }

    // Controls

    if (hasPointerLockControls) {
      const controls = new PointerLockControls(camera, webglRenderer.domElement);

      controls.pointerSpeed = 1;
      controls.minPolarAngle = degToRad(1);
      controls.maxPolarAngle = degToRad(179);

      pointerLockControls.current = controls;
    }

    if (hasOrbitControls) {
      const control = new OrbitControls(camera, webglRenderer.domElement);
      control.enableDamping = true;

      orbitControls.current = control;
    }

    // Resize window
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      webglRenderer.setSize(window.innerWidth, window.innerHeight);
      if (hasSeparateCSSRenderer && cssRenderer)
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
    });

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const rect = webglRenderer.domElement.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1; // Normalize to -1 to 1
      const y = (-(clientY - rect.top) / rect.height) * 2 + 1; // Normalize to -1 to 1
      const vector = new Vector3(x, y, 0.5); // z = 0.75 for the near plane
      vector.unproject(camera);
      if (!isSceneReadyForModelToLookAtMouse.current)
        (handleMouseMove as any).latestVector = undefined;
      else (handleMouseMove as any).latestVector = vector; // Custom property to identify this function
    };

    window.addEventListener('mousemove', handleMouseMove);

    setIsMounted(true);

    // Animation Loop
    const clock = new Clock();
    const animate = () => {
      now = Date.now();
      elapsed = now - then;
      const fpsInterval = 1000 / 144; // 144 fps
      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        const delta = clock.getDelta();
        updateAnimationMixers(delta);
        // controls.update(delta);
        // updateCSSObjects(cssScene, camera);

        // webglScene.updateMatrixWorld(true);

        const latestVector = (handleMouseMove as any).latestVector;
        if (latestVector && modelToLookAtMouseRef.current) {
          modelToLookAtMouseRef.current.lookAt(latestVector as Vector3);
        }

        if (hasOrbitControls && orbitControls.current) {
          orbitControls.current.update();
        }

        webglRenderer.render(webglScene, camera);
        if (hasSeparateCSSRenderer && cssScene && cssRenderer) cssRenderer.render(cssScene, camera);
      }

      frameId.current = requestAnimationFrame(animate);
    };
    animate();

    setState({
      webglScene,
      camera,
      directionalLight: directionalLightRef.current,
      enableModelLookAtMouse,
      disableModelLookAtMouse,
      updateIsSceneReadyForModelToLookAtMouse,
      ambientLight: ambientLightRef.current,
      webglRenderer,
      cssRenderer,
      orbitControls: orbitControls.current,
      pointerLockControls: pointerLockControls.current,
      initialCameraPosition: camera.position.clone(),
      cssScene,
      isMounted
    });
    // Cleanup
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }
      if (animationMixersRef.current) {
        Object.values(animationMixersRef.current).forEach(mixer => {
          if (mixer) {
            mixer.uncacheRoot(webglScene);
            mixer.stopAllAction();
          }
        });
      }

      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(webglRenderer.domElement);
      if (hasSeparateCSSRenderer && cssRenderer) {
        mountRef.current?.removeChild(cssRenderer.domElement);
        setCSSRenderer(undefined);
      }
      webglRenderer.dispose();
    };
  }, []);

  return {
    ...state,
    mountRef,
    isFreelyViewing,
    setIsFreelyViewing,
    enableModelLookAtMouse,
    updateIsSceneReadyForModelToLookAtMouse,
    disableModelLookAtMouse
  };
}
