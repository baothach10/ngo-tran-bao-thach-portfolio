import { Object3D, Vector3, Box3, Mesh, SkinnedMesh, AnimationAction } from 'three';

export const convertImageBufferToBlobUrl = (imageBuffer: ArrayBuffer, type: string) => {
  const blob = new Blob([imageBuffer], { type });
  return URL.createObjectURL(blob);
};

export const playAnimationOnce = (animAction: AnimationAction, timeScale: number = 1) => {
  if (animAction.isRunning()) return;
  // const animTime = animAction.getClip().duration;
  if (animAction.paused) animAction.paused = false;
  animAction.timeScale = timeScale;
  animAction.reset().play();

  animAction.getMixer().addEventListener('finished', function onFinished(event) {
    if (event.action === animAction) {
      animAction.getMixer().removeEventListener('finished', onFinished);
      animAction.paused = true;
    }
  });
};

export const playAnimationLoop = (animAction: AnimationAction, timeScale: number = 1) => {
  if (animAction.isRunning()) return;
  if (animAction.paused) animAction.paused = false;
  animAction.timeScale = timeScale;
  animAction.play();
};

export const stopAnimation = (animAction: AnimationAction) => {
  if (!animAction.isRunning()) return;
  animAction.stop();
  animAction.paused = true;
  animAction.time = 0;
};

export const playAnimationReverseLoop = (animAction: AnimationAction, timeScale: number = 1) => {
  if (animAction.isRunning()) return;
  if (animAction.paused) animAction.paused = false;
  animAction.timeScale = -timeScale;
  animAction.play();
};

export const playAnimationReverseOnce = (animAction: AnimationAction, timeScale: number = 1) => {
  if (animAction.isRunning()) return;
  const animTime = animAction.getClip().duration;
  if (animAction.paused) animAction.paused = false;
  animAction.timeScale = -timeScale;
  animAction.play();
  setTimeout(
    () => {
      animAction.paused = true;
    },
    Math.floor(animTime * 900)
  );
};

export function getModelCenter(model: Object3D): Vector3 {
  const box = new Box3().setFromObject(model);
  const center = new Vector3();
  box.getCenter(center);
  return center;
}

export function findMeshByName(object: Object3D, name: string): Mesh | undefined {
  let found: Mesh | undefined;
  object.traverse(child => {
    if ((child instanceof Mesh || child instanceof SkinnedMesh) && child.name === name) {
      found = child as Mesh;
    }
  });
  return found;
}

export function listAllMeshNames(object: Object3D): string[] {
  const names: string[] = [];
  object.traverse(child => {
    if ((child instanceof Mesh || child instanceof SkinnedMesh) && child.name) {
      names.push(child.name);
    }
  });
  return names;
}

export function getTopPosition(model: Object3D): Vector3 {
  const box = new Box3().setFromObject(model);
  return new Vector3((box.min.x + box.max.x) / 2, box.max.y, (box.min.z + box.max.z) / 2);
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || '';
  const isMobileUA = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

  // Detect iPadOS 13+ which reports as Mac
  const isModerniPad =
    /Intel Mac/i.test(userAgent) &&
    ((document.documentElement.clientWidth > 768 && document.documentElement.clientWidth <= 1024) ||
      navigator.maxTouchPoints >= 1);

  const isSurface = /Windows NT 10.0/i.test(userAgent) && navigator.maxTouchPoints >= 1;

  console.log(isModerniPad);

  return isMobileUA || isModerniPad || isSurface;
}

